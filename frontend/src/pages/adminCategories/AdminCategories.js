import { useState } from "react";
import useGetCategories from "../../hooks/useGetCategories";
import AdminNavbar from "../components/AdminNavbar";
import Category from "./components/Category";
import HeaderSection from "./components/HeaderSection";

const AdminCategories = () => {
  const [forceUpdate, setForceupdate] = useState(false);
  const { data } = useGetCategories(forceUpdate);

  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex flex-col">
      <AdminNavbar />
      <div className=" flex-grow flex flex-col sm:w-[80%] lg:w-[60%] mx-auto py-8 space-y-1">
        <div className="bg-white p-2 rounded-md shadow-md">
          <HeaderSection />

          {data &&
            data.map(({ id, name, description }) => (
              <Category
                key={id}
                id={id}
                name={name}
                description={description}
                setForceupdate={setForceupdate}
              />
            ))}
          {!data?.length > 0 && (
            <p className="mx-auto w-fit text-[1.2rem] p-2 italic">
              No categories yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
