import { create } from "zustand";
import {
  Holding,
  Order,
  Position,
  mockHoldings,
  mockOrderbook,
  mockPositions,
} from "@/utils/mockData";
import { Stock, mockStocks } from "@/utils/mockStocks";

interface OrderState {
  holdings: Holding[];
  orders: Order[];
  positions: Position[];
  stocks: Stock[];
  buyStock: (stock: Stock, quantity: number) => void;
  sellStock: (stock: Stock, quantity: number) => void;
}

const useOrderStore = create<OrderState>((set, get) => ({
  holdings: [...mockHoldings],
  orders: [...mockOrderbook],
  positions: [...mockPositions],
  stocks: [...mockStocks],

  buyStock: (stock, quantity) => {
    if (quantity <= 0) return;

    const { holdings, orders } = get();

    const existingHolding = holdings.find((h) => h.symbol === stock.symbol);
    if (existingHolding) {
      existingHolding.quantity += quantity;
      existingHolding.price = stock.currentPrice;
    } else {
      holdings.push({
        symbol: stock.symbol,
        quantity,
        price: stock.currentPrice,
      });
    }

    orders.push({
      symbol: stock.symbol,
      type: "BUY",
      quantity,
      price: stock.currentPrice,
      pnl: 0,
    });

    set({ holdings: [...holdings], orders: [...orders] });
  },

  sellStock: (stock, quantity) => {
    if (quantity <= 0) return;

    const { holdings, orders } = get();

    const existingHolding = holdings.find((h) => h.symbol === stock.symbol);
    if (!existingHolding || existingHolding.quantity < quantity) return;

    existingHolding.quantity -= quantity;

    if (existingHolding.quantity === 0) {
      set({ holdings: holdings.filter((h) => h.quantity > 0) });
    } else {
      set({ holdings: [...holdings] });
    }

    orders.push({
      symbol: stock.symbol,
      type: "SELL",
      quantity,
      price: stock.currentPrice,
      pnl: 0,
    });
  },
}));

export default useOrderStore;
