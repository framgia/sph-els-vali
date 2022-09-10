import { useEffect, useState } from "react";

function usePagination(itemsPerPage, data) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    if (typeof data !== "string") {
      setCurrentItems(
        data
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(itemOffset, endOffset)
      );
      setPageCount(Math.ceil(data.length / itemsPerPage));
    } else {
      setPageCount(1);
    }
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return { handlePageClick, currentItems, pageCount, setItemOffset };
}

export default usePagination;
