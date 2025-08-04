export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  category: EventCategory;
  color: string;
}

export type CalendarView = 'month' | 'week';

export interface EventCategory {
  id: string;
  name: string;
  color: string;
}

export const DEFAULT_CATEGORIES: EventCategory[] = [
  { id: 'work', name: '工作', color: '#1e40af' },      // 深藍色 - 更好的對比度
  { id: 'personal', name: '個人', color: '#059669' },   // 深綠色 - 更好的對比度  
  { id: 'health', name: '健康', color: '#d97706' },     // 深橙色 - 更好的對比度
  { id: 'social', name: '社交', color: '#dc2626' },     // 深紅色 - 更好的對比度
];
