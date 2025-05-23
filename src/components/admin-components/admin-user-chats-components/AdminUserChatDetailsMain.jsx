import { Navigate } from "react-router-dom";
import UserChatQuestionsList from "./UserChatQuestionsList";
import useAdminChatDetails from "../../../hooks/useAdminChatDetails";
import UserChatDetailHeader from "./UserChatDetailHeader";
import SkeletonUserChatDetailHeader from "./SkeletonUserChatDetailHeader";
import SkeletonUserChatQuestionCard from "./SkeletonUserChatQuestionCard";

const AdminUserChatDetailsMain = () => {
  const { interactionDetailS, isLoading, expandedQuestionId, handleToggleExpand } = useAdminChatDetails();
  console.log("interaction", interactionDetailS);
  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            <SkeletonUserChatDetailHeader />
            {[1, 2, 3].map((item) => (
              <SkeletonUserChatQuestionCard key={item} />
            ))}
          </div>
        ) : interactionDetailS?.responses ? (
          <>
            <UserChatDetailHeader
              user={interactionDetailS?.user}
              equipment={interactionDetailS?.equipment}
              industry={interactionDetailS?.industry}
              time={interactionDetailS?.created_at}
            />
            <UserChatQuestionsList
              responses={interactionDetailS?.responses}
              expandedQuestionId={expandedQuestionId}
              onToggleExpand={handleToggleExpand}
            />
          </>
        ) : (
          <Navigate to={"/404"} />
        )}
      </div>
    </main>
  );
};

export default AdminUserChatDetailsMain;
