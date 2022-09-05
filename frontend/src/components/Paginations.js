import ReactPaginate from "react-paginate";

const Pagination = ({ handlePageClick, pageCount, setItemsPerPage }) => {
  return (
    <div className="flex justify-end space-x-2">
      <ReactPaginate
        className="flex space-x-2 w-max pagination items-center"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => handlePageClick(e)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
      <div className="flex items-center">
        <label htmlFor="pages">Show:</label>
        <select
          className="outline-none trans p-1 rounded-lg bg-gray-50"
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          name="pages"
          defaultValue={5}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
          <option value="80">80</option>
          <option value="90">90</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
