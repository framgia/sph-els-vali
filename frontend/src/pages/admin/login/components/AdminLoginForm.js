const AdminLoginForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isLoading,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="auth_cont_wrapper h-fit min-w-[23rem] max-w-[23rem]"
    >
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

      <button
        className={`mx-auto  text-white btn ${
          isLoading &&
          "cursor-not-allowed bg-green-300 active:scale-100 active:bg-green-300"
        }`}
      >
        Login
      </button>
    </form>
  );
};

export default AdminLoginForm;
