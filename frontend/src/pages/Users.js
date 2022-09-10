import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  BarsArrowDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import FollowButton from "../components/FollowButton";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import { useAuthContext } from "../hooks/useAuthContext";
import useGetAllUsers from "../hooks/useGetAllUsers";
import usePagination from "../hooks/usePagination";

const Users = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useGetAllUsers(search, order);
  const { user } = useAuthContext();

  const { handlePageClick, currentItems, pageCount, setItemOffset } =
    usePagination(itemsPerPage, data ? data.users : []);
  const handleSearch = (e) => {
    const handle = { selected: 0 };
    setSearch(e);
    handlePageClick(handle);

    if (!e.length > 0) {
      setItemOffset(0);
    }
  };
  return (
    <div className="h-[100vh]">
      <Navbar />
      <main className="bg-white sm:w-[80%] lg:w-[50%] mx-auto mt-10 shadow-md p-3 rounded-xl">
        <div className="border-b-2 p-3 flex items-center justify-between">
          <h2 className="text-[2rem] font-medium ">Users List</h2>
          <div className="flex items-center space-x-3">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center border-2 rounded-md"
            >
              <MagnifyingGlassIcon className="w-5 text-gray-400 ml-1" />
              <input
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                type="text"
                placeholder="search"
                className="p-1 rounded-md outline-none"
              />
            </form>
            <div className="flex items-center">
              <label htmlFor="order">
                <BarsArrowDownIcon className="w-5 cursor-pointer" />
              </label>
              <select
                onChange={(e) => setOrder(e.target.value)}
                name="order"
                id="order"
                defaultValue="none"
                className="cursor-pointer"
              >
                <option disabled value="none">
                  none
                </option>
                <option value="ASC">A-Z</option>
                <option value="DESC">Z-A</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          {currentItems.length > 0 ? (
            currentItems.map((u) => {
              return (
                <div
                  key={u.id}
                  className="flex border-b-2 border-dotted p-3 justify-between items-center"
                >
                  <div className="flex space-x-5">
                    <img
                      src={u.avatar_url}
                      alt="icon"
                      className="w-16 rounded-full"
                    />
                    <p className="font-bold">{`${u.first_name} ${u.last_name}`}</p>
                    <p className="italic font-thin">
                      {u.id === user.id && "you"}
                    </p>
                  </div>
                  {u.id !== user.id && (
                    <FollowButton followingState={u.follows} id={u.id} />
                  )}
                </div>
              );
            })
          ) : (
            <p className="mx-auto w-fit p-3 text-[1.3rem] font-bold">
              Users Not Found
            </p>
          )}
          {isLoading && (
            <div>
              <ArrowPathIcon className="w-10 mx-auto m-5 animate-spin" />
            </div>
          )}
          {error && <div className="mx-auto m-5 w-fit italic">{error}</div>}
        </div>
        <div className="p-3">
          {!search.length > 0 && (
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
              setItemsPerPage={setItemsPerPage}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Users;
