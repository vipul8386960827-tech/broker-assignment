import React from "react";
import BottomNav from "@/components/BottomNav/BottomNav";
import useOrderStore from "@/store/useOrderStore";

const PositionsPage: React.FC = () => {
  const positions = useOrderStore((state) => state.positions);

  return (
    <div className="min-h-screen pb-20 p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl mb-6 font-bold text-gray-900 dark:text-white">
        Positions
      </h1>

      {positions.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">No positions yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {positions.map((pos) => (
            <div
              key={pos.symbol}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div className="flex flex-col">
                <span className="font-bold text-gray-800 dark:text-white text-lg">
                  {pos.symbol}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {pos.quantity} shares
                </span>
              </div>

              <div className="flex flex-col text-right text-gray-700 dark:text-gray-300">
                <span>Entry: ${pos.entryPrice.toFixed(2)}</span>
                <span>Current: ${pos.currentPrice.toFixed(2)}</span>
                <span
                  className={
                    pos.pnl >= 0
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  PNL: ${pos.pnl.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default PositionsPage;
