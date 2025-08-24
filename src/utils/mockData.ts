export const brokers = [
  { id: "broker1", name: "Broker One" },
  { id: "broker2", name: "Broker Two" },
  { id: "broker3", name: "Broker Three" },
];

export const loginApi = async (
  brokerId: string,
  username: string,
  password: string,
  simulateTimeout = false
) => {
  return new Promise<{ status: number; message: string }>((resolve, reject) => {
    if (simulateTimeout) {
      setTimeout(() => {
        reject(new Error("Network Timeout"));
      }, 5000);
      return;
    }

    setTimeout(() => {
      if (username === "user" && password === "pass") {
        resolve({ status: 200, message: "Login successful" });
      } else if (username === "error") {
        resolve({ status: 500, message: "Server error" });
      } else {
        resolve({ status: 400, message: "Invalid credentials" });
      }
    }, 1000);
  });
};

export interface Holding {
  symbol: string;
  quantity: number;
  price: number;
}

export interface Order {
  symbol: string;
  type: "BUY" | "SELL";
  quantity: number;
  price: number;
  pnl: number;
}

export interface Position {
  symbol: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
}

export const mockHoldings: Holding[] = [
  { symbol: "AAPL", quantity: 10, price: 150 },
  { symbol: "TSLA", quantity: 5, price: 700 },
];

export const mockOrderbook: Order[] = [
  { symbol: "AAPL", type: "BUY", quantity: 10, price: 148, pnl: 20 },
  { symbol: "TSLA", type: "SELL", quantity: 5, price: 710, pnl: -50 },
];

export const mockPositions: Position[] = [
  { symbol: "AAPL", quantity: 10, entryPrice: 145, currentPrice: 150, pnl: 50 },
  {
    symbol: "TSLA",
    quantity: 5,
    entryPrice: 720,
    currentPrice: 700,
    pnl: -100,
  },
];


export interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  highPrice: number;
  lowPrice: number;
  availableQty: number;
  holdingsQty?: number;
}

export const mockStocks: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    currentPrice: 180,
    highPrice: 185,
    lowPrice: 178,
    availableQty: 500,
    holdingsQty: 10,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    currentPrice: 135,
    highPrice: 138,
    lowPrice: 132,
    availableQty: 300,
    holdingsQty: 0,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    currentPrice: 320,
    highPrice: 325,
    lowPrice: 315,
    availableQty: 400,
    holdingsQty: 5,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    currentPrice: 720,
    highPrice: 735,
    lowPrice: 710,
    availableQty: 200,
    holdingsQty: 0,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    currentPrice: 150,
    highPrice: 155,
    lowPrice: 148,
    availableQty: 350,
    holdingsQty: 0,
  },
];
