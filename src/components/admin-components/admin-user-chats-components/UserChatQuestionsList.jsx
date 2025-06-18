import UserChatQuestionCard from "./UserChatQuestionCard";

const UserChatQuestionsList = ({ responses }) => {
  return (
    <div className="space-y-4">
      {responses.map((question) => (
        <UserChatQuestionCard key={question.question_id} question={question} />
      ))}
    </div>
  );
};

export default UserChatQuestionsList;
