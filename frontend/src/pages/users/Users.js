import { useState } from "react";
import Navbar from "../components/Navbar";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import usePagination from "../../hooks/usePagination";
import FooterSection from "./components/FooterSection";
import HeaderSection from "./components/HeaderSection";
import User from "./components/User";

const Users = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useGetAllUsers(search, order);

  const { handlePageClick, currentItems, pageCount, setItemOffset } =
    usePagination(itemsPerPage, data ? data.users : []);

  return (
    <div className="h-[100vh]">
      <Navbar />
      <main className="bg-white sm:w-[80%] lg:w-[50%] mx-auto mt-10 shadow-md p-3 rounded-xl">
        <HeaderSection
          search={search}
          setSearch={setSearch}
          handlePageClick={handlePageClick}
          setItemOffset={setItemOffset}
          setOrder={setOrder}
        />

        <User users={currentItems} isLoading={isLoading} error={error} />

        <FooterSection
          search={search}
          handlePageClick={handlePageClick}
          pageCount={pageCount}
          setItemsPerPage={setItemsPerPage}
          itemsPerPage={itemsPerPage}
        />
      </main>
    </div>
  );
};

export default Users;
