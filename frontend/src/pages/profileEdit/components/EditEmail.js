import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { EditEmailSchema } from "../../../validations/editEmailValidation";

const EditEmail = ({ data, onEmailEditSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(EditEmailSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("email", data?.email);
  }, [data]);

  return (
    <form
      onSubmit={
        Object.keys(dirtyFields).length > 0
          ? handleSubmit(onEmailEditSubmit)
          : (e) => e.preventDefault()
      }
      className="sm:w-[90%] lg:w-[70%] mx-auto space-y-28 flex flex-col items-center"
    >
      <div className="flex sm:flex-col sm:space-y-6 md:space-y-0 md:flex-row justify-between md:space-x-2 w-full">
        <div>
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            placeholder="Email"
            className="form-input w-full"
            type="email"
            name="email"
            {...register("email")}
          />
          <p className="text-red-600 break-all">
            {errors.email && "Email should be valid"}
          </p>
        </div>
        <div>
          <label className="block" htmlFor="confirm_email">
            Confirm Email
          </label>
          <input
            placeholder="Confirm Email"
            className="form-input w-full"
            type="email"
            name="confirm_email"
            {...register("confirm_email")}
          />
          <p className="text-red-600 break-all">
            {errors.confirm_email && "Emails should match"}
          </p>
        </div>
      </div>
      <button
        className={`btn text-white ${
          !Object.keys(dirtyFields).length > 0 &&
          "bg-gray-400 cursor-not-allowed active:bg-gray-400 active:scale-100"
        }`}
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditEmail;
