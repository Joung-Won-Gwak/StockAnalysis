
import React, { useState, useEffect } from 'react';
import { StockData } from '../types';

const TradingPanel: React.FC<{ selectedStock: StockData }> = ({ selectedStock }) => {
  const [priceValue, setPriceValue] = useState(selectedStock.price.toString());
  const [isPriceLocked, setIsPriceLocked] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Auto-update price field if not locked by user
  useEffect(() => {
    if (!isPriceLocked) {
      setPriceValue(selectedStock.price.toLocaleString());
      setLastUpdate(Date.now());
    }
  }, [selectedStock.price, isPriceLocked]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceValue(e.target.value);
    setIsPriceLocked(true);
  };

  const toggleLock = () => {
    setIsPriceLocked(!isPriceLocked);
    if (isPriceLocked) {
      setPriceValue(selectedStock.price.toLocaleString());
    }
  };

  return (
    <footer className="h-14 bg-surface-dark border-t border-emerald-900/30 flex items-center px-6 gap-6 z-30 sticky bottom-0 shadow-2xl">
      <div className="flex items-center gap-4 border-r border-emerald-900/20 pr-6 shrink-0">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">선택 종목:</span>
        <div className="flex flex-col">
          <span className="text-sm font-black leading-none">{selectedStock.name}</span>
          <span className="text-[10px] text-slate-500 font-bold uppercase">{selectedStock.symbol}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">수량:</span>
          <div className="relative flex items-center">
            <input 
              className="w-20 h-8 bg-background-dark border-none rounded text-sm text-center focus:ring-1 focus:ring-primary font-bold pr-6" 
              type="number" 
              defaultValue="10" 
            />
            <span className="absolute right-2 text-[10px] font-bold text-slate-500">주</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">가격:</span>
          <div className="relative group">
            <input 
              className={`w-32 h-8 bg-background-dark border-none rounded text-sm text-center focus:ring-1 focus:ring-primary font-bold transition-colors ${selectedStock.change >= 0 ? 'text-up' : 'text-down'}`} 
              type="text" 
              value={priceValue}
              onChange={handlePriceChange}
            />
            <button 
              onClick={toggleLock}
              className={`absolute -right-1 -top-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] border transition-colors ${isPriceLocked ? 'bg-amber-500/20 text-amber-500 border-amber-500' : 'bg-emerald-500/20 text-emerald-500 border-emerald-500'}`}
            >
              <span className="material-symbols-outlined text-[10px] font-bold">
                {isPriceLocked ? 'lock' : 'lock_open'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto shrink-0">
        <div className="flex flex-col items-end mr-4 hidden md:flex">
          <span className="text-[10px] font-bold text-slate-500 uppercase">주문 금액</span>
          <span className="text-xs font-black">{(selectedStock.price * 10).toLocaleString()} KRW</span>
        </div>

        <button className="bg-up hover:bg-up/90 text-white px-6 lg:px-10 py-1.5 rounded-lg text-sm font-black shadow-lg shadow-up/20 transition-all active:scale-95">매수</button>
        <button className="bg-down hover:bg-down/90 text-white px-6 lg:px-10 py-1.5 rounded-lg text-sm font-black shadow-lg shadow-down/20 transition-all active:scale-95">매도</button>
        
        <div className="hidden sm:block w-[1px] h-6 bg-emerald-900/20 mx-2"></div>
        
        <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-background-dark hover:bg-emerald-900/20 rounded-lg text-xs font-bold text-slate-500 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-sm">history</span>
          미체결
        </button>
      </div>
    </footer>
  );
};

export default TradingPanel;
