import { Link } from "react-router-dom";

const SignupForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isLoading,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth_cont_wrapper">
      <label htmlFor="first_name">First Name</label>
      <input
        className={`form-input ${errors.first_name && "border-b-red-600"}`}
        type="text"
        name="first_name"
        placeholder="Your first name"
        {...register("first_name")}
      />
      <p className="text-red-600">
        {errors.first_name && "First name is required."}
      </p>

      <label htmlFor="last_name">Last Name</label>
      <input
        className={`form-input ${errors.last_name && "border-b-red-600"}`}
        type="text"
        name="last_name"
        placeholder="Your last name"
        {...register("last_name")}
      />
      <p className="text-red-600">
        {errors.last_name && "Last name is required."}
      </p>

      <label htmlFor="email">Email</label>
      <input
        className={`form-input ${errors.email && "border-b-red-600"}`}
        type="email"
        name="email"
        placeholder="Your email"
        {...register("email")}
      />
      <p className="text-red-600">
        {errors.email && "Please enter a valid email."}
      </p>

      <label htmlFor="password">Password</label>
      <input
        className={`form-input ${errors.password && "border-b-red-600"}`}
        type="password"
        name="password"
        placeholder="Your password"
        {...register("password")}
      />
      <p className="text-red-600">
        {errors.password &&
          "Please enter a strong password, it should be at least 5 characters long."}
      </p>

      <label htmlFor="confirm_password">Confirm Password</label>
      <input
        className={`form-input ${
          errors.confirm_password && "border-b-red-600"
        }`}
        type="password"
        name="confirm_password"
        placeholder="Confirm password"
        {...register("confirm_password")}
      />
      <p className="text-red-600">
        {errors.confirm_password && "Passwords should be valid and match!"}
      </p>

      <button
        className={`mx-auto  text-white btn ${
          isLoading &&
          "cursor-not-allowed bg-green-300 active:scale-100 active:bg-green-300"
        }`}
      >
        Singup
      </button>
      <div className="lg:hidden text-center">
        <p>OR</p>
        <p className="text-[1rem]">
          Already have an account?{" "}
          <Link className="underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
