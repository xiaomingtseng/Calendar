import React from 'react';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { getNextMonth, getPreviousMonth, getNextYear, getPreviousYear } from '../utils/dateUtils';

interface CalendarHeaderProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  onTodayClick: () => void;
  onNewEventClick: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onMonthChange,
  onTodayClick,
  onNewEventClick
}) => {
  const handlePrevious = () => {
    onMonthChange(getPreviousMonth(currentMonth));
  };

  const handleNext = () => {
    onMonthChange(getNextMonth(currentMonth));
  };

  const handlePreviousYear = () => {
    onMonthChange(getPreviousYear(currentMonth));
  };

  const handleNextYear = () => {
    onMonthChange(getNextYear(currentMonth));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-8 p-4 sm:p-6 bg-white/90 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg space-y-4 sm:space-y-0">
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            {format(currentMonth, 'yyyy年 M月', { locale: zhTW })}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">管理你的行程安排</p>
        </div>
        <div className="flex items-center space-x-2">
          {/* 年份導航 */}
          <button
            onClick={handlePreviousYear}
            className="flex items-center space-x-1 p-2 sm:p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            style={{ 
              backgroundColor: 'white',
              border: '2px solid #fbbf24',
              color: '#d97706',
              colorScheme: 'light',
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fef3c7';
              e.currentTarget.style.borderColor = '#f59e0b';
              e.currentTarget.style.color = '#92400e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#fbbf24';
              e.currentTarget.style.color = '#d97706';
            }}
            aria-label="上一年"
          >
            <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            <span className="text-xs sm:text-sm font-bold">年</span>
          </button>

          {/* 月份導航 */}
          <button
            onClick={handlePrevious}
            className="flex items-center space-x-2 p-2 sm:p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            style={{ 
              backgroundColor: 'white',
              border: '2px solid #e0e7ff',
              color: '#4f46e5',
              colorScheme: 'light',
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f4ff';
              e.currentTarget.style.borderColor = '#a5b4fc';
              e.currentTarget.style.color = '#3730a3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#e0e7ff';
              e.currentTarget.style.color = '#4f46e5';
            }}
            aria-label="上個月"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs sm:text-sm font-semibold">上月</span>
          </button>
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 p-2 sm:p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            style={{ 
              backgroundColor: 'white',
              border: '2px solid #e0e7ff',
              color: '#4f46e5',
              colorScheme: 'light',
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f4ff';
              e.currentTarget.style.borderColor = '#a5b4fc';
              e.currentTarget.style.color = '#3730a3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#e0e7ff';
              e.currentTarget.style.color = '#4f46e5';
            }}
            aria-label="下個月"
          >
            <span className="text-xs sm:text-sm font-semibold">下月</span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={handleNextYear}
            className="flex items-center space-x-1 p-2 sm:p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            style={{ 
              backgroundColor: 'white',
              border: '2px solid #fbbf24',
              color: '#d97706',
              colorScheme: 'light',
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fef3c7';
              e.currentTarget.style.borderColor = '#f59e0b';
              e.currentTarget.style.color = '#92400e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#fbbf24';
              e.currentTarget.style.color = '#d97706';
            }}
            aria-label="下一年"
          >
            <span className="text-xs sm:text-sm font-bold">年</span>
            <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M6 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onTodayClick}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          style={{ 
            backgroundColor: 'white',
            border: '2px solid #10b981',
            color: '#047857',
            colorScheme: 'light',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none'
          } as React.CSSProperties}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0fdfa';
            e.currentTarget.style.borderColor = '#34d399';
            e.currentTarget.style.color = '#065f46';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.borderColor = '#10b981';
            e.currentTarget.style.color = '#047857';
          }}
        >
          📅 今天
        </button>
        <button
          onClick={onNewEventClick}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: '2px solid transparent',
            color: 'white',
            colorScheme: 'light',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none'
          } as React.CSSProperties}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)';
            e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ✨ 新增事件
        </button>
      </div>
    </div>
  );
};
