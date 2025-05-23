import { useState } from "react";
import { useParams } from "react-router-dom";
import UserChatQuestionsList from "./UserChatQuestionsList";

const AdminUserChatDetailsMain = () => {
  const { userEmail } = useParams();
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  const userChats = [
    {
      id: 1,
      userEmail: "john@example.com",
      questions: [
        {
          id: 1,
          type: "open_ended",
          question: "What is the price of the equipment?",
          answer: "The price varies based on customization.",
          required: true,
        },
        {
          id: 2,
          type: "multiple_choice",
          question: "Which industry are you in?",
          answer: "Dental",
          options: ["Dental", "Veterinarian", "Vision Professional"],
          required: false,
        },
        { id: 3, type: "statement", question: "Please confirm you have read the terms.", answer: "User acknowledged.", required: true },
        {
          id: 4,
          type: "file_upload",
          question: "Upload a photo of the equipment.",
          answer: "https://example.com/uploads/equipment.jpg",
          required: false,
        },
      ],
    },
    {
      id: 2,
      userEmail: "jane@example.com",
      questions: [
        {
          id: 5,
          type: "textarea",
          question: "Describe the issue you are facing.",
          answer: "The machine is making a strange noise.",
          required: true,
        },
        { id: 6, type: "number", question: "How many units do you need?", answer: "5", required: false },
      ],
    },
  ];

  const currentUserChat = userChats.find((chat) => chat.userEmail === userEmail);

  const handleToggleExpand = (questionId) => {
    setExpandedQuestionId(expandedQuestionId === questionId ? null : questionId);
  };

  if (!currentUserChat) {
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
            <h1 className="text-2xl font-bold tracking-tight text-white">Chat Details for {userEmail}</h1>
            <p className="text-gray-400">View the conversation history for this user.</p>
          </div>
        </div>

        <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-4">
          {currentUserChat.questions.length > 0 ? (
            <UserChatQuestionsList
              questions={currentUserChat.questions}
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
