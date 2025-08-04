import React, { useState } from 'react';

interface YearMonthPickerProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  onClose: () => void;
}

export const YearMonthPicker: React.FC<YearMonthPickerProps> = ({
  currentMonth,
  onMonthChange,
  onClose
}) => {
  const [selectedYear, setSelectedYear] = useState(currentMonth.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.getMonth());

  const months = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];

  const handleConfirm = () => {
    const newDate = new Date(selectedYear, selectedMonth, 1);
    onMonthChange(newDate);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  // 年份輸入處理
  const handleYearInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1900 && value <= 2100) {
      setSelectedYear(value);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-800 flex items-center justify-center z-50" 
      onClick={onClose}
      style={{ backgroundColor: '#1f2937' }}
    >
      <div 
        className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4 border-4 border-gray-900"
        onClick={e => e.stopPropagation()}
        style={{ backgroundColor: '#ffffff' }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">選擇年月</h3>
        
        <div className="space-y-6">
          {/* 年份選擇 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">年份</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1900"
                max="2100"
                value={selectedYear}
                onChange={handleYearInput}
                className="flex-1 p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none text-lg text-center"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#374151'
                }}
              />
              <span className="text-gray-700 font-medium">年</span>
            </div>
          </div>

          {/* 月份選擇 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">月份</label>
            <div className="grid grid-cols-3 gap-2">
              {months.map((month, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMonth(index)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 font-medium ${
                    selectedMonth === index
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                  style={{
                    backgroundColor: selectedMonth === index ? '#6366f1' : '#ffffff',
                    color: selectedMonth === index ? '#ffffff' : '#374151',
                    border: selectedMonth === index ? '2px solid #6366f1' : '2px solid #d1d5db'
                  }}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 按鈕區域 */}
        <div className="flex space-x-4 mt-8">
          <button
            onClick={handleCancel}
            className="year-month-picker-btn flex-1 py-3 px-4 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200"
            style={{
              border: '2px solid #d1d5db',
              backgroundColor: 'white',
              color: '#374151',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className="year-month-picker-btn flex-1 py-3 px-4 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-all duration-200"
            style={{
              border: 'none',
              backgroundColor: '#6366f1',
              color: 'white',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            確定
          </button>
        </div>
      </div>
    </div>
  );
};
