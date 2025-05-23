import UserChatCard from "./UserChatCard";

const UserChatsList = ({ chats }) => {
  if (chats.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">No chats found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {chats.map((chat) => (
        <UserChatCard key={chat.id} chat={chat} />
      ))}
    </div>
  );
};

export default UserChatsList; 