import React from 'react';
import { format } from 'date-fns';
import { formatDate } from '../utils/dateUtils';
import type { Event } from '../types/calendar';

interface DayDetailViewProps {
  selectedDate: Date;
  events: Event[];
  onClose: () => void;
  onEditEvent: (event: Event) => void;
  onNewEvent: () => void;
}

export const DayDetailView: React.FC<DayDetailViewProps> = ({
  selectedDate,
  events,
  onClose,
  onEditEvent,
  onNewEvent
}) => {
  // 過濾出選定日期的事件
  const dayEvents = events.filter(event => 
    formatDate(event.date, 'yyyy-MM-dd') === formatDate(selectedDate, 'yyyy-MM-dd')
  );

  // 按時間排序事件
  const sortedEvents = dayEvents.sort((a, b) => {
    if (!a.startTime && !b.startTime) return 0;
    if (!a.startTime) return 1;
    if (!b.startTime) return -1;
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* 標題區域 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #f3f4f6'
        }}>
          <div>
            <h2 style={{ 
              color: 'black', 
              fontSize: '1.75rem', 
              fontWeight: 'bold',
              margin: 0
            }}>
              📅 {format(selectedDate, 'MM月dd日')}
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1rem',
              margin: '0.25rem 0 0 0'
            }}>
              {format(selectedDate, 'yyyy年 EEEE', { locale: undefined })}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: '#374151',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb';
              e.currentTarget.style.color = '#1f2937';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#374151';
            }}
          >
            ✕
          </button>
        </div>

        {/* 行程統計 */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <span style={{
            fontSize: '1.1rem',
            color: '#374151',
            fontWeight: 'bold'
          }}>
            📊 共有 {dayEvents.length} 個行程
          </span>
        </div>

        {/* 事件列表 */}
        <div style={{ marginBottom: '1.5rem' }}>
          {sortedEvents.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#9ca3af',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem',
              border: '2px dashed #d1d5db'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
              <p style={{ fontSize: '1.1rem', margin: 0 }}>這天還沒有安排任何行程</p>
              <p style={{ fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>點擊下方按鈕新增第一個事件吧！</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {sortedEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEditEvent(event)}
                  style={{
                    padding: '1rem',
                    backgroundColor: 'white',
                    border: `2px solid ${event.color}`,
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: event.color,
                          marginRight: '0.5rem'
                        }}></div>
                        <h3 style={{
                          margin: 0,
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          color: '#1f2937'
                        }}>
                          {event.title}
                        </h3>
                      </div>
                      
                      {(event.startTime || event.endTime) && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '0.5rem',
                          color: '#6b7280',
                          fontSize: '0.9rem'
                        }}>
                          <span>⏰ </span>
                          {event.startTime && <span>{event.startTime}</span>}
                          {event.startTime && event.endTime && <span> - </span>}
                          {event.endTime && <span>{event.endTime}</span>}
                        </div>
                      )}
                      
                      {event.description && (
                        <p style={{
                          margin: '0.5rem 0 0 0',
                          color: '#6b7280',
                          fontSize: '0.9rem',
                          lineHeight: '1.4'
                        }}>
                          {event.description}
                        </p>
                      )}
                      
                      <div style={{
                        marginTop: '0.5rem',
                        fontSize: '0.8rem',
                        color: '#9ca3af',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <span>🏷️ {event.category.name}</span>
                      </div>
                    </div>
                    
                    <div style={{
                      marginLeft: '1rem',
                      fontSize: '0.8rem',
                      color: '#9ca3af'
                    }}>
                      點擊編輯
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 底部按鈕 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button
            onClick={onNewEvent}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6';
            }}
          >
            ✨ 新增事件
          </button>
          
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4b5563';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#6b7280';
            }}
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
