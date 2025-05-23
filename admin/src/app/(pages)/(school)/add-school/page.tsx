"use client";
import AddForm from "@/components/templates/AddForm";
import SchoolForm from "@/components/pageComponents/SchoolForm";

const AddSchool: React.FC = () => {
  const additionalFields = <SchoolForm school={null} />;
  const photosData: { title: string; src: string }[] = [];
  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/schools`}
      additionalFields={additionalFields}
      buttonText="Add School"
      id=""
      //@ts-ignore
      photosData={photosData}
      link="school-list"
    />
  );
};

export default AddSchool;
