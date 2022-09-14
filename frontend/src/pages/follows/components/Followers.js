import { useEffect, useState } from "react";
import useGetFollowers from "../../../hooks/useGetFollowers";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../components/Pagination";
import User from "../../users/components/User";

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
