import { Search, Filter } from "lucide-react";
import UserChatsFilter from "./UserChatsFilter";
import UserChatsList from "./UserChatsList";
import UserChatsHeader from "./UserChatsHeader";
import useAdminChats from "../../../hooks/useAdminChats";
import SkeletonUserChatCard from "./SkeletonUserChatCard";
import PaginationControls from "../admin-global/PaginationControls";

const AdminUserChatsMain = () => {
  const {
    interactions,
    isLoading,
    equipment,
    selectedEquipment,
    searchQuery,
    currentPage,
    pagination,
    handleSearchChange,
    handleEquipmentChange,
    handlePageChange,
  } = useAdminChats();

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        <UserChatsHeader />
        <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-4">
          <UserChatsFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedIndustry={selectedEquipment}
            handleEquipmentChange={handleEquipmentChange}
            equipment={equipment}
          />

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <SkeletonUserChatCard key={item} />
              ))}
            </div>
          ) : interactions?.length > 0 ? (
            <>
              <UserChatsList chats={interactions} />
              <PaginationControls
                currentPage={currentPage}
                totalPages={pagination.total_pages}
                onPageChange={handlePageChange}
                startIndex={(currentPage - 1) * pagination.limit}
                endIndex={currentPage * pagination.limit}
                totalItems={pagination.total}
              />
            </>
          ) : searchQuery ? (
            <div className="text-center py-10">
              <p className="text-gray-400">No chats found matching "{searchQuery}"</p>
              <button onClick={() => handleSearchChange({ target: { value: "" } })} className="mt-2 text-[#3CBFAE] hover:underline">
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
