
import React from 'react';

const NewsItem: React.FC<{ type: string; title: string; source: string; time: string; color: string }> = ({ type, title, source, time, color }) => (
  <div className="p-4 hover:bg-background-dark/50 transition-colors cursor-pointer group">
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${color}`}>
      {type}
    </span>
    <h4 className="text-sm font-bold mt-2 group-hover:text-primary transition-colors leading-snug">{title}</h4>
    <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tight">{time} • {source}</p>
  </div>
);

const NewsFeed: React.FC = () => {
  return (
    <div className="bg-surface-dark rounded-xl border border-emerald-900/20 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-emerald-900/10 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">rss_feed</span>
        <h3 className="text-sm font-black uppercase tracking-wider">최신 시장 심리 및 뉴스</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-emerald-900/10">
        <NewsItem 
          type="긍정적" 
          title="AI 수요 급증에 따라 삼성전자 HBM 생산 능력 확대 추진" 
          source="블룸버그" 
          time="2분 전" 
          color="bg-emerald-900/40 text-primary"
        />
        <NewsItem 
          type="중립" 
          title="한국은행, 예상대로 기준금리 동결... 인플레이션 전망 주시" 
          source="로이터" 
          time="15분 전" 
          color="bg-slate-800 text-slate-400"
        />
        <NewsItem 
          type="부정적" 
          title="미국채 금리 3개월래 최고치... 기술주 섹터 압박 가중" 
          source="CNBC" 
          time="42분 전" 
          color="bg-red-900/40 text-up"
        />
      </div>
    </div>
  );
};

export default NewsFeed;
