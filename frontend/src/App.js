import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserHome from "./pages/Home/UserHome";
import Users from "./pages/Users";
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
        </Routes>
        <Routes>
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate to="/login" />}
          />
        </Routes>
        <Routes>
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
        <Routes>
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
        </Routes>
        <Routes>
          <Route path="/signup/verified" element={<VerifiedUser />} />
        </Routes>
        <Routes>
          <Route path="/signup/verify" element={<VerifyUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
