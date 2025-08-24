

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
