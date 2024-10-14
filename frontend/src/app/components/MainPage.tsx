import Link from "next/link";
import React from "react";

const MainPage = () => {
  return (
    <div>
      <img
        src="/script3.png"
        className="absolute inset-0 h-full w-full object-cover"
        alt="bg-img"
      />
      <div className="relative h-screen w-full">
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
          <h1 className="text-6xl bg-gradient-to-r from-blue-500 to-[#933ffd] text-transparent bg-clip-text whitespace-nowrap">
          Commencez la révolution 
          </h1>

          <div className="flex space-x-8">
            <div className="pl-4 pr-4 pt-2 pb-2 rounded-lg shadow-lg bg-gradient-to-r from-[#18c7ff] to-[#933ffd] hover:from-[#18c7ff] hover:to-[#933ffd]">
              <Link href="/upload">
                <button className="text-4xl text-white">Developer</button>
              </Link>
            </div>

            <div className="pl-4 pr-4 pt-2 pb-2 rounded-lg shadow-lg bg-gradient-to-r from-[#18c7ff] to-[#933ffd] hover:from-[#18c7ff] hover:to-[#933ffd]">
              <Link href="/minning">
                <button className="text-4xl text-white">Miner</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
