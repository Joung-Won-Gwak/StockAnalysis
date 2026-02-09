
import React, { useState, useEffect, useRef } from 'react';
import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, Line, ReferenceLine } from 'recharts';
import { StockData } from '../types';

const StockChartPanel: React.FC<{ stock: StockData; data: any[] }> = ({ stock, data }) => {
  const [indicators, setIndicators] = useState({ ma5: true, ma20: true, volume: true });
  const [priceColor, setPriceColor] = useState('text-up');
  const prevPriceRef = useRef(stock.price);

  useEffect(() => {
    if (stock.price > prevPriceRef.current) setPriceColor('text-up scale-105');
    else if (stock.price < prevPriceRef.current) setPriceColor('text-down scale-105');
    prevPriceRef.current = stock.price;
    const timer = setTimeout(() => setPriceColor(stock.change >= 0 ? 'text-up' : 'text-down'), 500);
    return () => clearTimeout(timer);
  }, [stock.price]);

  return (
    <div className="bg-surface-dark rounded-xl border border-emerald-900/20 shadow-sm flex flex-col overflow-hidden">
      <div className="p-4 border-b border-emerald-900/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-lg font-black leading-none">{stock.name}</h3>
            <p className="text-xs text-slate-500 font-bold uppercase mt-1">{stock.market}: {stock.symbol}</p>
          </div>
          <div className="h-8 w-[1px] bg-emerald-900/20"></div>
          <div>
            <p className={`text-xl font-black transition-all duration-300 transform ${priceColor}`}>
              {stock.price.toLocaleString()} 
              <span className="text-xs ml-2 font-bold">
                {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toLocaleString()} ({stock.changePercent}%)
              </span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-background-dark p-1 rounded-lg">
            <button onClick={() => setIndicators(p => ({...p, ma5: !p.ma5}))} className={`px-2 py-1 text-[10px] font-bold rounded ${indicators.ma5 ? 'bg-amber-500/20 text-amber-500' : 'text-slate-600'}`}>MA5</button>
            <button onClick={() => setIndicators(p => ({...p, ma20: !p.ma20}))} className={`px-2 py-1 text-[10px] font-bold rounded ${indicators.ma20 ? 'bg-purple-500/20 text-purple-500' : 'text-slate-600'}`}>MA20</button>
          </div>
          <div className="h-4 w-[1px] bg-emerald-900/20"></div>
          <div className="flex bg-background-dark p-1 rounded-lg">
            {['1분', '5분', '일봉'].map((item, idx) => (
              <button key={item} className={`px-3 py-1 text-xs font-bold rounded ${idx === 2 ? 'bg-surface-dark text-primary' : 'text-slate-500'}`}>{item}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={stock.change >= 0 ? "#ff4d4d" : "#4d94ff"} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={stock.change >= 0 ? "#ff4d4d" : "#4d94ff"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#254632" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
            <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
            <YAxis yAxisId="volume" hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1c1f26', border: '1px solid #254632', borderRadius: '8px' }}
              labelStyle={{ fontSize: '10px', color: '#94a3b8' }}
            />
            <Area type="monotone" dataKey="price" stroke={stock.change >= 0 ? "#ff4d4d" : "#4d94ff"} fill="url(#colorPrice)" strokeWidth={2} />
            {indicators.ma5 && <Line type="monotone" dataKey="ma5" stroke="#f59e0b" dot={false} strokeWidth={1} />}
            {indicators.ma20 && <Line type="monotone" dataKey="ma20" stroke="#a855f7" dot={false} strokeWidth={1} />}
            {indicators.volume && <Bar yAxisId="volume" dataKey="volume" fill="#36e27b" opacity={0.15} barSize={20} />}
            <ReferenceLine y={77000} stroke="#64748b" strokeDasharray="3 3" label={{ position: 'right', value: '전일종가', fill: '#64748b', fontSize: 10 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="px-4 pb-4 flex gap-4 text-[10px] font-bold text-slate-500">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-up"></span> 현재가</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> MA5</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span> MA20</span>
      </div>
    </div>
  );
};

export default StockChartPanel;
