import UserChatCard from "./UserChatCard";

const UserChatsList = ({ chats }) => {
  return (
    <div className="space-y-4">
      {chats.map((chat) => (
        <UserChatCard key={chat.id} chat={chat} />
      ))}
    </div>
  );
};

export default UserChatsList;
