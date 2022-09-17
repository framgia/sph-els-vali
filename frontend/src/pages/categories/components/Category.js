const Category = ({
  id,
  name,
  description,
  wasTaken,
  setSelectedLessonId,
  setShowPopup,
}) => {
  const handleStart = () => {
    setSelectedLessonId(id);
    setShowPopup(true);
  };
  return (
    <div className="bg-white p-4 space-y-10 rounded-lg shadow-md">
      <p className="text-[1.5rem] font-medium border-b-2">{name}</p>
      <p className="text-[1.2rem] break-all">{description}</p>
      {wasTaken ? (
        <button className="btn text-white w-[50%] font-medium min-w-fit">
          View Result
        </button>
      ) : (
        <button
          onClick={handleStart}
          className="btn2 w-[50%] font-medium min-w-fit "
        >
          Start
        </button>
      )}
    </div>
  );
};

export default Category;
