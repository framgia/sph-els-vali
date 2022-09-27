import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import UserHome from "./pages/Home/UserHome";
import Users from "./pages/users/Users";
import VerifiedUser from "./pages/VerifiedUser";
import VerifyUser from "./pages/VerifyUser";
import UserProfile from "./pages/UserProfile";
import Follows from "./pages/follows/Follows";
import EditProfile from "./pages/profileEdit/EditProfile";
import Categories from "./pages/categories/Categories";
import Lesson from "./pages/lesson/Lesson";
import Result from "./pages/result/Result";
import Learnings from "./pages/learnings/Learnings";
import AdminLogin from "./pages/adminLogin/AdminLogin";
import AdminCategories from "./pages/adminCategories/AdminCategories";
import EditCategory from "./pages/editCategory/EditCategory";
import AdminUsersList from "./pages/adminUsersPage/AdminUsersList";

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
            path="/users/:id"
            element={user ? <UserProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate to="/login" />}
          />
          <Route
            path="/users/:id/follows/*"
            element={user ? <Follows /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile_edit/*"
            element={user ? <EditProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/categories"
            element={user ? <Categories /> : <Navigate to="/login" />}
          />
          <Route
            path="/categories/:id"
            element={user ? <Lesson /> : <Navigate to="/login" />}
          />
          <Route
            path="/result/:id"
            element={user ? <Result /> : <Navigate to="/login" />}
          />
          <Route
            path="/learnings/:id"
            element={user ? <Learnings /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/categories"
            element={
              user ? <AdminCategories /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/categories/edit/:id"
            element={user ? <EditCategory /> : <Navigate to="/admin/login" />}
          />
          <Route
            path="/admin/users"
            element={user ? <AdminUsersList /> : <Navigate to="/admin/login" />}
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
          <Route
            path="/admin/login"
            element={
              !user ? (
                <AdminLogin />
              ) : prevPath ? (
                <Navigate to={prevPath} />
              ) : (
                <Navigate to="/admin/categories" />
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
