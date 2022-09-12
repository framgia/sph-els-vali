import Pagination from "../../components/Pagination";

const FooterSection = ({search, handlePageClick, pageCount, setItemsPerPage}) => {
  return (
    <div className="p-3">
      {!search.length > 0 && (
        <Pagination
          handlePageClick={handlePageClick}
          pageCount={pageCount}
          setItemsPerPage={setItemsPerPage}
        />
      )}
    </div>
  );
};

export default FooterSection;
