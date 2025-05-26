import { Link } from "react-router-dom";

const SkeletonAdminSidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 bg-[#0f1216] border-r border-[#1a1e24] transition-all duration-300 overflow-y-auto">
      <div className="p-4 flex items-center justify-between border-b border-[#1a1e24] h-16">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold">
            <span className="text-white">group</span>
            <span className="text-[#4aa6a4]">ups</span>
          </span>
        </Link>
      </div>

      <nav className="mt-4 px-2">
        <ul className="space-y-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <li key={idx}>
              <div className="flex items-center gap-3 px-3 py-2 animate-pulse">
                <div className="w-5 h-5 bg-gray-700/50 rounded-md" />
                <div className="h-4 w-3/4 bg-gray-700/50 rounded-md" />
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-[#1a1e24]">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-5 h-5 bg-gray-700/50 rounded-md" />
          <div className="h-4 w-1/2 bg-gray-700/50 rounded-md" />
        </div>
      </div>
    </aside>
  );
};

export default SkeletonAdminSidebar;
