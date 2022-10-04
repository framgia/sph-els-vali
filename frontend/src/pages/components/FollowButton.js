import { useState } from "react";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import useFollowOrUnfolllow from "hooks/useFollowOrUnfollow";

const FollowButton = ({ followingState, id }) => {
  const [isFollow, setIsfolllow] = useState(followingState);
  const { followOrUnfollow, error } = useFollowOrUnfolllow();

  const handleFollow = async (id) => {
    await followOrUnfollow(id);
    setIsfolllow(!isFollow);
  };
  return (
    <button
      onClick={() => handleFollow(id)}
      className={`py-2 px-4 rounded-lg ${
        !isFollow ? "active_nav" : "border-2 border-blue-600"
      } transition-all ease-out duration-200 active:scale-90`}
    >
      {!isFollow && !error ? "Follow" : null}
      {isFollow && !error ? "Unfollow" : null}
      {error && (
        <p className="flex text-red-600">
          <ExclamationTriangleIcon className="w-5 m-auto" />
          failed
        </p>
      )}
    </button>
  );
};

export default FollowButton;
