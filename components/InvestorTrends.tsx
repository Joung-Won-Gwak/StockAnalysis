
import React, { useState } from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const dummyTrends = [
  { time: '09:00', index: 2500, individual: -50, foreign: 20, institution: 30, pension: 10 },
  { time: '10:00', index: 2510, individual: -80, foreign: 45, institution: 35, pension: 15 },
  { time: '11:00', index: 2530, individual: -150, foreign: 100, institution: 50, pension: 20 },
  { time: '12:00', index: 2525, individual: -120, foreign: 80, institution: 40, pension: 18 },
  { time: '13:00', index: 2535, individual: -180, foreign: 140, institution: 40, pension: 25 },
  { time: '14:00', index: 2550, individual: -250, foreign: 190, institution: 60, pension: 30 },
  { time: '15:00', index: 2542, individual: -220, foreign: 160, institution: 60, pension: 28 },
];

const InvestorTrends: React.FC = () => {
  const [view, setView] = useState<'market' | 'stock'>('market');

  return (
    <div className="bg-surface-dark rounded-xl border border-emerald-900/20 shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-emerald-900/10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-black uppercase tracking-wider">투자자별 매매동향</h3>
          <div className="flex bg-background-dark p-1 rounded-lg">
            <button onClick={() => setView('market')} className={`px-3 py-1 text-xs font-bold rounded ${view === 'market' ? 'bg-surface-dark text-primary' : 'text-slate-500'}`}>시장전체</button>
            <button onClick={() => setView('stock')} className={`px-3 py-1 text-xs font-bold rounded ${view === 'stock' ? 'bg-surface-dark text-primary' : 'text-slate-500'}`}>개별종목</button>
          </div>
        </div>
        <span className="text-[10px] font-bold text-slate-500">단위: 억원</span>
      </div>

      <div className="p-4 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={dummyTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#254632" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#1c1f26', border: '1px solid #254632', borderRadius: '8px' }} />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Line name="코스피지수" type="monotone" dataKey="index" stroke="#94a3b8" strokeWidth={2} dot={false} />
            <Line name="개인" type="monotone" dataKey="individual" stroke="#4d94ff" strokeWidth={2} dot={false} />
            <Line name="외국인" type="monotone" dataKey="foreign" stroke="#ff4d4d" strokeWidth={2} dot={false} />
            <Line name="기관" type="monotone" dataKey="institution" stroke="#36e27b" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 border-t border-emerald-900/10 overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="text-slate-500 uppercase font-bold border-b border-emerald-900/10">
            <tr>
              <th className="pb-2">투자주체</th>
              <th className="pb-2 text-right">순매수(억)</th>
              <th className="pb-2 text-right">매수비중</th>
              <th className="pb-2 text-right">전일대비</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-900/5">
            <tr className="hover:bg-background-dark/30 transition-colors">
              <td className="py-2 font-bold text-slate-300">외국인</td>
              <td className="py-2 text-right text-up">+1,620</td>
              <td className="py-2 text-right">34.2%</td>
              <td className="py-2 text-right text-up">▲ 240</td>
            </tr>
            <tr className="hover:bg-background-dark/30 transition-colors">
              <td className="py-2 font-bold text-slate-300">기관합계</td>
              <td className="py-2 text-right text-up">+600</td>
              <td className="py-2 text-right">18.5%</td>
              <td className="py-2 text-right text-down">▼ 120</td>
            </tr>
            <tr className="hover:bg-background-dark/30 transition-colors">
              <td className="py-2 pl-4 text-slate-500">ㄴ 금융투자</td>
              <td className="py-2 text-right text-up">+420</td>
              <td className="py-2 text-right">8.2%</td>
              <td className="py-2 text-right text-up">▲ 15</td>
            </tr>
            <tr className="hover:bg-background-dark/30 transition-colors">
              <td className="py-2 pl-4 text-slate-500">ㄴ 연기금등</td>
              <td className="py-2 text-right text-up">+280</td>
              <td className="py-2 text-right">5.1%</td>
              <td className="py-2 text-right text-up">▲ 42</td>
            </tr>
            <tr className="hover:bg-background-dark/30 transition-colors">
              <td className="py-2 font-bold text-slate-300">개인</td>
              <td className="py-2 text-right text-down">-2,220</td>
              <td className="py-2 text-right">47.3%</td>
              <td className="py-2 text-right text-down">▼ 120</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestorTrends;
