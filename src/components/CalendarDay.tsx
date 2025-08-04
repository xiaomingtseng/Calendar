import React from 'react';
import { format } from 'date-fns';
import { formatDate, isCurrentMonth, isToday, isSaturday, isSunday } from '../utils/dateUtils';
import type { Event } from '../types/calendar';

interface CalendarDayProps {
  date: Date;
  currentMonth: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({ 
  date, 
  currentMonth, 
  events, 
  onDateClick 
}) => {
  const isCurrentMonthDay = isCurrentMonth(date, currentMonth);
  const isTodayDate = isToday(date);
  const isSaturdayDate = isSaturday(date);
  const isSundayDate = isSunday(date);
  const dayEvents = events.filter(event => 
    formatDate(event.date, 'yyyy-MM-dd') === formatDate(date, 'yyyy-MM-dd')
  );

  // 調試信息
  if (dayEvents.length > 0) {
    console.log(`${formatDate(date, 'yyyy-MM-dd')} 有 ${dayEvents.length} 個事件:`, dayEvents.map(e => e.title));
  }

  // 決定日期方塊的樣式
  const getDateCellClass = () => {
    let baseClass = `
      min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] 
      p-1 sm:p-2 lg:p-3 
      cursor-pointer 
      transition-all duration-200 
      hover:shadow-lg hover:bg-opacity-80
      relative overflow-hidden
      border-b border-gray-200
    `;

    if (isTodayDate) {
      baseClass += ' bg-gradient-to-br from-blue-500 to-blue-600 text-white';
    } else if (!isCurrentMonthDay) {
      baseClass += ' bg-gray-50 text-gray-400 hover:bg-gray-100';
    } else if (isSundayDate) {
      baseClass += ' bg-red-50 text-red-800 hover:bg-red-100';
    } else if (isSaturdayDate) {
      baseClass += ' bg-blue-50 text-blue-800 hover:bg-blue-100';
    } else {
      baseClass += ' bg-white text-gray-800 hover:bg-gray-50';
    }

    return baseClass;
  };

  return (
    <div
      className={getDateCellClass()}
      onClick={() => onDateClick(date)}
    >
      {/* 今天日期的背景裝飾 */}
      {isTodayDate && (
        <div className="absolute top-0 right-0 w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 opacity-20">
          <div className="w-full h-full bg-white rounded-full transform translate-x-2 sm:translate-x-3 lg:translate-x-4 -translate-y-2 sm:-translate-y-3 lg:-translate-y-4"></div>
        </div>
      )}
      
      <div className="text-sm sm:text-base lg:text-lg font-bold mb-1 sm:mb-2 relative z-10 flex items-center justify-between">
        <span>{format(date, 'd')}</span>
        {isTodayDate && (
          <span className="text-[10px] sm:text-xs bg-white/30 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full hidden sm:block backdrop-blur-sm">
            今天
          </span>
        )}
      </div>
      
      <div className="space-y-0.5 sm:space-y-1 lg:space-y-1.5 relative z-10">
        {dayEvents.slice(0, window.innerWidth < 640 ? 2 : 3).map((event) => (
          <div
            key={event.id}
            className={`
              text-[10px] sm:text-xs p-1 sm:p-1.5 lg:p-2 
              rounded-md sm:rounded-lg truncate font-medium 
              transition-all duration-200 hover:opacity-80
              ${isTodayDate 
                ? 'bg-white/90 text-blue-800 backdrop-blur-sm' 
                : 'bg-white text-gray-800 shadow-sm'
              }
            `}
          >
            <div className="flex items-center space-x-1">
              <div 
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0" 
                style={{ backgroundColor: event.color }}
              ></div>
              <span className="truncate">{event.title}</span>
            </div>
          </div>
        ))}
        {dayEvents.length > (window.innerWidth < 640 ? 2 : 3) && (
          <div className={`text-[10px] sm:text-xs font-semibold ${
            isTodayDate 
              ? 'text-blue-100' 
              : isSundayDate 
                ? 'text-red-600' 
                : isSaturdayDate 
                  ? 'text-blue-600' 
                  : 'text-gray-600'
          }`}>
            +{dayEvents.length - (window.innerWidth < 640 ? 2 : 3)} 更多
          </div>
        )}
      </div>
    </div>
  );
};
