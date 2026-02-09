
import React from 'react';

const MarketIndexItem: React.FC<{ label: string; value: string; change: string; isUp: boolean }> = ({ label, value, change, isUp }) => (
  <div className="flex flex-col border-r border-emerald-800/20 pr-4 last:border-none">
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-bold text-slate-500 uppercase">{label}</span>
      <span className="text-sm font-bold">{value}</span>
      <span className={`text-[10px] font-medium ${isUp ? 'text-up' : 'text-down'}`}>
        {isUp ? '▲' : '▼'} {change}
      </span>
    </div>
  </div>
);

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-2 bg-surface-dark border-b border-emerald-900/30 z-20 sticky top-0">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-primary p-1.5 rounded-lg group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-background-dark font-bold">query_stats</span>
          </div>
          <h1 className="text-lg font-extrabold tracking-tight">AlphaTrade <span className="text-primary">PRO</span></h1>
        </div>

        <div className="hidden lg:flex items-center gap-4 py-1">
          <MarketIndexItem label="코스피" value="2,560.12" change="1.24%" isUp={true} />
          <MarketIndexItem label="코스닥" value="842.15" change="0.52%" isUp={false} />
          <MarketIndexItem label="원/달러" value="1,320.40" change="0.08%" isUp={true} />
          <MarketIndexItem label="S&P 500" value="5,120.40" change="0.81%" isUp={true} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex items-center group">
          <span className="material-symbols-outlined absolute left-3 text-slate-400 text-sm group-focus-within:text-primary transition-colors">search</span>
          <input 
            className="bg-background-dark border-none rounded-lg pl-9 pr-4 py-1.5 text-sm w-48 lg:w-64 focus:ring-1 focus:ring-primary placeholder:text-slate-500" 
            placeholder="종목명, 티커 검색..." 
            type="text"
          />
        </div>
        
        <button className="p-2 hover:bg-emerald-900/20 rounded-lg relative text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-surface-dark"></span>
        </button>

        <div className="h-8 w-8 rounded-full overflow-hidden border border-primary/30 cursor-pointer hover:border-primary transition-colors">
          <img className="w-full h-full object-cover" src="https://picsum.photos/100/100?random=1" alt="Avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
