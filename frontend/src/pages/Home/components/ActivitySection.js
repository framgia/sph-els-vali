import usePagination from "../../../hooks/usePagination";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import Moment from "react-moment";
import useGetActivities from "../../../hooks/useGetActivities";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Activities = ({ id }) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { user } = useAuthContext();

  const {
    error: acitvityError,
    isLoading: activityLoad,
    data: activityData,
  } = useGetActivities(id ? id : user.id);

  const { handlePageClick, currentItems, pageCount } = usePagination(
    itemsPerPage,
    activityData ? activityData : []
  );

  return (
    <div className="inline min-w-fit bg-white flex-grow p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-[2.5rem] font-medium border-b-2">Activities</h2>
      {currentItems.length > 0 ? (
        currentItems.map((activityLog, i) => {
          return (
            <div
              key={i}
              className="flex border-b-2 border-dotted p-2 space-x-4"
            >
              <img
                className="w-[3.5rem] h-[3.5rem] rounded-full object-cover object-center"
                src={activityLog?.avatar_url}
                alt="icon"
              />
              <div>
                <p className="break-all">{activityLog?.activity}</p>
                <p className="font-light italic">
                  <Moment fromNow>{activityLog?.timestamp}</Moment>
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-[1.5rem] italic font-light">
          No Activities yet ...
        </div>
      )}
      {activityLoad && <ArrowPathIcon className="w-8 animate-spin m-auto" />}
      {acitvityError && (
        <ExclamationTriangleIcon className="w-8 text-red-600 m-auto" />
      )}
      <Pagination
        handlePageClick={handlePageClick}
        pageCount={pageCount}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
};

export default Activities;
