import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { EditPersonalInfoSchema } from "../../../validations/editPrersonalInfoValidation";

const EditPersonalInfo = ({ data, onPersonalInfoSubmit, image }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(EditPersonalInfoSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("first_name", data?.first_name);
    setValue("last_name", data?.last_name);
  }, [data]);

  return (
    <form
      onSubmit={
        Object.keys(dirtyFields).length > 0 || image !== data?.avatar_url
          ? handleSubmit(onPersonalInfoSubmit)
          : (e) => e.preventDefault()
      }
      className="sm:w-[90%] lg:w-[70%] mx-auto space-y-28 flex flex-col items-center"
    >
      <div className="flex sm:flex-col sm:space-y-6 md:space-y-0 md:flex-row justify-between md:space-x-2 w-full">
        <div>
          <label className="block" htmlFor="first_name">
            First Name
          </label>
          <input
            placeholder="First Name"
            className="form-input w-full"
            type="text"
            name="first_name"
            {...register("first_name")}
          />
          <p className="text-red-600">
            {errors.first_name && "First name is required."}
          </p>
        </div>
        <div>
          <label className="block" htmlFor="last_name">
            Last Name
          </label>
          <input
            placeholder="Last Name"
            type="text"
            className="form-input w-full"
            name="last_name"
            {...register("last_name")}
          />
          <p className="text-red-600">
            {errors.last_name && "Last name is required."}
          </p>
        </div>
      </div>
      <button
        className={`btn text-white ${
          !Object.keys(dirtyFields).length > 0
            ? `${
                image === data?.avatar_url
                  ? "bg-gray-400 cursor-not-allowed active:bg-gray-400 active:scale-100"
                  : ""
              }`
            : ""
        }`}
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditPersonalInfo;
