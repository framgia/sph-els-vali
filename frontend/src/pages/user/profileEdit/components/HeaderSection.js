import { Link, useLocation } from "react-router-dom";

const HeaderSection = () => {
  const { pathname } = useLocation();

  return (
    <header className="border-b-2">
      <h1 className="text-[2rem] font-medium p-2 w-full">Edit Profile</h1>
      <div className="flex justify-evenly text-center select-none">
        <Link
          to={"/profile_edit/personal_info"}
          className={`w-full p-2 cursor-pointer trans rounded-md ${
            pathname === "/profile_edit/personal_info" &&
            "bg-gray-200 font-medium"
          } `}
        >
          Personal Info
        </Link>
        <Link
          to={"/profile_edit/email"}
          className={`w-full p-2 cursor-pointer trans rounded-md ${
            pathname === "/profile_edit/email" && "bg-gray-200 font-medium"
          } `}
        >
          Email
        </Link>
        <Link
          to={"/profile_edit/password"}
          className={`w-full p-2 cursor-pointer trans rounded-md ${
            pathname === "/profile_edit/password" && "bg-gray-200 font-medium"
          } `}
        >
          Password
        </Link>
      </div>
    </header>
  );
};

export default HeaderSection;
