import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

import Navbar from "pages/components/Navbar";
import AvatarChange from "./components/AvatarChange";
import EditEmail from "./components/EditEmail";
import EditPassword from "./components/EditPassword";
import EditPersonalInfo from "./components/EditPersonalInfo";
import HeaderSection from "./components/HeaderSection";

import { useAuthContext } from "hooks/useAuthContext";
import useGetUser from "hooks/useGetUser";
import usePutPersonalInfo from "hooks/usePutPersonalInfo";
import usePutEmail from "hooks/usePutEmail";
import usePutPassword from "hooks/usePutPassword";

import { toastError, toastSuccess } from "utils/toast";

import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const { user, dispatch } = useAuthContext();
  const [canChangeAvatar, setcanChangeAvatar] = useState(false);
  const { putPersonalInfo } = usePutPersonalInfo();
  const { putEmail } = usePutEmail();
  const { putPassword } = usePutPassword();
  const [forceUpdate, setForceUpdate] = useState(false);

  const { data } = useGetUser(user.id, forceUpdate);

  const [image, setImage] = useState("");

  const onPersonalInfoSubmit = async ({ first_name, last_name }) => {
    await putPersonalInfo(first_name, last_name, image)
      .then(() => {
        setForceUpdate(!forceUpdate);
        toastSuccess("Personal Info was successfully updated!");
      })
      .catch((err) => {
        toastError("Something went wrong!");
      });
  };

  const onEmailEditSubmit = async ({ email }) => {
    await putEmail(email)
      .then(() => {
        toastSuccess("You email was successfully updated!");
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      })
      .catch((err) => {
        toastError(
          "You used the same email or something went wrong, please try again later"
        );
      });
  };

  const onPasswordEditSubmit = async ({ old_password, new_password }) => {
    await putPassword(old_password, new_password)
      .then(() => {
        toastSuccess("Your password was successfully updated!");
      })
      .catch((err) => {
        toastError(err.message);
      });
  };

  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex flex-col">
      <Navbar forceUpdate={forceUpdate} />
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default EditProfile;
