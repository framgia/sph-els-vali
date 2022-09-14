import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AvatarChange from "./components/AvatarChange";
import EditEmail from "./components/EditEmail";
import EditPassword from "./components/EditPassword";
import EditPersonalInfo from "./components/EditPersonalInfo";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import useGetUser from "../../hooks/useGetUser";
import HeaderSection from "./components/HeaderSection";
import usePutPersonalInfo from "../../hooks/usePutPersonalInfo";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import usePutEmail from "../../hooks/usePutEmail";
import usePutPassword from "../../hooks/usePutPassword";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();
  const [canChangeAvatar, setcanChangeAvatar] = useState(false);
  const { putPersonalInfo } = usePutPersonalInfo();
  const { putEmail } = usePutEmail();
  const { putPassword, error } = usePutPassword();

  const [image, setImage] = useState("");

  const { data } = useGetUser(user.id);

  const toastSuccess = (message) => {
    return toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const toastError = (message) => {
    return toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const onPersonalInfoSubmit = async ({ first_name, last_name }) => {
    await putPersonalInfo(first_name, last_name, image)
      .then(() => {
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
