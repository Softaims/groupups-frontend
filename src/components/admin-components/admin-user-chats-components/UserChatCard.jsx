import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserChatCard = ({ chat }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/admin/chats/${chat.id}`);
  };

  return (
    <div
      key={chat.id}
      className="flex items-center justify-between p-4 bg-[#0c0f12] rounded-lg border border-[#2a2e34] hover:bg-[#22272e] transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex-1">
        <h3 className="text-white font-medium">{chat.user.name}</h3>
        <p className="text-gray-400 text-sm">{chat.user.email}</p>
        <p className="text-gray-500 text-xs mt-1">Conversation Time: {new Date(chat.created_at).toLocaleString()}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">{chat.equipment.name}</span>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default UserChatCard;
