import {
  UserIcon,
  UserGroupIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const NavLinks = ({ mobile }) => {
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
          className="cursor-pointer flex items-center trans p-2 rounded-xl"
        >
          <Squares2X2Icon className="w-8 mr-2" /> Categories
        </Link>
      </li>
      <li>
        <Link
          to="/users"
          className="cursor-pointer flex items-center trans p-2 rounded-xl"
        >
          <UserGroupIcon className="w-8 mr-2" /> Users
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          className="cursor-pointer flex items-center p-2 rounded-xl trans"
        >
          <UserIcon className="w-8 mr-2" /> Profile
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
