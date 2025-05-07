import React from "react";

const WelcomeSection = () => {
  return (
    <main className="flex flex-1">
      <div className="lg:w-[40%] w-full flex flex-col justify-between px-12 py-10">
        <div className="flex-1 flex items-center justify-center">
          <div className="">
            <h1 className="text-2xl text-white md:text-3xl mb-6">
              Hi! I can help narrow down CBCT options for you without selling to you :)
            </h1>
            <p className="text-[#4aa6a4] text-2xl mb-8">I'll ask you Qs to guide us. You can ask me Qs too.</p>
            <button className="bg-white text-[#030d13] font-medium py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </div>
        </div>

        <div className="text-sm text-[#FFFFFF]/41 text-center">This should take ~5 minutes.</div>
      </div>
    </main>
  );
};

export default WelcomeSection;
