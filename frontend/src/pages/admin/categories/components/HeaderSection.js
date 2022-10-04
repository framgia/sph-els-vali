import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import CategoryInputs from "pages/components/CategoryInputs";
import GrayedOutBtn from "pages/components/GrayedOutBtn";
import { XMarkIcon } from "@heroicons/react/24/outline";

import usePostCategory from "hooks/usePostCategory";
import { toastError } from "utils/toast";
import { CategoryInfoSchema } from "validations/categoryInfoValidation";

const HeaderSection = () => {
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const { postCategory } = usePostCategory();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(CategoryInfoSchema),
  });

  const onSubmit = async ({ name, description }) => {
    await postCategory(name, description)
      .then((id) => {
        navigate(`/admin/categories/edit/${id}`);
        reset();
      })
      .catch((err) => {
        toastError(err.message);
      });
  };

  return (
    <header className="flex justify-between border-b-2 px-10 py-3 items-center">
      <h2 className="font-medium sm:text-[1.2rem] md:text-[2rem]">
        All Categories
      </h2>
      <button
        onClick={() => setToggle(true)}
        className="btn text-[1.2rem] w-fit text-white select-none"
      >
        Add Category
      </button>

      {toggle && (
        <div className="fixed bg-black w-[100%] h-[100%] left-0 bottom-0 bg-opacity-20 z-10 flex justify-center items-center">
          <div className="bg-white opacity-100 min-w-fit w-[30%] max-w-[80%] p-10 space-y-5  rounded-xl relative">
            <XMarkIcon
              onClick={() => setToggle(false)}
              className="w-8 text-red-600 absolute right-5 top-5 cursor-pointer trans active:scale-90 rounded-md"
            />
            <form
              onSubmit={
                Object.keys(dirtyFields).length > 0
                  ? handleSubmit(onSubmit)
                  : (e) => e.preventDefault()
              }
              className="flex flex-col space-y-5 bg-white p-5 h-fit rounded-md min-w-fit"
            >
              <CategoryInputs register={register} errors={errors} />

              <GrayedOutBtn type="submit" text="Add" array={dirtyFields} />
            </form>
          </div>
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
        </div>
      )}
    </header>
  );
};

export default HeaderSection;
