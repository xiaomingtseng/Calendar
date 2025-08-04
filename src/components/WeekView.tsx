import React from 'react';
import { format, isSameDay } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { formatDate } from '../utils/dateUtils';
import type { Event } from '../types/calendar';

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventEdit: (event: Event) => void;
  weekDays: Date[];
}

export const WeekView: React.FC<WeekViewProps> = ({ 
  currentDate, 
  events, 
  onDateClick, 
  onEventEdit,
  weekDays 
}) => {
  const today = new Date();

  const getEventsForDay = (date: Date) => {
    return events.filter(event => 
      formatDate(event.date, 'yyyy-MM-dd') === formatDate(date, 'yyyy-MM-dd')
    ).sort((a, b) => {
      if (a.startTime && b.startTime) {
        return a.startTime.localeCompare(b.startTime);
      }
      return a.title.localeCompare(b.title);
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          📋 週檢視
        </h2>
        <p className="text-green-100 mt-1">
          {format(weekDays[0], 'M月d日', { locale: zhTW })} - {format(weekDays[6], 'M月d日', { locale: zhTW })}
        </p>
      </div>

      <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
        {weekDays.map((date) => {
          const dayEvents = getEventsForDay(date);
          const isToday = isSameDay(date, today);
          const dayName = format(date, 'EEEE', { locale: zhTW });

          return (
            <div 
              key={date.toISOString()}
              className={`border-2 rounded-xl p-4 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                isToday 
                  ? 'bg-blue-50 border-blue-300 shadow-md' 
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onDateClick(date)}
            >
              {/* 日期標題 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    isToday ? 'bg-blue-500' : 'bg-gray-400'
                  }`}></div>
                  <h3 className={`text-lg font-bold ${
                    isToday ? 'text-blue-700' : 'text-gray-800'
                  }`}>
                    {dayName} {format(date, 'd日', { locale: zhTW })}
                  </h3>
                  {isToday && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-medium">
                      今天
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {dayEvents.length} 個事件
                </div>
              </div>

              {/* 事件列表 */}
              {dayEvents.length > 0 ? (
                <div className="space-y-2">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:shadow-md transition-all duration-200"
                      style={{ 
                        backgroundColor: event.color + '15',
                        border: `1px solid ${event.color}30`
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventEdit(event);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: event.color }}
                        ></div>
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">
                            {event.title}
                          </div>
                          {event.description && (
                            <div className="text-xs text-gray-600 mt-1">
                              {event.description}
                            </div>
                          )}
                          {(event.startTime || event.endTime) && (
                            <div className="text-xs text-gray-500 mt-1 flex items-center space-x-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>
                                {event.startTime || '無開始時間'} 
                                {event.endTime && ` - ${event.endTime}`}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">
                        {event.category.name}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="text-gray-600 mb-2">
                    <svg 
                      className="mx-auto" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ width: '24px', height: '24px' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-600">尚無事件安排</div>
                  <div className="text-xs text-gray-500 mt-1">點擊新增事件</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
