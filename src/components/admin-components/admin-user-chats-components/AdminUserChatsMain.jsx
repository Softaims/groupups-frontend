import { useState } from "react";
import { Search, Filter, ChevronRight, ChevronLeft } from "lucide-react";
import { useIndustryEquipmentStore } from "../../../store/industryEquipmentStore";
import UserChatsFilter from "./UserChatsFilter";
import UserChatsList from "./UserChatsList";
import UserChatsHeader from "./UserChatsHeader";

const AdminUserChatsMain = () => {
  const { industries, industriesLoading } = useIndustryEquipmentStore();
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data for demonstration
  const userChats = [
    { id: 1, name: "John Doe", email: "john@example.com", industry: "Dental", lastMessage: "2 hours ago" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", industry: "Veterinarian", lastMessage: "3 hours ago" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", industry: "Vision Professional", lastMessage: "5 hours ago" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", industry: "Dental", lastMessage: "1 day ago" },
    { id: 5, name: "David Brown", email: "david@example.com", industry: "Veterinarian", lastMessage: "2 days ago" },
    { id: 6, name: "Emily Davis", email: "emily@example.com", industry: "Vision Professional", lastMessage: "3 days ago" },
    { id: 7, name: "Michael Lee", email: "michael@example.com", industry: "Dental", lastMessage: "4 days ago" },
    { id: 8, name: "Lisa Anderson", email: "lisa@example.com", industry: "Veterinarian", lastMessage: "5 days ago" },
  ];

  const filteredChats = userChats.filter((chat) => {
    const matchesIndustry = selectedIndustry === "all" || chat.industry === selectedIndustry;
    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || chat.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredChats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentChats = filteredChats.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleIndustryChange = (e) => {
    setSelectedIndustry(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationControls = () => {
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
          Showing {startIndex + 1} to {Math.min(endIndex, filteredChats.length)} of {filteredChats.length} chats
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-[#22272e] disabled:opacity-50 disabled:cursor-not-allowed"
            title="Previous Page"
          >
            <ChevronLeft className="h-4 w-4 text-gray-400" />
          </button>

          {startPage > 1 && (
            <>
              <button onClick={() => handlePageChange(1)} className="px-3 py-1 rounded-md hover:bg-[#22272e] text-gray-400">
                1
              </button>
              {startPage > 2 && <span className="text-gray-400">...</span>}
            </>
          )}

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${currentPage === page ? "bg-[#3CBFAE] text-white" : "hover:bg-[#22272e] text-gray-400"}`}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
              <button onClick={() => handlePageChange(totalPages)} className="px-3 py-1 rounded-md hover:bg-[#22272e] text-gray-400">
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
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

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        <UserChatsHeader />
        <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-4">
          <UserChatsFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedIndustry={selectedIndustry}
            onIndustryChange={handleIndustryChange}
            industries={industries}
          />

          {currentChats.length > 0 ? (
            <>
              <UserChatsList chats={currentChats} />
              {renderPaginationControls()}
            </>
          ) : searchQuery ? (
            <div className="text-center py-10">
              <p className="text-gray-400">No chats found matching "{searchQuery}"</p>
              <button onClick={() => setSearchQuery("")} className="mt-2 text-[#3CBFAE] hover:underline">
                Clear search
              </button>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">No user chats available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminUserChatsMain;
