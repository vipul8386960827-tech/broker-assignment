import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useOrderStore from "@/store/useOrderStore";
import { mockStocks } from "@/utils/mockStocks";
import { Stock, Holding, OrderPadProps } from "./OrderPad.types";

const OrderPad: React.FC<OrderPadProps> = ({  type, onClose }) => {
  const { buyStock, sellStock, holdings } = useOrderStore();

  const holdingsToStock = (holdings: Holding[]): Stock[] =>
    holdings.map((h) => ({
      symbol: h.symbol,
      name: h.symbol,
      currentPrice: h.price ?? 0,
      highPrice: h.price ?? 0,
      lowPrice: h.price ?? 0,
      availableQty: h.quantity ?? 0,
      holdingsQty: h.quantity ?? 0,
    }));

  const availableStocks: Stock[] =
    type === "SELL" ? holdingsToStock(holdings) : mockStocks;

  const placeholderStock: Stock = {
    symbol: "",
    name: "Select stock",
    currentPrice: 0,
    highPrice: 0,
    lowPrice: 0,
    availableQty: 0,
  };

  const [selectedStock, setSelectedStock] = useState<Stock>(
    availableStocks.length > 0 ? availableStocks[0] : placeholderStock
  );
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    setQuantity(0);
  }, [selectedStock]);

  useEffect(() => {
    if (availableStocks.length === 0) {
      setSelectedStock(placeholderStock);
    } else {
      const found = availableStocks.find(
        (s) => s.symbol === selectedStock.symbol
      );
      if (!found) {
        setSelectedStock(availableStocks[0]);
        setQuantity(0);
      }
    }
  }, [availableStocks]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (
      type === "SELL" &&
      selectedStock &&
      value > (selectedStock.holdingsQty ?? 0)
    ) {
      setQuantity(selectedStock.holdingsQty ?? 0);
    } else if (
      type === "BUY" &&
      selectedStock &&
      value > (selectedStock.availableQty ?? 0)
    ) {
      setQuantity(selectedStock.availableQty ?? 0);
    } else {
      setQuantity(value);
    }
  };

  const handleSelectAll = () => {
    if (!selectedStock || selectedStock.symbol === "") return;
    setQuantity(
      type === "SELL"
        ? selectedStock.holdingsQty ?? 0
        : selectedStock.availableQty ?? 0
    );
  };

  const price = selectedStock?.currentPrice ?? 0;
  const totalCost = (quantity * price).toFixed(2);
  const isStockSelected = selectedStock.symbol !== "";
  const isQuantityValid = quantity > 0;

  const handleSubmit = () => {
    if (!isQuantityValid || !isStockSelected || availableStocks.length === 0)
      return;

    if (type === "BUY") {
      buyStock(selectedStock, quantity);
      toast.success(`Bought ${quantity} shares of ${selectedStock.symbol}`);
    } else {
      sellStock(selectedStock, quantity);
      toast.success(`Sold ${quantity} shares of ${selectedStock.symbol}`);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-80 max-w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">{type} Order</h2>

        <div className="mb-3">
          <label className="block mb-1 font-medium">Stock</label>
          <select
            value={selectedStock.symbol}
            onChange={(e) =>
              setSelectedStock(
                availableStocks.find((s) => s.symbol === e.target.value) ||
                  placeholderStock
              )
            }
            disabled={availableStocks.length === 0}
            className="border rounded px-3 py-2 w-full text-black dark:text-white dark:bg-gray-700"
          >
            {type === "SELL" && availableStocks.length === 0 && (
              <option value="">No stocks available</option>
            )}
            {type !== "SELL" && (
              <option value="">{placeholderStock.name}</option>
            )}
            {availableStocks.map((s) => (
              <option key={s.symbol} value={s.symbol}>
                {s.symbol} (
                {type === "SELL" ? s.holdingsQty ?? 0 : s.availableQty ?? 0}
                shares)
              </option>
            ))}
          </select>
        </div>

        {isStockSelected && (
          <div className="mb-3 text-sm space-y-1">
            <p>Current Price: ${price.toFixed(2)}</p>
            <p>Min Price Today: ${selectedStock.lowPrice?.toFixed(2)}</p>
            <p>Max Price Today: ${selectedStock.highPrice?.toFixed(2)}</p>
          </div>
        )}

        <div className="mb-3">
          <label className="block mb-1 font-medium">Quantity</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              max={
                type === "SELL"
                  ? selectedStock?.holdingsQty
                  : selectedStock?.availableQty
              }
              disabled={!isStockSelected || availableStocks.length === 0}
              className="border rounded px-3 py-2 w-full"
            />
            <button
              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
              onClick={handleSelectAll}
              disabled={!isStockSelected || availableStocks.length === 0}
            >
              All
            </button>
          </div>
          {isStockSelected && (
            <p className="text-sm text-gray-500">
              Max
              {type === "SELL"
                ? selectedStock.holdingsQty
                : selectedStock.availableQty}
              shares
            </p>
          )}
        </div>

        {type === "BUY" && isStockSelected && (
          <p className="mb-3 font-medium">Total Cost: ${totalCost}</p>
        )}

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={`px-4 py-2 rounded text-white ${
              isStockSelected && isQuantityValid && availableStocks.length > 0
                ? type === "BUY"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={
              !isStockSelected ||
              !isQuantityValid ||
              availableStocks.length === 0
            }
            onClick={handleSubmit}
          >
            {type}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPad;
