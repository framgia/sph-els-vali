import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Activities from "./Home/components/ActivitySection";
import UserInfo from "./Home/components/UserInfoSection";

const UserProfile = () => {
  const { id } = useParams();

  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex flex-col">
      <Navbar />
      <main className=" flex-grow flex items-center justify-center">
        <div className="flex sm:flex-col sm:space-x-0 sm:space-y-4 lg:space-y-0 sm:items-center lg:flex-row lg:space-x-24 w-[70%] justify-center lg:items-start m-3">
          <UserInfo id={id} />
          <Activities id={id} />
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
