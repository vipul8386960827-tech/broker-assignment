import React from "react";
import { useRouter } from "next/router";
import useAppStore from "@/store/useAppStore";
import { ArrowLeft } from "lucide-react";
import { navItems } from "./NavigationButtons";

const BottomNav: React.FC = () => {
  const router = useRouter();
  const setLoggedIn = useAppStore((state) => state.setLoggedIn);

  const handleBackToBroker = () => {
    setLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex py-2 z-50">
      <button
        onClick={handleBackToBroker}
        className="flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
      >
        <ArrowLeft size={20} />
        <span className="text-xs mt-1">Back</span>
      </button>

      <div className="flex flex-1 justify-around">
        {navItems.map((item) => {
          const isActive = router.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
