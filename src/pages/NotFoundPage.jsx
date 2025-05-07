import React from "react";
import Header from "../components/global/Header";
import CrossIcon from "../../public/icons/CrossIcon";
import { useNavigate } from "react-router-dom";
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#030d13] text-white flex flex-col items-center">
      <Header />
      <main className="flex-1 flex flex-col items-center max-w-4xl mx-auto py-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">Page Not Found</h1>
        <p className="text-[#a0a0a0] max-w-2xl font-normal mb-12">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track to finding the right medical equipment.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-[#024544] hover:bg-[#035d5c] cursor-pointer text-white font-medium py-3 px-6 rounded-full transition-colors"
          >
            Go back to home page
          </button>
        </div>

        <div className="mt-16">
          <CrossIcon />
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
