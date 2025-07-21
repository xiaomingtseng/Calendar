import React from 'react';

const WEEK_DAYS = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
const WEEK_DAYS_SHORT = ['一', '二', '三', '四', '五', '六', '日'];

export const CalendarWeekHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-7 mb-2 sm:mb-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg overflow-hidden shadow-sm">
      {WEEK_DAYS.map((day, index) => (
        <div
          key={day}
          className="p-2 sm:p-4 text-xs sm:text-sm font-bold text-center relative"
          style={{
            background: index >= 5 ? 
              'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' : 
              'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            color: index >= 5 ? '#dc2626' : '#0369a1',
            borderRight: index < 6 ? '1px solid rgba(0,0,0,0.08)' : 'none'
          }}
        >
          <span className="relative z-10 block sm:hidden">{WEEK_DAYS_SHORT[index]}</span>
          <span className="relative z-10 hidden sm:block">{day}</span>
          {index >= 5 && (
            <div className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full opacity-60"></div>
          )}
        </div>
      ))}
    </div>
  );
};
