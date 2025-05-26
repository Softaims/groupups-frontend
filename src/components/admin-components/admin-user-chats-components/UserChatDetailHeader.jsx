const UserChatDetailHeader = ({ user, equipment, time }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">{user?.name || user?.email}</h1>
        <div className="text-gray-400 space-y-1">
          {/* <p>
            <span className="mr-2">Industry: {industry?.name}</span>
          </p> */}
          <p>
            <span>Equipment: {equipment?.name}</span>
          </p>
          <p className="text-sm">Conversation Time: {new Date(time).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default UserChatDetailHeader;
