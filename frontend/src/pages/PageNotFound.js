import { useNavigate } from "react-router-dom";
import NotFound from "images/page_not_found.svg";
const PageNotFound = () => {
  const prevPath = localStorage.getItem("prevPath");
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex justify-center items-center">
      <div className="bg-white w-fit flex items-center justify-center rounded-lg shadow-md flex-col p-2 space-y-5 m-5">
        <img src={NotFound} alt="not found" className="w-[50%]" />
        <p className="text-[3rem] font-medium ">Page Not Found</p>
        <button onClick={() => navigate(prevPath)} className="btn text-white">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
