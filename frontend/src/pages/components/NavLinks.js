import { Link, useLocation } from "react-router-dom";

import { UserGroupIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

const NavLinks = ({ mobile }) => {
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
          to="/categories"
          className={`cursor-pointer flex items-center trans p-2 rounded-xl ${
            pathname === "/categories" && "active_nav"
          }`}
        >
          <Squares2X2Icon className="w-8 mr-2" /> Categories
        </Link>
      </li>
      <li>
        <Link
          to="/users"
          className={`cursor-pointer flex items-center trans p-2 rounded-xl ${
            pathname === "/users" && "active_nav"
          }`}
        >
          <UserGroupIcon className="w-8 mr-2" /> Users
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
