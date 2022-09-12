import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import UserHome from "./pages/Home/UserHome";
import Users from "./pages/users/Users";
import VerifiedUser from "./pages/VerifiedUser";
import VerifyUser from "./pages/VerifyUser";

function App() {
  const { user } = useAuthContext();
  const prevPath = localStorage.getItem("prevPath");
  return (
    <div className="App bg-main_white">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <UserHome /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate to="/login" />}
          />

          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />

          <Route
            path="/login"
            element={
              !user ? (
                <Login />
              ) : prevPath ? (
                <Navigate to={prevPath} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route path="/signup/verified" element={<VerifiedUser />} />

          <Route path="/signup/verify" element={<VerifyUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
