import { Link } from "react-router-dom";

const Category = ({
  id,
  name,
  description,
  wasTaken,
  setSelectedLessonId,
  setShowPopup,
  questionsCount,
  score,
}) => {
  const handleStart = () => {
    setSelectedLessonId(id);
    setShowPopup(true);
  };

  return (
    <div className="bg-white p-4 space-y-10 rounded-lg shadow-md flex flex-col">
      <div className="text-[1.5rem] font-medium border-b-2 flex justify-between ">
        <p>{name}</p>
        {score !== null && (
          <p>
            {score}/{questionsCount}
          </p>
        )}
      </div>
      <p className="text-[1.2rem] break-all flex-grow">{description}</p>
      {wasTaken ? (
        <div className="flex justify-between">
          <button
            onClick={handleStart}
            className="btn2 w-[40%] font-medium min-w-fit"
          >
            Retake
          </button>
          <Link
            to={`/result/${id}`}
            className="btn text-white w-[40%] font-medium min-w-fit flex justify-center"
          >
            View Result
          </Link>
        </div>
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
