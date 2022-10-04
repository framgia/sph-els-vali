import { Link, useLocation } from "react-router-dom";

import { Squares2X2Icon, UserGroupIcon } from "@heroicons/react/24/outline";

const AdminNavLinks = ({ mobile }) => {
  const { pathname } = useLocation();
  return (
    <ul
      className={
        mobile
          ? "select-none"
          : "sm:hidden lg:flex space-x-14 text-[1.3rem] font-medium select-none"
      }
    >
      <li>
        <Link
          to="/admin/categories"
          className={`cursor-pointer flex items-center trans p-2 rounded-xl ${
            pathname === "/admin/categories" && "active_nav"
          }`}
        >
          <Squares2X2Icon className="w-8 mr-2" /> Categories
        </Link>
      </li>
      <li>
        <Link
          to="/admin/users"
          className={`cursor-pointer flex items-center trans p-2 rounded-xl ${
            pathname === "/admin/users" && "active_nav"
          }`}
        >
          <UserGroupIcon className="w-8 mr-2" /> Users
        </Link>
      </li>
    </ul>
  );
};

export default AdminNavLinks;
