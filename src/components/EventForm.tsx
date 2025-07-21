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

    onSave(eventData);
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-lg mx-4 border border-white/20 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
            {event ? '✏️ 編輯事件' : '✨ 新增事件'}
          </h2>
          <p className="text-purple-100 mt-1 text-sm sm:text-base">
            {event ? '修改您的行程安排' : '新增一個重要事件'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <span className="text-lg mr-2">📝</span>
              事件標題 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
              placeholder="輸入事件標題..."
              autoFocus
              style={{
                fontSize: '16px',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <span className="text-lg mr-2">📝</span>
              描述
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 resize-none"
              rows={3}
              placeholder="輸入事件描述（選填）..."
              style={{
                fontSize: '16px',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <span className="text-lg mr-2">📅</span>
              日期 *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
              style={{
                fontSize: '16px',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <span className="text-lg mr-2">⏰</span>
                開始時間
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                style={{
                  fontSize: '16px',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none'
                }}
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <span className="text-lg mr-2">⏱️</span>
                結束時間
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                style={{
                  fontSize: '16px',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <span className="text-lg mr-2">🏷️</span>
              分類
            </label>
            <div className="relative">
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 appearance-none cursor-pointer"
                style={{
                  fontSize: '16px',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none'
                }}
              >
                {DEFAULT_CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: selectedCategory.color }}
              ></div>
              <span className="text-sm text-gray-600">{selectedCategory.name}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between pt-4 sm:pt-6 border-t border-gray-100 mt-4 sm:mt-6 space-y-3 sm:space-y-0">
            <div className="order-2 sm:order-1">
              {event && onDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 text-sm font-semibold text-red-600 bg-red-50 border-2 border-red-200 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all duration-300 transform hover:scale-105"
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                  }}
                >
                  🗑️ 刪除事件
                </button>
              )}
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 order-1 sm:order-2">
              <button
                type="button"
                onClick={onCancel}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 text-sm font-semibold text-gray-600 bg-gray-100 border-2 border-gray-200 rounded-xl hover:bg-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105"
                style={{
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none'
                }}
              >
                ❌ 取消
              </button>
              <button
                type="submit"
                disabled={!formData.title.trim()}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 text-sm font-bold text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{
                  background: !formData.title.trim() ? '#9ca3af' : 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none'
                }}
                onMouseEnter={(e) => {
                  if (formData.title.trim()) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (formData.title.trim()) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)';
                  }
                }}
              >
                {event ? '✅ 更新事件' : '✨ 新增事件'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
