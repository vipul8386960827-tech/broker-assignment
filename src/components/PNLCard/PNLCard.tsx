import React from "react";
import { PNLCardProps } from "./PNLCard.types";

const PNLCard: React.FC<PNLCardProps> = ({ holdings }) => {
  const totalQuantity = holdings.reduce((acc, h) => acc + h.quantity, 0);
  const totalInvested = holdings.reduce(
    (acc, h) => acc + h.quantity * h.price,
    0
  );
  const totalCurrent = holdings.reduce(
    (acc, h) => acc + h.quantity * (h.currentPrice ?? 0),
    0
  );
  const totalPNL = totalCurrent - totalInvested;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
        Portfolio Summary
      </h2>
      <div className="flex justify-between mb-1">
        <span className="text-gray-700 dark:text-gray-300">
          Total Quantity:
        </span>
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalQuantity} shares
        </span>
      </div>
      <div className="flex justify-between mb-1">
        <span className="text-gray-700 dark:text-gray-300">
          Total Invested:
        </span>
        <span className="font-semibold text-gray-900 dark:text-white">
          ${totalInvested.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between mb-1">
        <span className="text-gray-700 dark:text-gray-300">Current Value:</span>
        <span className="font-semibold text-gray-900 dark:text-white">
          ${totalInvested.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-700 dark:text-gray-300">Total PNL:</span>
        <span
          className={`font-semibold ${
            totalPNL >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ${0}
        </span>
      </div>
    </div>
  );
};

export default PNLCard;
