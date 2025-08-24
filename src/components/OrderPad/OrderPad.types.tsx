export interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  highPrice: number;
  lowPrice: number;
  availableQty: number;
  holdingsQty?: number;
}

export interface Holding {
  symbol: string;
  quantity: number;
  price: number;
}

export interface OrderPadProps {
  stock?: Stock | null;
  type: "BUY" | "SELL";
  onClose: () => void;
}
