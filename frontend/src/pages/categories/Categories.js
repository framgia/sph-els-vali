import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import useGetCategories from "../../hooks/useGetCategories";
import Navbar from "../components/Navbar";
import Category from "./components/Category";

const Categories = () => {
  const { error, isLoading, data } = useGetCategories();
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const handleCancel = () => {
    setShowPopup(false);
    setSelectedLessonId(null);
  };
  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex flex-col">
      {showPopup && (
        <div className="fixed bg-black w-[100vw] h-[100vh] top-0 left-0 z-10 bg-opacity-40 flex items-center justify-center select-none">
          <div className="bg-white sm:w-[80%] md:w-[50%] lg:w-[30%] p-3 rounded-lg shadow-lg space-y-10">
            <h3 className="text-[1.2rem]">
              Please do not to exit the lesson before you finish it, because you
              will not be given another chance to take the lesson again.
            </h3>
            <div className="flex justify-around">
              <button onClick={handleCancel} className="btn_red">
                Cancel
              </button>
              <Link
                to={`/categories/${selectedLessonId}`}
                className="btn2 text-center"
              >
                {"Proceed >"}
              </Link>
            </div>
          </div>
        </div>
      )}

      <Navbar />
      <div className=" flex-grow flex flex-col sm:w-[80%] lg:w-[60%] mx-auto py-8 space-y-10">
        <h1 className="text-[2.5rem] font-medium bg-white rounded-lg shadow-md p-3">
          Categories
        </h1>

        {isLoading && <ArrowPathIcon className="w-8 animate-spin mx-auto" />}

        {error && (
          <div className="text-red-600 flex items-center mx-auto p-2 bg-red-200 rounded-md border-red-500 border space-x-5">
            <ExclamationTriangleIcon className="w-8" />{" "}
            <p>Something went wrong</p>{" "}
          </div>
        )}

        <div className="w-[100%] grid lg:grid-cols-3 md:grid-cols-2 gap-5">
          {data?.map(({ id, name, description, wasTaken }) => (
            <Category
              key={id}
              id={id}
              name={name}
              description={description}
              wasTaken={wasTaken}
              setSelectedLessonId={setSelectedLessonId}
              setShowPopup={setShowPopup}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
