import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserChatQuestionsList from "./UserChatQuestionsList";
import api from "../../../utils/apiClient";

const AdminUserChatDetailsMain = () => {
  const { userEmail } = useParams();
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [chatDetails, setChatDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/chatbot/interactions/${userEmail}`);
        setChatDetails(response.data);
      } catch (err) {
        toast.error(err.message || "Failed to fetch chat details");
        setChatDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (userEmail) {
      fetchChatDetails();
    }
  }, [userEmail]);

  const handleToggleExpand = (questionId) => {
    setExpandedQuestionId(expandedQuestionId === questionId ? null : questionId);
  };

  if (isLoading) {
    return (
      <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
        <div className="text-center py-10">
          <p className="text-gray-400">Loading chat details...</p>
        </div>
      </main>
    );
  }

  if (!chatDetails) {
    return (
      <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
        <div className="text-center py-10">
          <p className="text-gray-400">Chat details not found for {userEmail}.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Chat Details for {chatDetails.name || userEmail}</h1>
            <p className="text-gray-400">
              {chatDetails.industry && <span className="mr-2">Industry: {chatDetails.industry}</span>}
              {chatDetails.equipment && <span>Equipment: {chatDetails.equipment}</span>}
            </p>
          </div>
        </div>

        <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-4">
          {chatDetails.questions?.length > 0 ? (
            <UserChatQuestionsList
              questions={chatDetails.questions}
              expandedQuestionId={expandedQuestionId}
              onToggleExpand={handleToggleExpand}
            />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">No questions and answers found for this chat.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminUserChatDetailsMain;
