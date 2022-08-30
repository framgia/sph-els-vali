import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authInputSchema } from "../validations/authInputValidation";
import learningSvg from "../images/learning_sketching_nd4f.svg";
import SignupForm from "../components/singupForm";
import { useState } from "react";
import EmailConfirmation from "../components/emailConfirmation";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [isFormFilled, setIsFormFilled] = useState(false);
  const { signup, error, isLoading } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authInputSchema),
    mode: "onChange",
  });

  const onSubmit = ({ first_name, last_name, email, password }) => {
    signup(first_name, last_name, email, password).then(() => {
      setIsFormFilled(true);
    });
  };

  return (
    <div className="w-full h-[100vh] flex bg-main_white">
      {/* left side */}
      <div className="sm:hidden lg:block w-[50%] h-full bg-main text-white">
        <h1 className="text-[6rem]">E-Learning</h1>
        <div className="w-fill h-[80%] my-5 flex flex-col justify-center items-center space-y-5">
          <h2 className="text-[3rem]">Welcome to family !!!</h2>
          <p className="text-[2rem]">Already have an account?</p>
          <button className="w-32 p-2 bg-green-600 rounded-md transition transform ease-out duration-150 active:bg-green-500 active:scale-90">
            Login
          </button>
          <img className="w-[50%] h-auto" src={learningSvg} alt="signup_img" />
        </div>
      </div>

      {/* right side */}
      <div className="sm:block sm:min-w-[70%] sm:max-w-[70%] md:min-w-[50%] md:max-w-[50%] sm:mx-auto sm:h-fit sm:self-center lg:flex lg:flex-col lg:min-w-[50%] justify-center items-center">
        <h1 className="lg:hidden text-[4rem] font-medium w-max mb-5 mx-auto">
          E-Learning
        </h1>
        {error && (
          <p className="text-red-600 my-3 p-5 bg-red-200 rounded-md">{error}</p>
        )}
        {!isFormFilled && (
          <SignupForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            error={error}
            isLoading={isLoading}
          />
        )}
        {isFormFilled && <EmailConfirmation />}
      </div>
    </div>
  );
};

export default Signup;
