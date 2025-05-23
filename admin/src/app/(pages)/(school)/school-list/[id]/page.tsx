"use client";

import React, { useState, useEffect } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { BaseEditProps, Photo, School, User } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import SchoolForm from "@/components/pageComponents/SchoolForm";

const EditSchool: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<School>(`schools/${params.id}`);
  const [status, setStatus] = useState<string>("");
  const [photosData, setPhotosData] = useState<Photo[]>([]);

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setPhotosData(data.photos || "");
    }
  }, [data]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <SchoolForm school={data} />
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            label="Select Status"
            name="status"
            value={status}
            onChange={handleStatusChange}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="processing">Processing</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/schools/${params.id}`}
        additionalFields={additionalFields}
        buttonText="Edit School"
        id={params.id}
        //@ts-ignore
        photosData={photosData}
        //@ts-ignore
        setPhotosData={setPhotosData}
        link="/school-list"
      />
    </LoadingError>
  );
};

export default EditSchool;
