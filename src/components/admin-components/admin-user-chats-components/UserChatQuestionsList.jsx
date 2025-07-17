import UserChatQuestionCard from "./UserChatQuestionCard";

const UserChatQuestionsList = ({ responses }) => {
  return (
    <div className=" bg-[#0f1216] border border-[#1a1e24] rounded-lg shadow p-2 ">
      <div className="max-h-[35git checkout -b change-requests-4-5-user-chat-uivh] overflow-y-auto space-y-4 p-4 ">
        {responses.map((question) => (
          <UserChatQuestionCard
            key={question.question_id}
            question={question}
          />
        ))}
      </div>
    </div>
  );
};

export default UserChatQuestionsList;
