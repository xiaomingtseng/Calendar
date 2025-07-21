import React, { useState } from 'react';
import { VoiceInput } from './VoiceInput';
import { VoiceEventParser } from '../utils/voiceEventParser';
import type { Event } from '../types/calendar';

interface VoiceEventCreatorProps {
  onEventCreate: (event: Event) => void;
  onCancel: () => void;
}

export const VoiceEventCreator: React.FC<VoiceEventCreatorProps> = ({
  onEventCreate,
  onCancel
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceResult, setVoiceResult] = useState<string>('');
  const [parsedEvent, setParsedEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string>('');

  const handleVoiceResult = (text: string) => {
    console.log('收到語音結果:', text);
    setVoiceResult(text);
    setError('');
    setIsProcessing(true);

    try {
      // 解析語音輸入
      const parsed = VoiceEventParser.parseVoiceInput(text);
      console.log('解析結果:', parsed);
      
      // 創建事件
      const event = VoiceEventParser.createEventFromParsed(parsed);
      console.log('創建的事件:', event);
      
      setParsedEvent(event);
    } catch (err) {
      console.error('解析語音失敗:', err);
      setError('解析語音內容失敗，請再試一次');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceError = (errorMessage: string) => {
    setError(errorMessage);
    setVoiceResult('');
    setParsedEvent(null);
  };

  const handleConfirm = () => {
    if (parsedEvent) {
      onEventCreate(parsedEvent);
    }
  };

  const handleRetry = () => {
    setVoiceResult('');
    setParsedEvent(null);
    setError('');
    setIsProcessing(false);
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
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* 標題 */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem' 
        }}>
          <h2 style={{ 
            margin: '0 0 0.5rem 0', 
            color: 'black', 
            fontSize: '1.75rem', 
            fontWeight: 'bold'
          }}>
            🎤 語音建立事件
          </h2>
          <p style={{
            margin: 0,
            color: '#6b7280',
            fontSize: '1rem'
          }}>
            說出您要新增的事件，例如："明天下午2點開會"
          </p>
        </div>

        {/* 語音輸入區域 */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          marginBottom: '1.5rem',
          border: error ? '2px solid #ef4444' : '2px solid #e2e8f0'
        }}>
          <VoiceInput
            onResult={handleVoiceResult}
            onError={handleVoiceError}
            placeholder="點擊麥克風說話..."
          />
        </div>

        {/* 錯誤訊息 */}
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* 處理中 */}
        {isProcessing && (
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            color: '#3b82f6',
            fontSize: '0.9rem'
          }}>
            🔄 正在解析語音內容...
          </div>
        )}

        {/* 語音結果顯示 */}
        {voiceResult && !isProcessing && (
          <div style={{
            backgroundColor: '#f0f9ff',
            border: '1px solid #bae6fd',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
          }}>
            <div style={{ 
              fontSize: '0.85rem', 
              color: '#0369a1', 
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              📝 您剛才說的是：
            </div>
            <div style={{ 
              color: '#0c4a6e', 
              fontSize: '0.95rem',
              fontStyle: 'italic'
            }}>
              "{voiceResult}"
            </div>
          </div>
        )}

        {/* 解析結果預覽 */}
        {parsedEvent && (
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ 
              fontSize: '0.85rem', 
              color: '#15803d', 
              fontWeight: 'bold',
              marginBottom: '0.75rem'
            }}>
              ✨ 解析結果預覽：
            </div>
            
            <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#166534' }}>📝 標題：</strong>
                <span style={{ color: '#15803d' }}>{parsedEvent.title}</span>
              </div>
              
              <div style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#166534' }}>📅 日期：</strong>
                <span style={{ color: '#15803d' }}>
                  {parsedEvent.date.toLocaleDateString('zh-TW')}
                </span>
              </div>
              
              {parsedEvent.startTime && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#166534' }}>⏰ 時間：</strong>
                  <span style={{ color: '#15803d' }}>
                    {parsedEvent.startTime}
                    {parsedEvent.endTime && ` - ${parsedEvent.endTime}`}
                  </span>
                </div>
              )}
              
              <div style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#166534' }}>🏷️ 分類：</strong>
                <span style={{ 
                  color: parsedEvent.category.color,
                  fontWeight: 'bold'
                }}>
                  {parsedEvent.category.name}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 按鈕區 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {parsedEvent && (
            <button
              onClick={handleRetry}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d97706';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f59e0b';
              }}
            >
              🔄 重新錄音
            </button>
          )}
          
          <div style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
            <button
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4b5563';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#6b7280';
              }}
            >
              ❌ 取消
            </button>
            
            {parsedEvent && (
              <button
                onClick={handleConfirm}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#059669';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981';
                }}
              >
                ✅ 確認建立
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
