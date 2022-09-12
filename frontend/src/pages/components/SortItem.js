import { BarsArrowDownIcon } from "@heroicons/react/24/outline";

const SortItem = ({ setOrder }) => {
  return (
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
  );
};

export default SortItem;
