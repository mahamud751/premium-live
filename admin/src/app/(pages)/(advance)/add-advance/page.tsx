"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import AdvanceForm from "@/components/pageComponents/AdvanceForm";

const AddAdvance: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const additionalFields = <AdvanceForm advance={null} />;
  const photosData = {
    image: [],
  };
  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/advance`}
      additionalFields={additionalFields}
      buttonText="Add Advance"
      photosData={photosData}
      files={files}
      setFiles={setFiles}
      id=""
      link="advance-list"
      isFile={true}
    />
  );
};

export default AddAdvance;
