import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { adminSidebarItems } from "../../../constants/adminSidebarItems";

export const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 md:hidden bg-[#1a1e24] p-2 rounded-md shadow-md text-white"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-40 h-screen bg-[#0f1216] border-r border-[#1a1e24] transition-all duration-300
        ${isOpen ? "w-64" : "w-0 md:w-64"} 
        overflow-y-auto
      `}
      >
        <div className="p-4 flex items-center justify-between border-b border-[#1a1e24] h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">
              <span className="text-white">group</span>
              <span className="text-[#4aa6a4]">ups</span>
            </span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="text-white z-100 md:hidden p-1 rounded-md hover:bg-[#1a1e24]">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 px-2">
          <ul className="space-y-1">
            {adminSidebarItems?.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-md text-sm
                    ${isActive(item.path) ? "bg-[#1a1e24] text-[#3CBFAE]" : "text-gray-300 hover:bg-[#1a1e24] hover:text-[#3CBFAE]"}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={18} />
                  <span className="text-md">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-[#1a1e24]">
          <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-[#1a1e24] hover:text-[#3CBFAE] w-full">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
