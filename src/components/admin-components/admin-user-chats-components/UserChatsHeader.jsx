const UserChatsHeader = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">User Chats</h1>
        <p className="text-gray-400">Manage and view user chat conversations</p>
      </div>
    </div>
  );
};

export default UserChatsHeader; 