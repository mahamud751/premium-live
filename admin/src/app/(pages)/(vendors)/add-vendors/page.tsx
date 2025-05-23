"use client";
import React from "react";

import AddForm from "@/components/templates/AddForm";
import VendorForm from "@/components/pageComponents/VendorForm";

const AddVendors: React.FC = () => {
  const additionalFields = <VendorForm vendor={null} />;

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/vendors`}
      additionalFields={additionalFields}
      buttonText="Add Vendor"
      id=""
      //@ts-ignore
      photosData={[]}
      isNoPhotoFile={true}
      link="vendors-list"
    />
  );
};

export default AddVendors;
