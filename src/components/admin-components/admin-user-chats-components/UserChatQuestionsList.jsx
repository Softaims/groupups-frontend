import UserChatQuestionCard from "./UserChatQuestionCard";

const UserChatQuestionsList = ({ responses, expandedQuestionId, onToggleExpand }) => {
  return (
    <div className="space-y-4">
      {responses.map((question) => (
        <UserChatQuestionCard
          key={question.question_id}
          question={question}
          isExpanded={expandedQuestionId === question.question_id}
          onToggleExpand={() => onToggleExpand(question.question_id)}
        />
      ))}
    </div>
  );
};

export default UserChatQuestionsList;
