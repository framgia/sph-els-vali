import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const HeaderSection = ({ data, id, isFollowersActive }) => {
  return (
    <header>
      <Link
        to={`/users/${id}`}
        className="flex cursor-pointer p-2 trans w-max select-none rounded-md space-x-3 shadow-md"
      >
        <ArrowLeftIcon className="w-6" />
        <p>{`${data?.first_name} ${data?.last_name}`}</p>
      </Link>
      <div className="border-b-2 p-3 flex items-center justify-between text-center select-none">
        <Link
          to={`/users/${id}/follows/followers`}
          className={`w-full trans cursor-pointer p-2 rounded-md ${
            isFollowersActive && "bg-gray-200 font-medium"
          }`}
        >
          Followers
        </Link>
        <Link
          to={`/users/${id}/follows/following`}
          className={`w-full trans cursor-pointer p-2 rounded-md ${
            !isFollowersActive && "bg-gray-200 font-medium"
          }`}
        >
          Followings
        </Link>
      </div>
    </header>
  );
};

export default HeaderSection;
