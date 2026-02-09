
import React from 'react';

const RankItem: React.FC<{ code: string; name: string; price: string; change: string; isUp: boolean; symbol: string }> = ({ code, name, price, change, isUp, symbol }) => (
  <div className="p-3 flex items-center justify-between hover:bg-background-dark/50 transition-colors cursor-pointer group">
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] ${isUp ? 'bg-emerald-900/30 text-primary' : 'bg-blue-900/30 text-blue-400'}`}>
        {symbol}
      </div>
      <div>
        <p className="text-xs font-black group-hover:text-primary transition-colors">{name}</p>
        <p className="text-[10px] text-slate-500">{code}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xs font-black">{price}</p>
      <p className={`text-[10px] font-bold ${isUp ? 'text-up' : 'text-down'}`}>{change}</p>
    </div>
  </div>
);

const VolumeBar: React.FC<{ label: string; amount: string; progress: number; opacity: string }> = ({ label, amount, progress, opacity }) => (
  <div>
    <div className="flex justify-between text-xs font-bold mb-1.5">
      <span>{label}</span>
      <span className="text-slate-500">{amount}</span>
    </div>
    <div className="w-full h-1.5 bg-background-dark rounded-full overflow-hidden">
      <div className={`h-full bg-primary ${opacity}`} style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

const LiveRankings: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-surface-dark rounded-xl border border-emerald-900/20 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-emerald-900/10 flex justify-between items-center">
          <h3 className="text-sm font-black uppercase tracking-wider">실시간 급등 종목</h3>
          <span className="text-[10px] font-bold text-primary animate-pulse flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> 실시간
          </span>
        </div>
        <div className="divide-y divide-emerald-900/10">
          <RankItem symbol="SK" name="SK하이닉스" code="000660" price="165,400" change="▲ 4,300 (+2.67%)" isUp={true} />
          <RankItem symbol="LG" name="LG화학" code="051910" price="452,000" change="▲ 12,000 (+2.73%)" isUp={true} />
          <RankItem symbol="KA" name="카카오뱅크" code="323410" price="28,150" change="▲ 1,100 (+4.07%)" isUp={true} />
          <RankItem symbol="PO" name="POSCO홀딩스" code="005490" price="442,500" change="▲ 9,500 (+2.19%)" isUp={true} />
        </div>
        <button className="w-full py-2.5 text-center text-[11px] font-bold text-slate-500 bg-background-dark/30 hover:text-primary transition-colors">
          전체 순위 보기
        </button>
      </div>

      <div className="bg-surface-dark rounded-xl border border-emerald-900/20 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-emerald-900/10">
          <h3 className="text-sm font-black uppercase tracking-wider">증권사별 매매 현황</h3>
        </div>
        <div className="p-4 space-y-4">
          <VolumeBar label="키움증권" amount="120만 주" progress={85} opacity="opacity-100" />
          <VolumeBar label="미래에셋증권" amount="90만 주" progress={65} opacity="opacity-70" />
          <VolumeBar label="삼성증권" amount="70만 주" progress={50} opacity="opacity-50" />
          <VolumeBar label="한국투자증권" amount="40만 주" progress={30} opacity="opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default LiveRankings;
