import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginInputSchema } from "validations/loginValidation";
import UseLogin from "hooks/useLogin";
import learningSvg from "images/learning_sketching_nd4f.svg";
import { useState } from "react";
import EmailConfirmation from "./components/EmailConfirmation";

const Login = () => {
  const { login, error, isLoading, isResendFlag } = UseLogin();
  const [resendError, setResendError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginInputSchema),
    mode: "onChange",
  });

  const onSubmit = async ({ email, password }) => {
    await login(email, password);
    navigate("/");
  };
  return (
    <div className="w-full h-[100vh] flex bg-main_white">
      {/* Left Side */}
      <div className="sm:block sm:min-w-[70%] sm:max-w-[70%] md:min-w-[50%] md:max-w-[50%] sm:mx-auto sm:h-fit sm:self-center lg:flex lg:flex-col lg:min-w-[50%] justify-center items-center">
        <h1 className="lg:hidden text-[4rem] font-medium w-max mb-5 mx-auto">
          E-Learning
        </h1>
        {error || resendError ? (
          <p className="text-red-600 my-3 p-5 bg-red-200 rounded-md">
            {error || resendError}
          </p>
        ) : null}
        {isResendFlag && (
          <LoginForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            error={error}
            isLoading={isLoading}
          />
        )}
        {!isResendFlag && (
          <EmailConfirmation
            userEmail={watch().email}
            setResendError={setResendError}
          />
        )}
      </div>

      {/* Right Side */}
      <div className="sm:hidden lg:block w-[50%] h-full bg-main text-white">
        <h1 className="text-[6rem] text-end mx-2">E-Learning</h1>
        <div className="w-fill h-[80%] my-5 flex flex-col justify-center items-center space-y-5">
          <h2 className="text-[3rem]">Welcome back!!!</h2>
          <p className="text-[2rem]">You dont have an account yet?</p>
          <Link className="btn text-center" to="/signup">
            Signup
          </Link>
          <img className="w-[50%] h-auto" src={learningSvg} alt="signup_img" />
        </div>
      </div>
    </div>
  );
};

export default Login;
