
import React from 'react';
import { TradingNotification } from '../types';

const NotificationLog: React.FC<{ notifications: TradingNotification[] }> = ({ notifications }) => {
  return (
    <div className="bg-surface-dark rounded-xl border border-emerald-900/20 shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-emerald-900/10 flex justify-between items-center">
        <h3 className="text-sm font-black uppercase tracking-wider">알림 히스토리 로그</h3>
        <div className="flex gap-2">
          <button className="text-[10px] font-bold text-slate-500 border border-emerald-900/30 px-2 py-1 rounded hover:bg-emerald-900/10">내보내기 (CSV)</button>
          <button className="text-[10px] font-bold text-red-400 border border-red-900/30 px-2 py-1 rounded hover:bg-red-900/10">전체 삭제</button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="text-slate-500 uppercase font-bold bg-background-dark/30 border-b border-emerald-900/10">
            <tr>
              <th className="p-4">시간</th>
              <th className="p-4">유형</th>
              <th className="p-4">종목/메시지</th>
              <th className="p-4 text-right">발생 시 가격</th>
              <th className="p-4 text-right">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-900/5">
            {notifications.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-slate-600 font-bold italic">기록된 알림이 없습니다.</td>
              </tr>
            ) : (
              notifications.map((n) => (
                <tr key={n.id} className="hover:bg-background-dark/50 transition-colors">
                  <td className="p-4 text-slate-400 font-medium">{n.time}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${n.type === '돌파' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'}`}>
                      {n.type}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-200">{n.message}</td>
                  <td className="p-4 text-right font-black text-up">{n.price.toLocaleString()}원</td>
                  <td className="p-4 text-right">
                    <button className="text-primary hover:underline font-bold">차트</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationLog;
