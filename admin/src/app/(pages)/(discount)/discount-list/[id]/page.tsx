"use client";
import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { BaseEditProps, Discount, Photo } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import StatusSelect from "@/components/molecules/StatusSelect";
import LoadingError from "@/components/atoms/LoadingError";
import DiscountForm from "@/components/pageComponents/DiscountForm";

const EditDiscount: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Discount>(`discounts/${params.id}`);
  const photosData = {
    image: [],
  };

  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    if (data) {
      // setPhotosData(data?.photos || "");
      setStatus(data.status);
    }
  }, [data]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <DiscountForm discount={data} />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/discounts/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Discount"
        photosData={photosData}
        //@ts-ignore
        setPhotosData={setPhotosData}
        link="/discount-list"
      />
    </LoadingError>
  );
};

export default EditDiscount;
