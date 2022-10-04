import AdminNavbar from "pages/components/AdminNavbar";
import EditCategorySection from "./components/EditCategorySection";
import EditQuestionsSection from "./components/EditQuestionsSection";

const EditCategory = () => {
  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex flex-col">
      <AdminNavbar />
      <div className="flex flex-grow mt-10 sm:flex-col md:flex-row justify-center sm:items-center md:items-start">
        <div className="flex justify-center w-[27rem] min-w-fit">
          <EditCategorySection />
        </div>
        <div className="flex justify-center sm:mt-4 md:mt-0 min-w-fit sm:w-full md:w-[50rem] ">
          <EditQuestionsSection />
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
