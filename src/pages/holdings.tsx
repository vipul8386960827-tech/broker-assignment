import React from "react";
import BottomNav from "@/components/BottomNav/BottomNav";
import useOrderStore from "@/store/useOrderStore";

const HoldingsPage: React.FC = () => {
  const holdings = useOrderStore((state) => state.holdings);

  return (
    <div className="min-h-screen pb-20 p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl mb-6 font-bold text-gray-900 dark:text-white">
        Holdings
      </h1>

      {holdings.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">No holdings yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {holdings.map((h) => (
            <div
              key={h.symbol}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <span className="font-bold text-gray-800 dark:text-white">
                  {h.symbol}
                </span>
                -
                <span className="text-gray-700 dark:text-gray-300">
                  {h.quantity} shares
                </span>
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                Price: ${h.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default HoldingsPage;
