import { Link } from "react-router-dom";

const VerifiedUser = () => {
  return (
    <div className="bg-main_white h-screen flex justify-center items-center">
      <div className="bg-white text-center p-12 rounded-lg shadow-md">
        <h1 className="text-[1.4rem] font-medium">
          Congratulations you successfully verified your account 🎉🎉🎉
        </h1>
        <Link to={"/login"} className="btn text-white block mx-auto">
          Login
        </Link>
      </div>
    </div>
  );
};

export default VerifiedUser;
