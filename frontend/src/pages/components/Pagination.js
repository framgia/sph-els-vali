import ReactPaginate from "react-paginate";
import ShowItem from "./ShowItem";

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
      <ShowItem setItemsPerPage={setItemsPerPage} />
    </div>
  );
};

export default Pagination;
