
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MarketSummaryCards from './components/MarketSummaryCards';
import StockChartPanel from './components/StockChartPanel';
import LiveRankings from './components/LiveRankings';
import NewsFeed from './components/NewsFeed';
import TradingPanel from './components/TradingPanel';
import InvestorTrends from './components/InvestorTrends';
import NotificationLog from './components/NotificationLog';
import { StockData, TradingNotification } from './types';

const App: React.FC = () => {
  const PREVIOUS_CLOSE = 77000;
  const [activeTab, setActiveTab] = useState<'terminal' | 'trends' | 'notifications'>('terminal');
  const [notifications, setNotifications] = useState<TradingNotification[]>([]);
  const [showToast, setShowToast] = useState<TradingNotification | null>(null);

  const [selectedStock, setSelectedStock] = useState<StockData>({
    symbol: '005930',
    name: '삼성전자',
    price: 78200,
    change: 1200,
    changePercent: 1.56,
    market: 'KOSPI'
  });

  const [chartData, setChartData] = useState([
    { time: '09:00', price: 77000, ma5: 76800, ma20: 76500, volume: 1200000 },
    { time: '10:00', price: 77500, ma5: 77200, ma20: 76800, volume: 1500000 },
    { time: '11:00', price: 78200, ma5: 77800, ma20: 77100, volume: 2100000 },
    { time: '12:00', price: 77800, ma5: 77900, ma20: 77300, volume: 1100000 },
    { time: '13:00', price: 78000, ma5: 78000, ma20: 77500, volume: 900000 },
    { time: '14:00', price: 78500, ma5: 78200, ma20: 77800, volume: 2800000 },
    { time: '15:00', price: 78200, ma5: 78200, ma20: 78000, volume: 1900000 },
  ]);

  // Simulated real-time price and notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedStock(prev => {
        const volatility = 0.0015;
        const randomChange = (Math.random() - 0.5) * 2 * volatility;
        const newPrice = Math.round(prev.price * (1 + randomChange));
        const change = newPrice - PREVIOUS_CLOSE;
        const changePercent = parseFloat(((change / PREVIOUS_CLOSE) * 100).toFixed(2));
        
        // Random notification trigger
        if (Math.random() > 0.95) {
          const newAlert: TradingNotification = {
            id: Date.now().toString(),
            time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            type: Math.random() > 0.5 ? '돌파' : '거래폭발',
            message: `${prev.name} ${newPrice.toLocaleString()}원 가격 돌파 알림`,
            price: newPrice,
            symbol: prev.symbol
          };
          setNotifications(prevLog => [newAlert, ...prevLog].slice(0, 50));
          setShowToast(newAlert);
          setTimeout(() => setShowToast(null), 5000);
        }

        return { ...prev, price: newPrice, change, changePercent };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background-dark text-slate-100 font-sans">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onTabChange={(tab: any) => setActiveTab(tab)} currentTab={activeTab} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide space-y-6">
          <div className="max-w-[1600px] mx-auto space-y-6">
            <MarketSummaryCards />

            {/* Sub-navigation Tabs */}
            <div className="flex border-b border-emerald-900/20 gap-8">
              <button 
                onClick={() => setActiveTab('terminal')}
                className={`pb-3 text-sm font-bold transition-colors relative ${activeTab === 'terminal' ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
              >
                마켓 터미널
                {activeTab === 'terminal' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('trends')}
                className={`pb-3 text-sm font-bold transition-colors relative ${activeTab === 'trends' ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
              >
                투자자 수급 분석
                {activeTab === 'trends' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`pb-3 text-sm font-bold transition-colors relative ${activeTab === 'notifications' ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
              >
                알림 히스토리
                {activeTab === 'notifications' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
              </button>
            </div>
            
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8 space-y-6">
                {activeTab === 'terminal' && (
                  <>
                    <StockChartPanel stock={selectedStock} data={chartData} />
                    <NewsFeed />
                  </>
                )}
                {activeTab === 'trends' && <InvestorTrends />}
                {activeTab === 'notifications' && <NotificationLog notifications={notifications} />}
              </div>
              
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                <LiveRankings />
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <TradingPanel selectedStock={selectedStock} />

      {/* Real-time Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 animate-bounce bg-surface-dark border border-primary/50 p-4 rounded-xl shadow-2xl flex items-start gap-4 min-w-[300px]">
          <div className="bg-primary/20 p-2 rounded-lg">
            <span className="material-symbols-outlined text-primary">warning</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-primary uppercase">실시간 알림 - {showToast.type}</span>
              <span className="text-[10px] text-slate-500">{showToast.time}</span>
            </div>
            <p className="text-xs font-bold">{showToast.message}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setActiveTab('terminal')} className="text-[10px] font-black bg-primary text-background-dark px-3 py-1 rounded">차트로 이동</button>
              <button onClick={() => setShowToast(null)} className="text-[10px] font-bold border border-emerald-900/30 px-3 py-1 rounded hover:bg-emerald-900/20">닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
