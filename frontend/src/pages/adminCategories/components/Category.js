import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteCategory from "hooks/useDeleteCategory";
import DeletePopup from "pages/components/DeletePopup";

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
        <DeletePopup
          name={name}
          setToggle={setToggle}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Category;
