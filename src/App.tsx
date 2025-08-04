import { useState, useEffect } from 'react';
import { CalendarGrid } from './components/CalendarGrid';
import { EventForm } from './components/EventForm';
import { DayDetailView } from './components/DayDetailView';
import { VoiceEventCreator } from './components/VoiceEventCreator';
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
  const [showDayDetail, setShowDayDetail] = useState(false);
  const [showVoiceCreator, setShowVoiceCreator] = useState(false);
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
    console.log('點擊日期:', date);
    setSelectedDate(date);
    setShowDayDetail(true);
    console.log('設置 showDayDetail 為 true，顯示該日期的行程');
  };

  const handleNewEventClick = () => {
    console.log('點擊新增事件按鈕');
    setSelectedDate(new Date());
    setShowEventForm(true);
    console.log('設置 showEventForm 為 true');
  };

  const handleVoiceEventClick = () => {
    console.log('點擊語音建立事件按鈕');
    setShowVoiceCreator(true);
  };

  const handleEventEdit = (event: Event) => {
    setEditingEvent(event);
    setSelectedDate(event.date);
    setShowEventForm(true);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setCurrentDate(today);
  };

  const handleSaveEvent = (event: Event) => {
    console.log('正在保存事件:', event);
    console.log('目前事件數量:', events.length);
    
    if (editingEvent) {
      // 更新現有事件
      const updatedEvents = events.map(e => e.id === event.id ? event : e);
      console.log('更新事件後數量:', updatedEvents.length);
      saveEvents(updatedEvents);
    } else {
      // 新增事件
      const newEvents = [...events, event];
      console.log('新增事件後數量:', newEvents.length);
      saveEvents(newEvents);
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

  const handleCloseDayDetail = () => {
    setShowDayDetail(false);
    setSelectedDate(null);
  };

  const handleNewEventFromDayDetail = () => {
    setShowDayDetail(false);
    setShowEventForm(true);
    // selectedDate 保持不變，這樣新事件會預設在選定的日期
  };

  const handleEditEventFromDayDetail = (event: Event) => {
    setShowDayDetail(false);
    setEditingEvent(event);
    setSelectedDate(event.date);
    setShowEventForm(true);
  };

  const handleVoiceEventCreate = (event: Event) => {
    console.log('語音建立事件:', event);
    const newEvents = [...events, event];
    saveEvents(newEvents);
    setShowVoiceCreator(false);
  };

  const handleVoiceEventCancel = () => {
    setShowVoiceCreator(false);
  };

  return (
    <div className="min-h-screen text-gray-900 bg-white">
      <div className="w-full">
        {/* 頂部操作欄 */}
        <div className="flex items-center justify-between px-2 py-1">
          {/* 選單按鈕 */}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center justify-center p-3 bg-gray-900 backdrop-blur-md rounded-lg text-white hover:bg-gray-800 transition-all duration-200 shadow-lg border-2 border-gray-700"
            style={{ minWidth: '48px', minHeight: '48px' }}
          >
            <div style={{ 
              fontSize: '20px', 
              fontWeight: 'bold',
              lineHeight: '1',
              color: 'white',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
            }}>
              ☰
            </div>
          </button>

          {/* 今天按鈕 */}
          <button
            onClick={handleTodayClick}
            className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-lg text-emerald-700 hover:bg-emerald-50 border-2 border-emerald-300 hover:border-emerald-400 transition-all duration-200 shadow-lg transform hover:scale-105"
          >
            <span className="text-sm font-semibold">📅</span>
            <span className="text-sm font-semibold hidden sm:block">今天</span>
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
                  <div className="flex items-center justify-end mb-4">
                    <button
                      onClick={() => setShowSidebar(false)}
                      className="p-2 rounded-full transition-all duration-200 hover:bg-red-100 hover:border-red-300 border-2 border-gray-300 group"
                      style={{ 
                        backgroundColor: '#ffffff',
                        color: '#6b7280',
                        fontSize: '16px',
                        fontWeight: '600',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <span className="group-hover:text-red-500 transition-colors duration-200">✕</span>
                    </button>
                  </div>
                  
                  <Sidebar
                    currentView={currentView}
                    onViewChange={(view) => {
                      setCurrentView(view);
                      setShowSidebar(false);
                    }}
                    onVoiceEventClick={() => {
                      handleVoiceEventClick();
                      setShowSidebar(false);
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* 行事曆內容 */}
          <div className="bg-white w-full min-h-screen">
            <div className="p-2">
              {currentView === 'month' ? (
                <CalendarGrid
                  events={events}
                  onDateClick={handleDateClick}
                  onNewEventClick={handleNewEventClick}
                  currentDate={currentDate}
                  onDateChange={setCurrentDate}
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
          <>
            {console.log('正在渲染 EventForm，selectedDate:', selectedDate, 'editingEvent:', editingEvent)}
            <EventForm
              selectedDate={selectedDate || undefined}
              event={editingEvent || undefined}
              onSave={handleSaveEvent}
              onCancel={handleCancelEvent}
              onDelete={handleDeleteEvent}
            />
          </>
        )}

        {showDayDetail && selectedDate && (
          <DayDetailView
            selectedDate={selectedDate}
            events={events}
            onClose={handleCloseDayDetail}
            onEditEvent={handleEditEventFromDayDetail}
            onNewEvent={handleNewEventFromDayDetail}
          />
        )}

        {showVoiceCreator && (
          <VoiceEventCreator
            onEventCreate={handleVoiceEventCreate}
            onCancel={handleVoiceEventCancel}
          />
        )}
      </div>
    </div>
  );
}

export default App;
