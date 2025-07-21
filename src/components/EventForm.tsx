import React, { useState } from 'react';
import { format } from 'date-fns';
import { generateId } from '../utils/dateUtils';
import type { Event } from '../types/calendar';
import { DEFAULT_CATEGORIES } from '../types/calendar';

interface EventFormProps {
  selectedDate?: Date;
  event?: Event;
  onSave: (event: Event) => void;
  onCancel: () => void;
  onDelete?: (eventId: string) => void;
}

export const EventForm: React.FC<EventFormProps> = ({
  selectedDate,
  event,
  onSave,
  onCancel,
  onDelete
}) => {
  console.log('EventForm 渲染中，selectedDate:', selectedDate, 'event:', event);
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event ? format(event.date, 'yyyy-MM-dd') : (selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')),
    startTime: event?.startTime || '',
    endTime: event?.endTime || '',
    categoryId: event?.category.id || DEFAULT_CATEGORIES[0].id
  });

  const selectedCategory = DEFAULT_CATEGORIES.find(cat => cat.id === formData.categoryId) || DEFAULT_CATEGORIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    const eventData: Event = {
      id: event?.id || generateId(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      date: new Date(formData.date),
      startTime: formData.startTime || undefined,
      endTime: formData.endTime || undefined,
      category: selectedCategory,
      color: selectedCategory.color
    };

    console.log('EventForm 提交事件:', eventData);
    console.log('事件日期:', eventData.date);
    onSave(eventData);
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
    }
  };

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
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        <h2 style={{ 
          marginBottom: '1.5rem', 
          color: 'black', 
          fontSize: '1.75rem', 
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          {event ? '✏️ 編輯事件' : '✨ 新增事件'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* 基本資料 - 總是顯示 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: 'black', 
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>
              📝 事件標題 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="輸入事件標題..."
              autoFocus
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: 'black', 
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>
              📅 日期 *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* 進階選項 - 條件顯示 */}
          {showAdvanced && (
            <>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'black', 
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  📝 描述
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  placeholder="輸入事件描述（選填）..."
                />
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: 'black', 
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    ⏰ 開始時間
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: 'black', 
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    ⏰ 結束時間
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'black', 
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  🏷️ 分類
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: 'white'
                  }}
                >
                  {DEFAULT_CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginTop: '0.5rem' 
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: selectedCategory.color,
                    marginRight: '0.5rem'
                  }}></div>
                  <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                    {selectedCategory.name}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* 展開/收合按鈕 */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: showAdvanced ? '1px solid #e5e7eb' : 'none'
          }}>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: '#3b82f6',
                border: '1px solid #3b82f6',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#3b82f6';
              }}
            >
              {showAdvanced ? '🔼 收合選項' : '🔽 更多選項'}
            </button>
          </div>

          {/* 按鈕區 */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {event && onDelete && showAdvanced && (
              <button
                type="button"
                onClick={handleDelete}
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}
              >
                🗑️ 刪除
              </button>
            )}
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              marginLeft: 'auto'
            }}>
              <button
                type="button"
                onClick={onCancel}
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
              >
                ❌ 取消
              </button>
              <button
                type="submit"
                disabled={!formData.title.trim()}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: formData.title.trim() ? '#3b82f6' : '#9ca3af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: formData.title.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                {event ? '✏️ 更新事件' : '✨ 建立事件'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
