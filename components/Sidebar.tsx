
import React from 'react';

const NavItem: React.FC<{ icon: string; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${active ? 'bg-primary/10 text-primary font-bold' : 'text-slate-500 hover:bg-emerald-900/10 hover:text-slate-300'}`}
  >
    <span className="material-symbols-outlined">{icon}</span>
    <span className="text-sm hidden lg:block">{label}</span>
  </button>
);

const Sidebar: React.FC<{ onTabChange: (tab: string) => void, currentTab: string }> = ({ onTabChange, currentTab }) => {
  return (
    <nav className="w-16 lg:w-60 flex flex-col bg-surface-dark border-r border-emerald-900/30 p-4 gap-2 transition-all">
      <div className="hidden lg:block mb-4">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3">메인 메뉴</p>
      </div>
      
      <NavItem 
        icon="dashboard" 
        label="마켓 터미널" 
        active={currentTab === 'terminal'} 
        onClick={() => onTabChange('terminal')} 
      />
      <NavItem 
        icon="monitoring" 
        label="수급 분석" 
        active={currentTab === 'trends'} 
        onClick={() => onTabChange('trends')} 
      />
      <NavItem 
        icon="notifications" 
        label="알림 기록" 
        active={currentTab === 'notifications'} 
        onClick={() => onTabChange('notifications')} 
      />
      
      <div className="mt-auto flex flex-col gap-2">
        <NavItem icon="settings" label="설정" />
        
        <div className="bg-background-dark/50 p-3 rounded-xl hidden lg:block border border-emerald-900/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase">실시간 연결</span>
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          </div>
          <p className="text-[11px] text-slate-400">OpenAPI: 활성</p>
          <p className="text-[11px] text-slate-400">지연시간: 12ms</p>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
