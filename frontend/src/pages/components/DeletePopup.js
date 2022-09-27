const DeletePopup = ({ name, handleDelete, setToggle }) => {
  return (
    <div className="fixed bg-black w-[100%] h-[100%] left-0 bottom-0 bg-opacity-20 z-10 flex justify-center items-center">
      <div className="bg-white opacity-100 w-fit max-w-[80%] p-10 space-y-5  rounded-xl">
        <p>
          Are you sure you want to delete <span className="italic">{name}</span>
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
  );
};

export default DeletePopup;
