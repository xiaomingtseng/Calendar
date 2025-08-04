import React, { useState, useEffect } from 'react';
import { getMonthDays } from '../utils/dateUtils';
import { CalendarHeader } from './CalendarHeader';
import { CalendarWeekHeader } from './CalendarWeekHeader';
import { CalendarDay } from './CalendarDay';
import type { Event } from '../types/calendar';

interface CalendarGridProps {
  events: Event[];
  onDateClick: (date: Date) => void;
  onNewEventClick: () => void;
  currentDate?: Date;
  onDateChange?: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  events, 
  onDateClick, 
  onNewEventClick,
  currentDate,
  onDateChange
}) => {
  const [currentMonth, setCurrentMonth] = useState(currentDate || new Date());
  
  const monthDays = getMonthDays(currentMonth);

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  // 當外部 currentDate 改變時，更新內部狀態
  useEffect(() => {
    if (currentDate) {
      setCurrentMonth(currentDate);
    }
  }, [currentDate]);

  return (
    <div className="w-full">
      <CalendarHeader
        currentMonth={currentMonth}
        onMonthChange={handleMonthChange}
      />
      
      <CalendarWeekHeader />
      
      <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden">
        <div className="grid grid-cols-7">
          {monthDays.map((day) => (
            <CalendarDay
              key={day.toISOString()}
              date={day}
              currentMonth={currentMonth}
              events={events}
              onDateClick={onDateClick}
            />
          ))}
        </div>
      </div>

      {/* 底部操作區域 */}
      <div className="mt-4 sm:mt-6 flex justify-center">
        <button
          onClick={onNewEventClick}
          className="px-8 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          ✨ 新增事件
        </button>
      </div>
    </div>
  );
};
