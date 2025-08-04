import React, { useState } from 'react';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { getNextMonth, getPreviousMonth } from '../utils/dateUtils';
import { YearMonthPicker } from './YearMonthPicker';

interface CalendarHeaderProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  onYearClick?: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onMonthChange,
  onYearClick
}) => {
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);

  const handlePrevious = () => {
    onMonthChange(getPreviousMonth(currentMonth));
  };

  const handleNext = () => {
    onMonthChange(getNextMonth(currentMonth));
  };

  const handleYearClick = () => {
    if (onYearClick) {
      onYearClick();
    } else {
      // 顯示年月選擇器
      setShowYearMonthPicker(true);
    }
  };

  const handleYearMonthChange = (date: Date) => {
    onMonthChange(date);
    setShowYearMonthPicker(false);
  };

  const handleCloseYearMonthPicker = () => {
    setShowYearMonthPicker(false);
  };

  return (
    <>
      <div 
        className="flex items-center justify-between mb-4 sm:mb-6 p-4 sm:p-6 bg-white rounded-2xl border border-gray-300 shadow-lg"
        style={{ position: 'relative', zIndex: 10 }}
      >
        {/* 左側：上個月按鈕 */}
        <button
          onClick={handlePrevious}
          className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg text-xl font-bold"
          style={{ 
            border: 'none',
            cursor: 'pointer',
            outline: 'none'
          }}
          aria-label="上個月"
        >
          ◀
        </button>

        {/* 中間：年月標題 */}
        <div className="flex flex-col items-center space-y-1">
          <button
            onClick={handleYearClick}
            className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-blue-50"
            style={{ 
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              padding: '0.25rem 0.5rem'
            }}
          >
            {format(currentMonth, 'yyyy年', { locale: zhTW })}
          </button>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            {format(currentMonth, 'M月', { locale: zhTW })}
          </h2>
        </div>

        {/* 右側：下個月按鈕 */}
        <button
          onClick={handleNext}
          className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg text-xl font-bold"
          style={{ 
            border: 'none',
            cursor: 'pointer',
            outline: 'none'
          }}
          aria-label="下個月"
        >
          ▶
        </button>
      </div>

      {/* 年月選擇器 */}
      {showYearMonthPicker && (
        <YearMonthPicker
          currentMonth={currentMonth}
          onMonthChange={handleYearMonthChange}
          onClose={handleCloseYearMonthPicker}
        />
      )}
    </>
  );
};
