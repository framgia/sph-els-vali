import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteCategory from "../../../hooks/useDeleteCategory";

const Category = ({ id, name, description, setForceupdate }) => {
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const { deleteCategory } = useDeleteCategory();

  const handleDelete = async () => {
    await deleteCategory(id).then(() => {
      setToggle(false);
      setForceupdate((forceUpdate) => !forceUpdate);
    });
  };

  const handleEdit = () => {
    navigate(`/admin/categories/edit/${id}`);
  };
  return (
    <div className="flex items-center my-2 border-b-2 border-dashed">
      <h3 className="p-2 sm:min-w-[30%] md:min-w-[15%] font-medium">{name}</h3>
      <p className="flex-grow p-2">{description}</p>
      <div className="flex p-2 space-x-2">
        <PencilIcon
          onClick={handleEdit}
          className="w-10 cursor-pointer trans p-2 rounded-md hover:text-orange-500 active:scale-90"
        />
        <TrashIcon
          onClick={() => setToggle(true)}
          className="w-10 cursor-pointer trans p-2 rounded-md hover:text-red-700 active:scale-90"
        />
      </div>

      {toggle && (
        <div className="fixed bg-black w-[100%] h-[100%] left-0 bottom-0 bg-opacity-20 z-10 flex justify-center items-center">
          <div className="bg-white opacity-100 w-fit max-w-[80%] p-10 space-y-5  rounded-xl">
            <p>
              Are you sure you want to delete{" "}
              <span className="italic">{name}</span>
            </p>
            <div className="flex space-x-3 justify-center">
              <button onClick={() => setToggle(false)} className="btn_white">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn_red">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
