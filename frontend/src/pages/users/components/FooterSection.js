import Pagination from "../../components/Pagination";

const FooterSection = ({
  search,
  handlePageClick,
  pageCount,
  setItemsPerPage,
  itemsPerPage,
}) => {
  return (
    <div className="p-3">
      {!search.length > 0 && (
        <Pagination
          handlePageClick={handlePageClick}
          pageCount={pageCount}
          setItemsPerPage={setItemsPerPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default FooterSection;
