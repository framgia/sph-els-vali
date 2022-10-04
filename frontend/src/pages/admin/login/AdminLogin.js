import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import AdminLoginForm from "./components/AdminLoginForm";

import useAdminLogin from "hooks/useAdminLogin";
import { loginInputSchema } from "validations/loginValidation";

const AdminLogin = () => {
  const { login, error, isLoading } = useAdminLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginInputSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    await login(email, password).then(() => {
      navigate("/admin/categories");
    });
  };

  return (
    <div className="w-full h-[100vh] flex flex-col bg-main_white justify-center items-center">
      {error ? (
        <p className="text-red-600 my-3 p-5 bg-red-200 rounded-md">{error}</p>
      ) : null}

      <AdminLoginForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AdminLogin;
