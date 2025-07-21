import React from 'react';
import type { CalendarView } from '../types/calendar';

interface SidebarProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onTodayClick: () => void;
  onNewEventClick: () => void;
  onVoiceEventClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  onTodayClick,
  onNewEventClick,
  onVoiceEventClick
}) => {
  return (
    <div className="w-full">
      {/* 標題區域 */}
      <div className="mb-5">
        <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-1">📅 行事曆</h2>
        <p className="text-xs lg:text-sm text-gray-600">選擇檢視模式</p>
      </div>

      {/* 視圖切換 */}
      <div className="mb-5">
        <h3 className="text-xs lg:text-sm font-semibold text-gray-700 mb-2">檢視模式</h3>
        <div className="space-y-2">
          <button
            onClick={() => onViewChange('month')}
            className={`w-full flex items-center justify-center p-2 lg:p-3 rounded-xl transition-all duration-200 ${
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
            <span className="text-sm lg:text-base font-medium">月檢視</span>
          </button>
          
          <button
            onClick={() => onViewChange('week')}
            className={`w-full flex items-center justify-center p-2 lg:p-3 rounded-xl transition-all duration-200 ${
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
            <span className="text-sm lg:text-base font-medium">週檢視</span>
          </button>
        </div>
      </div>

      {/* 快捷動作 */}
      <div className="mb-5">
        <h3 className="text-xs lg:text-sm font-semibold text-gray-700 mb-2">快捷動作</h3>
        <div className="space-y-2">
          <button
            onClick={onTodayClick}
            className="w-full flex items-center justify-center p-2 lg:p-3 rounded-xl bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200"
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            }}
          >
            <span className="text-sm lg:text-base font-medium">回到今天</span>
          </button>
          
          <button
            onClick={onNewEventClick}
            className="w-full flex items-center justify-center p-2 lg:p-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-md"
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            }}
          >
            <span className="text-sm lg:text-base font-medium">✍️ 新增事件</span>
          </button>
          
          <button
            onClick={onVoiceEventClick}
            className="w-full flex items-center justify-center p-2 lg:p-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-md"
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            }}
          >
            <span className="text-sm lg:text-base font-medium">🎤 語音建立</span>
          </button>
        </div>
      </div>

      {/* 統計資訊 */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-3 lg:p-4 border border-indigo-100">
        <h3 className="text-xs lg:text-sm font-semibold text-gray-700 mb-2">💡 小提示</h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          {currentView === 'month' ? 
            '月檢視：查看整個月的行程安排，點擊日期新增事件' : 
            '週檢視：專注於本週行程，以列表形式顯示詳細資訊'
          }
        </p>
      </div>
    </div>
  );
};
