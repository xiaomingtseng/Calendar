import React from 'react';

const WEEK_DAYS = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
const WEEK_DAYS_SHORT = ['一', '二', '三', '四', '五', '六', '日'];

export const CalendarWeekHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4 p-2 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
      {WEEK_DAYS.map((day, index) => (
        <div
          key={day}
          className={`
            p-2 sm:p-3 text-xs sm:text-sm font-semibold text-center rounded-lg
            transition-all duration-200
            ${index === 6 
              ? 'bg-red-50 text-red-600 border border-red-200' 
              : index === 5
                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                : 'bg-gray-50 text-gray-600 border border-gray-200'
            }
          `}
        >
          <span className="block sm:hidden">{WEEK_DAYS_SHORT[index]}</span>
          <span className="hidden sm:block">{day}</span>
          {index >= 5 && (
            <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mx-auto mt-1 opacity-70 ${
              index === 6 ? 'bg-red-400' : 'bg-blue-400'
            }`}></div>
          )}
        </div>
      ))}
    </div>
  );
};
