import SearchBar from "../../components/SearchBar";
import SortItem from "../../components/SortItem";

const HeaderSection = ({
  search,
  setSearch,
  handlePageClick,
  setItemOffset,
  setOrder,
}) => {
  const handleSearch = (e) => {
    const handle = { selected: 0 };
    setSearch(e);
    handlePageClick(handle);

    if (!e.length > 0) {
      setItemOffset(0);
    }
  };

  return (
    <div className="border-b-2 p-3 flex items-center justify-between">
      <h2 className="sm:text-[1.5rem] md:text-[2rem] font-medium ">
        Users List
      </h2>
      <div className="flex items-center space-x-3">
        <SearchBar handleSearch={handleSearch} search={search} />
        <SortItem setOrder={setOrder} />
      </div>
    </div>
  );
};

export default HeaderSection;
