import React from "react";
import BottomNav from "@/components/BottomNav/BottomNav";
import useOrderStore from "@/store/useOrderStore";

const OrderbookPage: React.FC = () => {
  const orders = useOrderStore((state) => state.orders);
  const reversedOrders = [...orders].reverse();

  return (
    <div className="min-h-screen pb-20 p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl mb-6 font-bold text-gray-900 dark:text-white">
        Orderbook
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">No active orders.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reversedOrders.map((order, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div className="flex flex-col">
                <span className="font-bold text-gray-800 dark:text-white text-lg">
                  {order.symbol}
                </span>
                <span
                  className={`font-semibold ${
                    order.type === "BUY" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.type}
                </span>
              </div>

              <div className="flex flex-col text-right text-gray-700 dark:text-gray-300">
                <span>Qty: {order.quantity}</span>
                <span>Price: ${order.price.toFixed(2)}</span>
                <span
                  className={
                    order.pnl >= 0
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  PNL: ${order.pnl.toFixed(2)}
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

export default OrderbookPage;
