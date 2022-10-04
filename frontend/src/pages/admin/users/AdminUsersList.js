import { useState } from "react";
import { ToastContainer } from "react-toastify";

import AdminNavbar from "pages/components/AdminNavbar";
import FooterSection from "pages/user/users/components/FooterSection";
import HeaderSection from "pages/user/users/components/HeaderSection";
import User from "./components/User";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import useGetAllUsers from "hooks/useGetAllUsers";
import usePagination from "hooks/usePagination";

const AdminUsersList = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);
  const { data, error, isLoading } = useGetAllUsers(search, order, forceUpdate);

  const { handlePageClick, currentItems, pageCount, setItemOffset } =
    usePagination(itemsPerPage, data ? data.users : []);
  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] ">
      <AdminNavbar />
      <main className="bg-white sm:w-[80%] lg:w-[50%] mx-auto mt-10 shadow-md p-3 rounded-xl">
        <HeaderSection
          search={search}
          setSearch={setSearch}
          handlePageClick={handlePageClick}
          setItemOffset={setItemOffset}
          setOrder={setOrder}
        />
        {currentItems?.length > 0 ? (
          currentItems.map((user) => (
            <User u={user} setForceUpdate={setForceUpdate} />
          ))
        ) : !isLoading ? (
          <p className="mx-auto w-fit p-3 text-[1.3rem] font-bold">
            Users Not Found
          </p>
        ) : null}

        {isLoading && (
          <div>
            <ArrowPathIcon className="w-10 mx-auto m-5 animate-spin" />
          </div>
        )}
        {error && <div className="mx-auto m-5 w-fit italic">{error}</div>}
        <FooterSection
          search={search}
          handlePageClick={handlePageClick}
          pageCount={pageCount}
          setItemsPerPage={setItemsPerPage}
          itemsPerPage={itemsPerPage}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </main>
    </div>
  );
};

export default AdminUsersList;
