import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import { zhTW } from 'date-fns/locale';

export const formatDate = (date: Date, formatStr: string = 'yyyy-MM-dd') => {
  return format(date, formatStr, { locale: zhTW });
};

export const getMonthDays = (date: Date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // 週一開始
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
};

export const isCurrentMonth = (date: Date, currentMonth: Date) => {
  return isSameMonth(date, currentMonth);
};

export const isToday = (date: Date) => {
  return isSameDay(date, new Date());
};

export const getDayOfWeek = (date: Date) => {
  // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  return date.getDay();
};

export const isSaturday = (date: Date) => {
  return getDayOfWeek(date) === 6;
};

export const isSunday = (date: Date) => {
  return getDayOfWeek(date) === 0;
};

export const getNextMonth = (date: Date) => {
  return addMonths(date, 1);
};

export const getPreviousMonth = (date: Date) => {
  return subMonths(date, 1);
};

export const getNextYear = (date: Date) => {
  return addMonths(date, 12);
};

export const getPreviousYear = (date: Date) => {
  return subMonths(date, 12);
};

export const getWeekDays = (date: Date) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  return eachDayOfInterval({ start: weekStart, end: weekEnd });
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
