import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import useGetCategories from "../../hooks/useGetCategories";
import Navbar from "../components/Navbar";
import Category from "./components/Category";

const Categories = () => {
  const { error, isLoading, data } = useGetCategories();

  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex flex-col">
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
              name={name}
              description={description}
              wasTaken={wasTaken}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
