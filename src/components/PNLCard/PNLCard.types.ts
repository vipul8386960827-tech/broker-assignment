export interface Holding {
  symbol: string;
  quantity: number;
  price: number;
  currentPrice?: number;
}

export interface PNLCardProps {
  holdings: Holding[];
}