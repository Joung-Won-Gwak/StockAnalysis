
import React from 'react';

const Card: React.FC<{ label: string; value: string; subValue: string; isUp?: boolean; icon: string; progress?: number }> = ({ label, value, subValue, isUp, icon, progress }) => (
  <div className="bg-surface-dark p-4 rounded-xl border border-emerald-900/20 shadow-lg hover:border-primary/30 transition-colors">
    <div className="flex justify-between items-start mb-2">
      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
      <span className="material-symbols-outlined text-slate-400 text-lg">{icon}</span>
    </div>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-black">{value}</span>
      <span className={`text-xs font-bold pb-1 ${isUp === undefined ? 'text-primary' : (isUp ? 'text-up' : 'text-down')}`}>
        {subValue}
      </span>
    </div>
    {progress !== undefined ? (
      <div className="w-full h-1.5 bg-background-dark rounded-full mt-3 overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
      </div>
    ) : (
      <p className="text-[10px] text-slate-500 mt-2 italic">정상 범위 내 변동</p>
    )}
  </div>
);

const MarketSummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card label="공포 및 탐욕 지수" value="68" subValue="탐욕" icon="psychology" progress={68} />
      <Card label="시장 등락 비율" value="상승 642" subValue="하락 218" icon="balance" isUp={true} />
      <Card label="거래 대금" value="12.4조" subValue="+14.2%" icon="bar_chart" isUp={true} />
      <Card label="변동성 지수 (VIX)" value="14.21" subValue="-2.11%" icon="waves" isUp={false} />
    </div>
  );
};

export default MarketSummaryCards;
