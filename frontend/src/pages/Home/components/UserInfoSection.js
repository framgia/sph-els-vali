import useGetLearningsCount from "../../../hooks/useGetLearningsCount";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import useGetUser from "../../../hooks/useGetUser";
import { useAuthContext } from "../../../hooks/useAuthContext";

const UserInfo = () => {
  const { user } = useAuthContext();
  const {
    error: userInfoError,
    isLoading: UserInfoLoad,
    data: userInfo,
  } = useGetUser(user.id);

  const {
    error: learningsError,
    isLoading: learningsLoad,
    data: learntWordsAndLessons,
  } = useGetLearningsCount(user.id);

  return (
    <div className="inline bg-white p-6 rounded-xl shadow-md min-w-fit space-y-4">
      <h2 className="text-[2.5rem] font-medium border-b-2">Dashboard</h2>
      {userInfo && learntWordsAndLessons ? (
        <div className="flex space-x-4">
          <img
            className="sm:w-[6rem] lg:w-[12rem] rounded-full"
            src={userInfo?.avatar_url}
            alt="icon"
          />
          <div>
            <h3 className="text-[1.8rem] font-medium">{`${userInfo?.first_name} ${userInfo?.last_name}`}</h3>
            <div>
              <p className="text-[1.2rem]">
                {learntWordsAndLessons?.learntWordsResult}
              </p>
              <p className="text-[1.2rem]">
                {learntWordsAndLessons?.learntLessonsResult}
              </p>
            </div>
          </div>
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
