import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import OrderPad from "../OrderPad/OrderPad";
import { mockHoldings } from "@/utils/mockData";
import { mockStocks, Stock } from "@/utils/mockStocks";

const FAB_SIZE = 70;
const NAV_HEIGHT = 80;

const FAB: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<{
    stock: Stock;
    type: "BUY" | "SELL";
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const defaultHolding = mockHoldings[0];
  const defaultStock =
    mockStocks.find((s) => s.symbol === defaultHolding.symbol) || mockStocks[0];

  const handleOrderClick = (type: "BUY" | "SELL") => {
    setActiveOrder({ stock: defaultStock, type });
    setIsMenuOpen(false);
  };

  return (
    <>
      {activeOrder && (
        <OrderPad
          stock={activeOrder.stock}
          type={activeOrder.type}
          onClose={() => setActiveOrder(null)}
        />
      )}

      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          padding: 20,
          paddingBottom: NAV_HEIGHT,
        }}
      >
        <motion.div
          drag
          dragConstraints={containerRef}
          dragMomentum={false}
          dragElastic={0}
          style={{
            width: FAB_SIZE,
            bottom: NAV_HEIGHT,
            right: 20,
            x: 0,
            y: 0,
          }}
          className="absolute flex flex-col items-center pointer-events-auto"
        >
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="fab-menu"
                className="flex flex-col gap-2 mb-2"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => handleOrderClick("BUY")}
                  className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700"
                >
                  Buy
                </button>
                <button
                  onClick={() => handleOrderClick("SELL")}
                  className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700"
                >
                  Sell
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            <FaPlus size={20} />
          </motion.button>
        </motion.div>
      </div>
    </>
  );
};

export default FAB;
