import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { EditPasswordSchema } from "validations/editPasswordValidation";

const EditPassword = ({ onPasswordEditSubmit, setcanChangeAvatar }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(EditPasswordSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setcanChangeAvatar(false);
  }, []);

  return (
    <form
      onSubmit={
        Object.keys(dirtyFields).length > 0
          ? handleSubmit(onPasswordEditSubmit)
          : (e) => e.preventDefault()
      }
      className="sm:w-[90%] lg:w-[70%] mx-auto space-y-28 flex flex-col items-center"
    >
      <div className="space-y-10 flex flex-col w-full">
        <div className="flex sm:flex-col sm:space-y-6 md:space-y-0 md:flex-row justify-between md:space-x-2">
          <div>
            <label className="block" htmlFor="old_password">
              Old Password
            </label>
            <input
              placeholder="Old Password"
              className="form-input w-full"
              type="password"
              name="old_password"
              {...register("old_password")}
            />
            <p className="text-red-600">
              {errors.old_password && "Password is required."}
            </p>
          </div>
          <div>
            <label className="block" htmlFor="new_password">
              New Password
            </label>
            <input
              placeholder="New Password"
              className="form-input w-full"
              type="password"
              name="new_password"
              {...register("new_password")}
            />
            <p className="text-red-600 w-[12rem] break-all">
              {errors.new_password &&
                "New password should be valid and not match the old one."}
            </p>
          </div>
        </div>
        <div>
          <label className="block" htmlFor="confirm_new_password">
            Confirm New Password
          </label>
          <input
            placeholder="Confirm New Password"
            className="form-input"
            type="password"
            name="confirm_new_password"
            {...register("confirm_new_password")}
          />
          <p className="text-red-600 break-all">
            {errors.confirm_new_password && "New passwords should match"}
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

export default EditPassword;
