
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  market: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface InvestorData {
  time: string;
  index: number;
  individual: number;
  foreign: number;
  institution: number;
  pension: number;
  insurance: number;
}

export interface TradingNotification {
  id: string;
  time: string;
  type: '돌파' | '이동평균' | '거래폭발';
  message: string;
  price: number;
  symbol: string;
}
