import { useState, useEffect } from 'react';
import { CalendarGrid } from './components/CalendarGrid';
import { EventForm } from './components/EventForm';
import { Sidebar } from './components/Sidebar';
import { WeekView } from './components/WeekView';
import { getWeekDays } from './utils/dateUtils';
import type { Event, CalendarView } from './types/calendar';
import './App.css';

const STORAGE_KEY = 'calendar-events';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [currentView, setCurrentView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showSidebar, setShowSidebar] = useState(false);

  // 從 localStorage 載入事件
  useEffect(() => {
    const storedEvents = localStorage.getItem(STORAGE_KEY);
    if (storedEvents) {
      try {
        const parsedEvents = JSON.parse(storedEvents).map((event: any) => ({
          ...event,
          date: new Date(event.date)
        }));
        setEvents(parsedEvents);
      } catch (error) {
        console.error('Failed to load events:', error);
      }
    }
  }, []);

  // 儲存事件到 localStorage
  const saveEvents = (newEvents: Event[]) => {
    setEvents(newEvents);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEvents));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  const handleNewEventClick = () => {
    setSelectedDate(new Date());
    setShowEventForm(true);
  };

  const handleEventEdit = (event: Event) => {
    setEditingEvent(event);
    setSelectedDate(event.date);
    setShowEventForm(true);
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const handleSaveEvent = (event: Event) => {
    if (editingEvent) {
      // 更新現有事件
      const updatedEvents = events.map(e => e.id === event.id ? event : e);
      saveEvents(updatedEvents);
    } else {
      // 新增事件
      saveEvents([...events, event]);
    }
    
    setShowEventForm(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    const updatedEvents = events.filter(e => e.id !== eventId);
    saveEvents(updatedEvents);
    setShowEventForm(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  const handleCancelEvent = () => {
    setShowEventForm(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen text-gray-900" 
         style={{
           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
           backgroundAttachment: 'fixed'
         }}>
      <div className="w-full">
        {/* 選單按鈕 */}
        <div className="px-2 py-1">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center space-x-2 p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-all duration-200 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="font-medium">選單</span>
          </button>
        </div>

        {/* 主要內容區域 */}
        <div className="relative">
          {/* 側邊欄 - 彈出式 */}
          {showSidebar && (
            <>
              {/* 背景遮罩 */}
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setShowSidebar(false)}
              ></div>
              
              {/* 側邊欄內容 */}
              <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-auto sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 w-auto sm:w-80 z-50">
                <div 
                  className="rounded-2xl shadow-2xl p-6 border border-gray-200"
                  style={{ 
                    backgroundColor: '#ffffff',
                    opacity: 1,
                    backdropFilter: 'none'
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800">選單</h2>
                    <button
                      onClick={() => setShowSidebar(false)}
                      className="p-2 rounded-lg transition-colors border-2 border-gray-400 hover:bg-gray-200"
                      style={{ 
                        backgroundColor: '#f9fafb',
                        color: '#374151',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        minWidth: '32px',
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <Sidebar
                    currentView={currentView}
                    onViewChange={(view) => {
                      setCurrentView(view);
                      setShowSidebar(false);
                    }}
                    onTodayClick={() => {
                      handleTodayClick();
                      setShowSidebar(false);
                    }}
                    onNewEventClick={() => {
                      handleNewEventClick();
                      setShowSidebar(false);
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* 行事曆內容 */}
          <div className="bg-white/95 backdrop-blur-xl shadow-2xl border border-white/30 w-full min-h-screen">
            <div className="p-2">
              {currentView === 'month' ? (
                <CalendarGrid
                  events={events}
                  onDateClick={handleDateClick}
                  onNewEventClick={handleNewEventClick}
                />
              ) : (
                <WeekView
                  currentDate={currentDate}
                  events={events}
                  onDateClick={handleDateClick}
                  onEventEdit={handleEventEdit}
                  weekDays={getWeekDays(currentDate)}
                />
              )}
            </div>
          </div>
        </div>

        {showEventForm && (
          <EventForm
            selectedDate={selectedDate || undefined}
            event={editingEvent || undefined}
            onSave={handleSaveEvent}
            onCancel={handleCancelEvent}
            onDelete={handleDeleteEvent}
          />
        )}
      </div>
    </div>
  );
}

export default App;
