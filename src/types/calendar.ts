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
  { id: 'work', name: '工作', color: '#3b82f6' },
  { id: 'personal', name: '個人', color: '#10b981' },
  { id: 'health', name: '健康', color: '#f59e0b' },
  { id: 'social', name: '社交', color: '#ef4444' },
];
