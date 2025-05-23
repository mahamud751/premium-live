"use client";
import React from "react";

import CategoryForm from "@/components/pageComponents/CategoryForm";
import AddForm from "@/components/templates/AddForm";

const AddCategory: React.FC = () => {
  const additionalFields = <CategoryForm category={null} />;
  const photosData = {
    image: [],
  };
  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/categories`}
      additionalFields={additionalFields}
      buttonText="Add Category"
      id=""
      photosData={photosData}
      link="category-list"
    />
  );
};

export default AddCategory;
