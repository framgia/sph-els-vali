import AdminNavbar from "../components/AdminNavbar";
import EditCategorySection from "./components/EditCategorySection";
import EditQuestionsSection from "./components/EditQuestionsSection";

const EditCategory = () => {
  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex flex-col">
      <AdminNavbar />
      <div className="flex flex-grow mt-10 sm:flex-col md:flex-row">
        <div className="md:w-[50%] flex justify-center sm:w-[100%]">
          <EditCategorySection />
        </div>
        <div className="md:w-[50%] flex sm:w-[100%] justify-center sm:mt-4 md:mt-0">
          <EditQuestionsSection />
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
