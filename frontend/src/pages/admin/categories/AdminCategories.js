import { useState } from "react";

import AdminNavbar from "pages/components/AdminNavbar";
import FooterSection from "pages/user/users/components/FooterSection";
import SearchBar from "pages/components/SearchBar";
import SortItem from "pages/components/SortItem";
import Category from "./components/Category";
import HeaderSection from "./components/HeaderSection";

import useGetCategories from "hooks/useGetCategories";
import usePagination from "hooks/usePagination";

const AdminCategories = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [forceUpdate, setForceupdate] = useState(false);
  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");
  const { data } = useGetCategories(order, search, forceUpdate);

  const { handlePageClick, currentItems, pageCount, setItemOffset } =
    usePagination(itemsPerPage, data ? data : []);

  const handleSearch = (e) => {
    const handle = { selected: 0 };
    setSearch(e);
    handlePageClick(handle);

    if (!e.length > 0) {
      setItemOffset(0);
    }
  };

  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex flex-col">
      <AdminNavbar />
      <div className=" flex-grow flex flex-col sm:w-[80%] lg:w-[60%] mx-auto py-8 space-y-1">
        <div className="bg-white p-2 rounded-md shadow-md">
          <HeaderSection />

          <div className="flex items-center space-x-3 p-2 justify-end border-b">
            <SearchBar handleSearch={handleSearch} />
            <SortItem setOrder={setOrder} />
          </div>

          {currentItems &&
            currentItems.map(({ id, name, description }) => (
              <Category
                key={id}
                id={id}
                name={name}
                description={description}
                setForceupdate={setForceupdate}
              />
            ))}
          {!data?.length > 0 && (
            <p className="mx-auto w-fit text-[1.2rem] p-2 italic">
              No categories yet
            </p>
          )}

          <FooterSection
            search={search}
            handlePageClick={handlePageClick}
            pageCount={pageCount}
            setItemsPerPage={setItemsPerPage}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
