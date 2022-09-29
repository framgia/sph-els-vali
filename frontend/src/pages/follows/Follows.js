import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useGetUser from "../../hooks/useGetUser";
import Followers from "./components/Followers";
import Following from "./components/Following";
import { useState } from "react";
import HeaderSection from "./components/HeaderSection";

const Follows = () => {
  const { id } = useParams();
  const { data } = useGetUser(id);
  const [isFollowersActive, setIsFollowersActive] = useState(true);

  return (
    <div className="h-[100vh]">
      <Navbar />
      <div className="bg-white sm:w-[80%] lg:w-[50%] mx-auto mt-10 shadow-md p-3 rounded-xl">
        {data && (
          <HeaderSection
            data={data}
            id={id}
            isFollowersActive={isFollowersActive}
          />
        )}
        <main>
          <Routes>
            <Route
              path="followers"
              element={
                <Followers
                  user_id={id}
                  setIsFollowersActive={setIsFollowersActive}
                />
              }
            />
            <Route
              path="following"
              element={
                <Following
                  user_id={id}
                  setIsFollowersActive={setIsFollowersActive}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Follows;
