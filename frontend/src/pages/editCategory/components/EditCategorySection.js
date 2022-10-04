import { useParams } from "react-router-dom";
import useGetCategory from "hooks/useGetCategory";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategoryInfoSchema } from "validations/categoryInfoValidation";
import { useEffect, useState } from "react";
import usePutCategory from "hooks/usePutCategory";
import { toastError, toastSuccess } from "utils/toast";
import { ToastContainer } from "react-toastify";
import GrayedOutBtn from "pages/components/GrayedOutBtn";
import CategoryInputs from "pages/components/CategoryInputs";

const EditCategorySection = () => {
  const { id } = useParams();
  const { data } = useGetCategory(id);
  const [forceUpdate, setForceUpdate] = useState(false);

  const { putCategory } = usePutCategory();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(CategoryInfoSchema),
    mode: "onChange",
  });

  const onSubmit = async ({ name, description }) => {
    await putCategory(id, name, description)
      .then(() => {
        toastSuccess("Category info successfully updated!");
        reset({ name, description });
      })
      .catch(() => {
        toastError("Something went wrong!");
      });
  };

  useEffect(() => {
    setValue("name", data?.name);
    setValue("description", data?.description);
    setForceUpdate(!forceUpdate);
  }, [data]);

  return (
    <form
      onSubmit={
        Object.keys(dirtyFields).length > 0
          ? handleSubmit(onSubmit)
          : (e) => e.preventDefault()
      }
      className="flex flex-col w-full space-y-5 bg-white p-5 h-fit rounded-md min-w-fit mx-5"
    >
      <h1 className="border-b p-2 text-[1.8rem] font-medium">Category Info</h1>
      <CategoryInputs register={register} errors={errors} />

      <GrayedOutBtn type="submit" text="Save" array={dirtyFields} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </form>
  );
};

export default EditCategorySection;
