import React, { useState } from 'react';
import { getMonthDays } from '../utils/dateUtils';
import { CalendarHeader } from './CalendarHeader';
import { CalendarWeekHeader } from './CalendarWeekHeader';
import { CalendarDay } from './CalendarDay';
import type { Event } from '../types/calendar';

interface CalendarGridProps {
  events: Event[];
  onDateClick: (date: Date) => void;
  onNewEventClick: () => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  events, 
  onDateClick, 
  onNewEventClick 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthDays = getMonthDays(currentMonth);

  const handleTodayClick = () => {
    setCurrentMonth(new Date());
  };

  return (
    <div className="w-full">
      <CalendarHeader
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
        onTodayClick={handleTodayClick}
        onNewEventClick={onNewEventClick}
      />
      
      <CalendarWeekHeader />
      
      <div className="grid grid-cols-7 gap-0 border border-gray-200">
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
  );
};
