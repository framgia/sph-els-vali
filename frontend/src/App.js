import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifiedUser from "./pages/VerifiedUser";
import VerifyUser from "./pages/VerifyUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
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
