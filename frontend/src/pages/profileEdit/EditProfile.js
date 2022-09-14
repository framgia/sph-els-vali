import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AvatarChange from "./components/AvatarChange";
import EditEmail from "./components/EditEmail";
import EditPassword from "./components/EditPassword";
import EditPersonalInfo from "./components/EditPersonalInfo";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import useGetUser from "../../hooks/useGetUser";
import HeaderSection from "./components/HeaderSection";

const EditProfile = () => {
  const { user } = useAuthContext();
  const [canChangeAvatar, setcanChangeAvatar] = useState(false);

  const [image, setImage] = useState("");

  const { data } = useGetUser(user.id);

  const onPersonalInfoSubmit = ({ first_name, last_name }) => {
    // I'll send request to backend
  };

  const onEmailEditSubmit = ({ email }) => {
    //I'll send request to backend
  };

  const onPasswordEditSubmit = ({ new_password }) => {
    //I'll send request to backend
  };

  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex flex-col">
      <Navbar />
      <div className=" flex-grow flex items-center justify-center ">
        <div className="flex sm:flex-col sm:space-x-0 sm:space-y-4 lg:space-y-0 sm:items-center lg:flex-row lg:space-x-24 w-[70%] justify-center lg:items-start m-3">
          {/* Left Side */}
          <AvatarChange
            data={data}
            setImage={setImage}
            image={image}
            canChangeAvatar={canChangeAvatar}
          />

          {/* Right Side */}
          <div className="inline sm:w-[90%] lg:w-[60%] bg-white p-6 rounded-xl shadow-md space-y-10">
            <HeaderSection />

            <main>
              <Routes>
                <Route
                  path="personal_info"
                  element={
                    <EditPersonalInfo
                      data={data}
                      image={image}
                      onPersonalInfoSubmit={onPersonalInfoSubmit}
                      setcanChangeAvatar={setcanChangeAvatar}
                    />
                  }
                />
                <Route
                  path="email"
                  element={
                    <EditEmail
                      data={data}
                      onEmailEditSubmit={onEmailEditSubmit}
                      setcanChangeAvatar={setcanChangeAvatar}
                    />
                  }
                />
                <Route
                  path="password"
                  element={
                    <EditPassword
                      onPasswordEditSubmit={onPasswordEditSubmit}
                      setcanChangeAvatar={setcanChangeAvatar}
                    />
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
