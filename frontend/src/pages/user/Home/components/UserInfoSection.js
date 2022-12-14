import { Link } from "react-router-dom";

import FollowButton from "pages/components/FollowButton";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import useGetUser from "hooks/useGetUser";
import useGetLearningsCount from "hooks/useGetLearningsCount";
import UseGetFollowsCount from "hooks/useGetFollowsCount";
import { useAuthContext } from "hooks/useAuthContext";

const UserInfo = ({ id }) => {
  const { user } = useAuthContext();
  const {
    error: userInfoError,
    isLoading: UserInfoLoad,
    data: userInfo,
  } = useGetUser(id ? id : user.id);

  const {
    error: learningsError,
    isLoading: learningsLoad,
    data: learntWordsAndLessons,
  } = useGetLearningsCount(id ? id : user.id);

  const { data } = UseGetFollowsCount(id ? id : user.id);
  return (
    <div className="inline bg-white p-6 rounded-xl shadow-md min-w-fit space-y-4">
      {user.id === userInfo?.id && (
        <h2 className="text-[2.5rem] font-medium border-b-2">Dashboard</h2>
      )}
      {userInfo && learntWordsAndLessons ? (
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4  border-b-2 pb-5">
            <img
              className="sm:w-[6rem] lg:w-[12rem] sm:h-[6rem] lg:h-[12rem]  rounded-full object-cover object-center"
              src={userInfo?.avatar_url}
              alt="icon"
            />
            <div>
              <h3 className="text-[1.8rem] font-medium">{`${userInfo?.first_name} ${userInfo?.last_name}`}</h3>
              {learntWordsAndLessons?.learntWordsResult && (
                <Link
                  className="trans p-2 rounded-md flex flex-col"
                  to={`/learnings/${id ?? user.id}`}
                >
                  <p className="text-[1.2rem]">
                    {learntWordsAndLessons?.learntWordsResult}
                  </p>
                  <p className="text-[1.2rem]">
                    {learntWordsAndLessons?.learntLessonsResult}
                  </p>
                </Link>
              )}
            </div>
          </div>
          <div className="flex justify-evenly text-center text-[1.2rem] font-medium select-none">
            <Link
              to={`/users/${userInfo.id}/follows/followers`}
              className="cursor-pointer trans p-2 rounded-lg"
            >
              {data?.followers} <br /> Followers
            </Link>
            <Link
              to={`/users/${userInfo.id}/follows/following`}
              className="cursor-pointer trans p-2 rounded-lg"
            >
              {data?.following} <br /> Following
            </Link>
          </div>
          {user.id !== userInfo?.id && (
            <FollowButton
              followingState={userInfo?.follows}
              id={userInfo?.id}
            />
          )}
        </div>
      ) : null}
      {UserInfoLoad || learningsLoad ? (
        <ArrowPathIcon className="w-8 animate-spin m-auto" />
      ) : null}
      {userInfoError || learningsError ? (
        <ExclamationTriangleIcon className="w-8 text-red-600 m-auto" />
      ) : null}
    </div>
  );
};

export default UserInfo;
