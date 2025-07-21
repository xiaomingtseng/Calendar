import React from 'react';
import { format } from 'date-fns';
import { formatDate, isCurrentMonth, isToday } from '../utils/dateUtils';
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
  const dayEvents = events.filter(event => 
    formatDate(event.date, 'yyyy-MM-dd') === formatDate(date, 'yyyy-MM-dd')
  );

  return (
    <div
      className="min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] p-1 sm:p-2 lg:p-3 border-2 cursor-pointer transition-all duration-300 hover:shadow-lg relative overflow-hidden"
      style={{
        ...(isTodayDate ? {
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          borderColor: '#1e40af',
          color: 'white',
          colorScheme: 'light',
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
        } : {
          backgroundColor: !isCurrentMonthDay ? '#fafafa' : 'white',
          borderColor: !isCurrentMonthDay ? '#e5e7eb' : '#d1d5db',
          color: !isCurrentMonthDay ? '#9ca3af' : '#374151',
          borderRadius: '8px'
        }),
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        borderRadius: '8px',
        transform: 'scale(1)'
      }}
      onClick={() => onDateClick(date)}
      onMouseEnter={(e) => {
        if (isTodayDate) {
          e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)';
          e.currentTarget.style.transform = 'scale(1.02)';
        } else {
          e.currentTarget.style.backgroundColor = '#f8fafc';
          e.currentTarget.style.borderColor = '#94a3b8';
          e.currentTarget.style.transform = 'scale(1.01)';
        }
      }}
      onMouseLeave={(e) => {
        if (isTodayDate) {
          e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
          e.currentTarget.style.transform = 'scale(1)';
        } else {
          e.currentTarget.style.backgroundColor = !isCurrentMonthDay ? '#fafafa' : 'white';
          e.currentTarget.style.borderColor = !isCurrentMonthDay ? '#e5e7eb' : '#d1d5db';
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
    >
      {/* 今天日期的背景裝飾 */}
      {isTodayDate && (
        <div className="absolute top-0 right-0 w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 opacity-20">
          <div className="w-full h-full bg-white rounded-full transform translate-x-2 sm:translate-x-3 lg:translate-x-4 -translate-y-2 sm:-translate-y-3 lg:-translate-y-4"></div>
        </div>
      )}
      
      <div 
        className="text-sm sm:text-base lg:text-lg font-bold mb-1 sm:mb-2 relative z-10 flex items-center justify-between"
        style={{
          color: isTodayDate ? 'white' : (!isCurrentMonthDay ? '#9ca3af' : '#1f2937'),
        }}
      >
        <span>{format(date, 'd')}</span>
        {isTodayDate && <span className="text-[10px] sm:text-xs bg-white bg-opacity-30 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full hidden sm:block">今天</span>}
      </div>
      
      <div className="space-y-0.5 sm:space-y-1 lg:space-y-1.5 relative z-10">
        {dayEvents.slice(0, window.innerWidth < 640 ? 2 : 3).map((event) => (
          <div
            key={event.id}
            className="text-[10px] sm:text-xs p-1 sm:p-1.5 lg:p-2 rounded-md sm:rounded-lg truncate font-medium shadow-sm transition-all duration-200 hover:shadow-md"
            style={isTodayDate ? 
              { 
                backgroundColor: 'rgba(255,255,255,0.25)', 
                color: 'white', 
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)'
              } : 
              { 
                backgroundColor: event.color + '15', 
                color: event.color,
                border: `1px solid ${event.color}30`
              }
            }
          >
            <div className="flex items-center space-x-1">
              <div 
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0" 
                style={{ backgroundColor: isTodayDate ? 'white' : event.color }}
              ></div>
              <span className="truncate">{event.title}</span>
            </div>
          </div>
        ))}
        {dayEvents.length > (window.innerWidth < 640 ? 2 : 3) && (
          <div 
            className="text-[10px] sm:text-xs font-semibold"
            style={{ color: isTodayDate ? '#e0f2fe' : '#6b7280' }}
          >
            +{dayEvents.length - (window.innerWidth < 640 ? 2 : 3)} 更多
          </div>
        )}
      </div>
    </div>
  );
};
