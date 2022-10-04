import { useEffect, useState } from "react";

import Pagination from "pages/components/Pagination";
import User from "pages/user/users/components/User";

import useGetFollowers from "hooks/useGetFollowers";
import usePagination from "hooks/usePagination";

const Followers = ({ user_id, setIsFollowersActive }) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { error, isLoading, data } = useGetFollowers(user_id);
  const { handlePageClick, currentItems, pageCount } = usePagination(
    itemsPerPage,
    data ? data : []
  );

  useEffect(() => {
    setIsFollowersActive(true);
  }, []);

  return (
    <div>
      <User users={currentItems} isLoading={isLoading} error={error} />
      <div className="p-3">
        <Pagination
          handlePageClick={handlePageClick}
          pageCount={pageCount}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default Followers;
