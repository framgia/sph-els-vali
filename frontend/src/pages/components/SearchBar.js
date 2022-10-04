import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import useDebounce from "hooks/useDebounce";

const SearchBar = ({ handleSearch }) => {
  const { debounce } = useDebounce();
  const handleOnChange = (e) => {
    const value = e.target.value;
    debounce(() => handleSearch(value), 1000);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center border-2 rounded-md"
    >
      <MagnifyingGlassIcon className="w-5 text-gray-400 ml-1" />
      <input
        onChange={handleOnChange}
        type="text"
        placeholder="search"
        className="p-1 rounded-md outline-none w-full"
      />
    </form>
  );
};

export default SearchBar;
