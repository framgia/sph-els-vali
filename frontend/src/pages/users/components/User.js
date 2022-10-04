import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuthContext } from "hooks/useAuthContext";
import FollowButton from "pages/components/FollowButton";

const User = ({ users, isLoading, error }) => {
  const { user } = useAuthContext();

  return (
    <div>
      {users?.length > 0 ? (
        users.map((u) => {
          return (
            <div
              key={u.id}
              className="flex border-b-2 border-dotted p-3 justify-between items-center"
            >
              <Link
                to={u.id === user.id ? "/" : `/users/${u.id}`}
                className="flex space-x-5"
              >
                <img
                  src={u.avatar_url}
                  alt="icon"
                  className="w-16 h-16 rounded-full object-cover object-center"
                />
                <p className="font-bold">{`${u.first_name} ${u.last_name}`}</p>
                <p className="italic font-thin">{u.id === user.id && "you"}</p>
              </Link>
              {u.id !== user.id && (
                <FollowButton followingState={u.follows} id={u.id} />
              )}
            </div>
          );
        })
      ) : !isLoading ? (
        <p className="mx-auto w-fit p-3 text-[1.3rem] font-bold">
          Users Not Found
        </p>
      ) : null}

      {isLoading && (
        <div>
          <ArrowPathIcon className="w-10 mx-auto m-5 animate-spin" />
        </div>
      )}
      {error && <div className="mx-auto m-5 w-fit italic">{error}</div>}
    </div>
  );
};

export default User;
