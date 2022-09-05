import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserHome from "./pages/Home/UserHome";
import VerifiedUser from "./pages/VerifiedUser";
import VerifyUser from "./pages/VerifyUser";

function App() {
  const { user } = useAuthContext();
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
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
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
