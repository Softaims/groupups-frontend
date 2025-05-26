import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalItems,
}) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const maxVisiblePages = 3;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-between mt-6 border-t border-[#2a2e34] pt-4">
      <div className="text-sm text-gray-400">
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} chats
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md hover:bg-[#22272e] disabled:opacity-50 disabled:cursor-not-allowed"
          title="Previous Page"
        >
          <ChevronLeft className="h-4 w-4 text-gray-400" />
        </button>
        
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-1 rounded-md hover:bg-[#22272e] text-gray-400"
            >
              1
            </button>
            {startPage > 2 && <span className="text-gray-400">...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? "bg-[#3CBFAE] text-white"
                : "hover:bg-[#22272e] text-gray-400"
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-1 rounded-md hover:bg-[#22272e] text-gray-400"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md hover:bg-[#22272e] disabled:opacity-50 disabled:cursor-not-allowed"
          title="Next Page"
        >
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default PaginationControls; 