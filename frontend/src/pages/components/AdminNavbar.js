import {
  ArrowPathIcon,
  Bars4Icon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "hooks/useAuthContext";
import useGetUser from "hooks/useGetUser";
import AdminNavLinks from "./AdminNavLinks";

const AdminNavbar = () => {
  const { user, dispatch } = useAuthContext();
  const [toggle, setToggle] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const { error, isLoading, data } = useGetUser(user.id);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const { pathname } = useLocation();
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("prevPath", pathname);
    });
  }, []);
  return (
    <nav className="flex w-[100%] justify-between p-3 bg-white shadow-md">
      <h1 className="sm:text-[2rem] md:text-[3rem] min-w-max font-bold font-serif text-main">
        E-Learning|Admin
      </h1>
      <div className="flex w-fit sm:space-x-2 lg:space-x-10 items-center">
        <AdminNavLinks mobile={false} />
        <div
          onClick={handleToggle}
          className="flex h-fit items-center space-x-2 cursor-pointer select-none relative"
        >
          {data && (
            <>
              <img
                className="sm:w-8 md:w-14 sm:h-8 md:h-14 rounded-full object-cover object-center"
                src={data?.avatar_url}
                alt="icon"
              />
              <p className="h-fit font-bold">{`${data?.first_name} ${data?.last_name}`}</p>
            </>
          )}
          {isLoading && <ArrowPathIcon className="w-8 animate-spin" />}
          {error && <ExclamationTriangleIcon className="w-8 text-red-600" />}
          <ChevronDownIcon className="w-6 h-6" />
          {toggle && (
            <div className="absolute flex flex-col w-[8rem] right-0 -bottom-10 shadow-lg rounded-b-md bg-white text-center">
              <div
                onClick={handleLogOut}
                className="p-2  text-red-600 rounded-b-md trans"
              >
                Logout
              </div>
            </div>
          )}
        </div>
        <Bars4Icon
          onClick={() => setShowSideBar(true)}
          className="sm:flex lg:hidden w-8 cursor-pointer"
        />
      </div>
      {showSideBar && (
        <div className="fixed right-0 top-0 w-[15rem] bg-white h-[100vh] space-y-4 p-3">
          <XMarkIcon
            onClick={() => setShowSideBar(false)}
            className="w-10 text-red-600 trans rounded-md cursor-pointer"
          />
          <AdminNavLinks mobile={true} />
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
