import React from 'react';
import type { CalendarView } from '../types/calendar';

interface SidebarProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onVoiceEventClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  onVoiceEventClick
}) => {
  return (
    <div className="w-full">
      {/* 標題區域 */}
      <div className="mb-6">
        <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-2 px-1">📅 行事曆</h2>
      </div>

      {/* 視圖切換 */}
      <div className="mb-6">
        <div className="space-y-3">
          <button
            onClick={() => onViewChange('month')}
            className={`w-full flex items-center justify-center px-4 py-3 lg:px-5 lg:py-4 rounded-xl transition-all duration-200 ${
              currentView === 'month' 
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' 
                : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
            }`}
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            }}
          >
            <span className="text-sm lg:text-base font-medium tracking-wide">月檢視</span>
          </button>
          
          <button
            onClick={() => onViewChange('week')}
            className={`w-full flex items-center justify-center px-4 py-3 lg:px-5 lg:py-4 rounded-xl transition-all duration-200 ${
              currentView === 'week' 
                ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
            }`}
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            }}
          >
            <span className="text-sm lg:text-base font-medium tracking-wide">週檢視</span>
          </button>
        </div>
      </div>

      {/* 快捷動作 */}
      <div className="mb-6">
        <h3 className="text-xs lg:text-sm font-semibold text-gray-700 mb-3 px-1">快捷動作</h3>
        <div className="space-y-3">
          <button
            onClick={onVoiceEventClick}
            className="w-full flex items-center justify-center px-4 py-3 lg:px-5 lg:py-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-md"
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            }}
          >
            <span className="text-sm lg:text-base font-medium tracking-wide">🎤 語音建立事件</span>
          </button>
        </div>
      </div>

      {/* 統計資訊 */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 lg:p-5 border border-indigo-100">
        <h3 className="text-xs lg:text-sm font-semibold text-gray-700 mb-3 px-1">💡 使用提示</h3>
        <div className="space-y-2 text-xs text-gray-600 leading-relaxed px-1">
          <p>• 點擊年份數字可快速跳轉</p>
          <p>• 使用箭頭按鈕切換月份</p>
          <p>• 點擊日期查看該日行程</p>
          <p>• 右上角可快速回到今天</p>
        </div>
      </div>
    </div>
  );
};
