import { ArrowPathIcon } from "@heroicons/react/24/outline";
import FollowButton from "../components/FollowButton";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../hooks/useAuthContext";
import useGetAllUsers from "../hooks/useGetAllUsers";

const Users = () => {
  const { data, error, isLoading } = useGetAllUsers();
  const { user } = useAuthContext();

  return (
    <div className="h-[100vh]">
      <Navbar />
      <main className="bg-white sm:w-[80%] lg:w-[50%] mx-auto mt-10 shadow-md p-3 rounded-xl">
        <h2 className="text-[2rem] font-medium border-b-2 p-3">Users List</h2>
        <div>
          {data &&
            data.users.map((u) => {
              return (
                <div
                  key={u.id}
                  className="flex border-b-2 border-dotted p-3 justify-between items-center"
                >
                  <div className="flex space-x-5">
                    <img
                      src={u.avatar_url}
                      alt="icon"
                      className="w-16 rounded-full"
                    />
                    <p className="font-bold">{`${u.first_name} ${u.last_name}`}</p>
                    <p className="italic font-thin">
                      {u.id === user.id && "you"}
                    </p>
                  </div>
                  {u.id !== user.id && (
                    <FollowButton followingState={u.follows} id={u.id} />
                  )}
                </div>
              );
            })}
          {isLoading && (
            <div>
              <ArrowPathIcon className="w-10 mx-auto m-5 animate-spin" />
            </div>
          )}
          {error && <div className="mx-auto m-5 w-fit italic">{error}</div>}
        </div>
      </main>
    </div>
  );
};

export default Users;
