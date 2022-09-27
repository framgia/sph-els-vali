import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useDeleteUser from "../../../hooks/useDeleteUser";
import { toastError, toastSuccess } from "../../../utils/toast";
import DeletePopup from "../../components/DeletePopup";

const User = ({ u, setForceUpdate }) => {
  const { user } = useAuthContext();
  const [toggle, setToggle] = useState(false);
  const { deleteUser } = useDeleteUser();

  const handleDelete = async () => {
    await deleteUser(u.id)
      .then(() => {
        toastSuccess("The user was deleted successfully");
        setToggle(false);
        setForceUpdate((update) => !update);
      })
      .catch(() => {
        toastError("Something's went wrong, please try again later");
      });
  };
  return (
    <div
      key={u.id}
      className="flex border-b-2 border-dotted p-3 justify-between items-center"
    >
      <div className="flex space-x-5">
        <img
          src={u.avatar_url}
          alt="icon"
          className="w-16 h-16 rounded-full object-cover object-center"
        />
        <p className="font-bold">{`${u.first_name} ${u.last_name}`}</p>
        <p className="italic font-thin">{u.id === user.id && "you"}</p>
      </div>
      {!u.admin && (
        <TrashIcon
          onClick={() => setToggle(true)}
          className="w-10 cursor-pointer trans p-2 rounded-md hover:text-red-700 active:scale-90"
        />
      )}
      {u.admin && (
        <p className="bg-green-500 text-white p-1 rounded-md">Admin</p>
      )}
      {toggle && (
        <DeletePopup
          name={u.first_name}
          setToggle={setToggle}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default User;
