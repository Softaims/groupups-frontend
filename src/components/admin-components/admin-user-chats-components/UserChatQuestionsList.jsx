import UserChatQuestionCard from "./UserChatQuestionCard";

const UserChatQuestionsList = ({
  questions,
  expandedQuestionId,
  onToggleExpand,
}) => {
  if (questions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">No questions and answers found for this chat.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <UserChatQuestionCard
          key={question.id}
          question={question}
          isExpanded={expandedQuestionId === question.id}
          onToggleExpand={() => onToggleExpand(question.id)}
        />
      ))}
    </div>
  );
};

export default UserChatQuestionsList; 