"use client";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  // gridPageSelector,
  GridPagination,
  GridPaginationModel,
  GridRowSelectionModel,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import {
  Paper,
  Button,
  TextField,
  useTheme,
  TablePaginationProps,
  // PaginationItem,
} from "@mui/material";
import {
  Edit,
  AddCircleOutlined,
  Search,
  Delete,
  FileDownload,
  Print,
  // ArrowBack,
  // ArrowForward,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Link from "next/link";
import MuiPagination from "@mui/material/Pagination";

import useExtractLinkPart from "@/services/hooks/useExtractLinkPart";
import { useAuth } from "@/services/hooks/auth";

interface DataTableProps {
  fetchUrl: string;
  link: string;
  deleteUrl: string;
  columns: GridColDef[];
  defaultHiddenColumns?: string[];
  searchField?: string;
  enableExport?: boolean;
  isJustCreateData?: boolean;
  isJustActionData?: boolean;
  isJustEditData?: boolean;
  isJustShowData?: boolean;
  isJustDeleteData?: boolean;
}
function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="secondary"
      className={className}
      shape="rounded"
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
      // renderItem={(item) => (
      //   <PaginationItem
      //     slots={{ previous: ArrowBack, next: ArrowForward }}
      //     {...item}
      //   />
      // )}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const DataTable: React.FC<DataTableProps> = ({
  fetchUrl,
  link,
  deleteUrl,
  columns,
  defaultHiddenColumns = [],
  searchField = "name",
  enableExport = true,
  isJustCreateData = true,
  isJustActionData = true,
  isJustEditData = true,
  isJustShowData = true,
  isJustDeleteData = true,
}) => {
  const theme = useTheme();
  const { user, token } = useAuth();

  const customStyles = {
    header: {
      backgroundColor: theme.palette.mode === "dark" ? "#333" : "#F4F6F8",
      color: theme.palette.mode === "dark" ? "#FFF" : "#000",
    },
    actionIcons: {
      color: theme.palette.mode === "dark" ? "#FFF" : "#000",
    },
  };
  const transitionStyles = {
    transition: "background-color 0.3s ease, color 0.3s ease",
  };
  const MySwal = withReactContent(Swal);

  const link2 = link;

  const firstPart = useExtractLinkPart(link2);

  const [rows, setRows] = useState<any[]>([]);
  const [, setSearch] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [openColumnModal, setOpenColumnModal] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const [totalRows, setTotalRows] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
    initializeColumnVisibility();
  }, [fetchUrl, paginationModel.page, paginationModel.pageSize, totalRows]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(fetchUrl, {
        params: {
          _page: paginationModel.page + 1,
          _perPage: paginationModel.pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRows(response.data.data);
      setTotalRows(response.data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const initializeColumnVisibility = () => {
    const initialVisibility: { [key: string]: boolean } = {};
    columns.forEach((col) => {
      initialVisibility[col.field] = !defaultHiddenColumns.includes(col.field);
    });
    setColumnVisibility(initialVisibility);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    if (value === "") {
      fetchData();
    } else {
      setRows((prevRows) =>
        prevRows.filter((row) => row[searchField].toLowerCase().includes(value))
      );
    }
  };

  const handleDelete = async (id: string) => {
    const confirmation = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`${deleteUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        MySwal.fire("Deleted!", "The item has been deleted.", "success");
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        setTotalRows((prevTotal) => prevTotal - 1);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          if (error.response.status === 403) {
            MySwal.fire(
              "Access Denied",
              "You do not have permission to perform this action.",
              "error"
            );
          } else {
            const errorMessage =
              error.response.data?.message || "Failed to delete";
            MySwal.fire("Error", errorMessage, "error");
          }
        } else {
          MySwal.fire("Error", "An unexpected error occurred", "error");
        }
      }
    }
  };

  const handleBulkDelete = async () => {
    const confirmation = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    });

    if (confirmation.isConfirmed) {
      try {
        await Promise.all(
          selectedIds.map((id) => axios.delete(`${deleteUrl}/${id}`))
        );
        MySwal.fire("Deleted!", "The items have been deleted.", "success");
        setRows((prevRows) =>
          prevRows.filter((row) => !selectedIds.includes(row.id))
        );
        setSelectedIds([]);
      } catch (error) {
        console.error("Error deleting data:", error);
        MySwal.fire("Error", "Failed to delete", "error");
      }
    }
  };

  const handleExport = () => {
    const escapeCsvValue = (value: string | null | undefined) => {
      if (value === null || value === undefined) return "";
      const stringValue = value.toString();
      if (stringValue.includes(",") || stringValue.includes('"')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    const headers = columns
      .filter((col) => col.field !== "action" && columnVisibility[col.field])
      .map((col) => escapeCsvValue(col.headerName))
      .join(",");

    const rowsCsv = rows
      .map((row) => {
        const categoryName = row.category?.name || "";
        return columns
          .filter(
            (col) => col.field !== "action" && columnVisibility[col.field]
          )
          .map((col) => {
            let value = row[col.field];
            if (col.field === "photos") {
              value =
                row.photos?.map((photo: any) => photo.src).join(",") || "";
            } else if (col.field === "categoryName") {
              value = categoryName;
            }

            if (Array.isArray(value)) {
              return escapeCsvValue(value.join(","));
            }
            return escapeCsvValue(value);
          })
          .join(",");
      })
      .join("\n");

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rowsCsv}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleColumnVisibilityChange = (field: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleColumnModalClose = () => {
    setOpenColumnModal(false);
  };

  const handleResetColumns = () => {
    initializeColumnVisibility();
  };

  const handleSelectAll = () => {
    const newVisibility = columns.reduce((acc, col) => {
      acc[col.field] = !selectAll;
      return acc;
    }, {} as { [key: string]: boolean });
    setColumnVisibility(newVisibility);
    setSelectAll(!selectAll);
  };

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };
  const modifiedColumns = [
    ...columns.filter((col) => columnVisibility[col.field]),
    ...(isJustActionData
      ? [
          {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 100,
            renderCell: (params: { id: { toString: () => string } }) => (
              <div>
                {/* {isJustEditData && (
                  <Link href={`${firstPart}-show/${params.id}`}>
                    <RemoveRedEyeIcon color="success" />
                  </Link>
                )} */}
                {isJustShowData && (
                  <Link href={`${link}/${params.id}`}>
                    <Edit color="action" className="mx-2" />
                  </Link>
                )}
                {isJustDeleteData && user?.role !== "rider" && (
                  <Delete
                    color="error"
                    onClick={() => handleDelete(params.id.toString())}
                    className="cursor-pointer"
                  />
                )}
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="md:mt-14 md:ms-12">
      <Paper className="p-6 m-2 md:m-6 shadow-xl rounded-lg md:w-[92%]">
        {isJustCreateData && (
          <div className="flex justify-end">
            {" "}
            <Link href={`/add-${firstPart}`}>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlined />}
                className=" bg-neutral-950 text-white hover:bg-neutral-700"
              >
                Create
              </Button>
            </Link>
          </div>
        )}
        <div className="block md:flex justify-between items-center mb-6">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            onChange={handleSearch}
            InputProps={{
              startAdornment: <Search className="mr-2" />,
            }}
            className="mr-4 mb-5 md:mb-0"
          />
          {isJustEditData && (
            <div>
              {/* <Button
                variant="contained"
                color="secondary"
                startIcon={<Delete />}
                onClick={handleBulkDelete}
                disabled={selectedIds.length === 0}
                className={`${
                  theme.palette.mode === "dark"
                    ? "bg-red-800 hover:bg-red-900 text-white"
                    : "bg-red-600 hover:bg-red-800 text-white"
                }`}
              >
                Delete
              </Button> */}

              {/* {enableExport && (
                <Button
                  startIcon={<FileDownload />}
                  onClick={handleExport}
                  className={`mr-2 ${
                    theme.palette.mode === "dark"
                      ? "text-emerald-500"
                      : "text-emerald-950"
                  }`}
                >
                  Export
                </Button>
              )} */}

              {/* <Button
                startIcon={<Print />}
                onClick={handlePrint}
                className={`mr-2 ${
                  theme.palette.mode === "dark"
                    ? "text-emerald-500"
                    : "text-emerald-950"
                }`}
              >
                Print
              </Button> */}
            </div>
          )}
        </div>
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            pagination
            columns={modifiedColumns}
            getRowId={(row) => row.id}
            pageSizeOptions={[10, 20, 30]}
            rowCount={totalRows}
            paginationMode="server"
            loading={loading}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(
              newSelection: GridRowSelectionModel
            ) => {
              setSelectedIds(newSelection as string[]);
            }}
            onPaginationModelChange={handlePaginationModelChange}
            slots={{
              pagination: CustomPagination,
            }}
            {...rows}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            sx={{
              ...transitionStyles,
              "& .MuiDataGrid-columnHeaders": customStyles.header,
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${
                  theme.palette.mode === "dark" ? "#444" : "#E0E0E0"
                }`,
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor:
                  theme.palette.mode === "dark" ? "#444" : "#EEE",
              },
            }}
          />
        </Box>
        <Modal
          open={openColumnModal}
          onClose={handleColumnModalClose}
          aria-labelledby="column-modal-title"
          aria-describedby="column-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              right: "5%",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="column-modal-title" variant="h6" component="h2">
              Manage Columns
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                }
                label="Select All"
              />
              {columns.map((column) => (
                <FormControlLabel
                  key={column.field}
                  control={
                    <Checkbox
                      checked={columnVisibility[column.field] || false}
                      onChange={() =>
                        handleColumnVisibilityChange(column.field)
                      }
                    />
                  }
                  label={column.headerName}
                />
              ))}
            </FormGroup>
            <Button onClick={handleResetColumns}>Reset</Button>
          </Box>
        </Modal>
      </Paper>
    </div>
  );
};

export default DataTable;
