import React, { useState, useRef, useCallback } from 'react';

interface VoiceInputProps {
  onResult: (text: string) => void;
  onError?: (error: string) => void;
  placeholder?: string;
  className?: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onResult,
  onError,
  placeholder = "點擊麥克風開始語音輸入...",
  className = ""
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [lastResult, setLastResult] = useState<string>('');
  const recognitionRef = useRef<any>(null);

  // 檢查瀏覽器支援
  React.useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      onError?.('您的瀏覽器不支援語音識別功能');
    }
  }, [onError]);

  const startListening = useCallback(() => {
    if (!isSupported) return;

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'zh-TW'; // 繁體中文
      
      recognition.onstart = () => {
        console.log('語音識別開始');
        setIsListening(true);
        setLastResult('');
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        console.log('語音識別結果:', transcript, '信心度:', confidence);
        
        setLastResult(transcript);
        onResult(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = (event) => {
        console.error('語音識別錯誤:', event.error);
        const errorMessage = getErrorMessage(event.error);
        onError?.(errorMessage);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        console.log('語音識別結束');
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (error) {
      console.error('啟動語音識別失敗:', error);
      onError?.('啟動語音識別失敗');
      setIsListening(false);
    }
  }, [isSupported, onResult, onError]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const getErrorMessage = (error: string): string => {
    switch (error) {
      case 'no-speech':
        return '沒有偵測到語音，請再試一次';
      case 'audio-capture':
        return '無法存取麥克風，請檢查權限設定';
      case 'not-allowed':
        return '麥克風權限被拒絕，請允許使用麥克風';
      case 'network':
        return '網路連線問題，請檢查網路';
      case 'service-not-allowed':
        return '語音服務不可用';
      default:
        return `語音識別發生錯誤: ${error}`;
    }
  };

  if (!isSupported) {
    return (
      <div style={{ 
        padding: '0.5rem', 
        fontSize: '0.875rem', 
        color: '#6b7280',
        textAlign: 'center'
      }}>
        您的瀏覽器不支援語音輸入功能
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className={className}>
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        disabled={!isSupported}
        style={{
          padding: '0.625rem',
          borderRadius: '50%',
          border: 'none',
          cursor: isSupported ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s ease',
          backgroundColor: isListening ? '#ef4444' : '#3b82f6',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '48px',
          height: '48px',
          boxShadow: isListening ? '0 0 20px rgba(239, 68, 68, 0.5)' : '0 2px 8px rgba(59, 130, 246, 0.3)',
          animation: isListening ? 'pulse 1.5s infinite' : 'none'
        }}
        onMouseEnter={(e) => {
          if (!isListening && isSupported) {
            e.currentTarget.style.backgroundColor = '#2563eb';
            e.currentTarget.style.transform = 'scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isListening) {
            e.currentTarget.style.backgroundColor = '#3b82f6';
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
        title={isListening ? '點擊停止錄音' : '點擊開始語音輸入'}
      >
        {isListening ? (
          // 停止圖示
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
          </svg>
        ) : (
          // 麥克風圖示
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '0.875rem',
          color: isListening ? '#ef4444' : '#6b7280',
          fontWeight: isListening ? 'bold' : 'normal'
        }}>
          {isListening ? '🎤 正在聆聽...' : placeholder}
        </div>
        {lastResult && (
          <div style={{
            fontSize: '0.8rem',
            color: '#9ca3af',
            marginTop: '0.25rem',
            fontStyle: 'italic'
          }}>
            上次識別: {lastResult}
          </div>
        )}
      </div>
    </div>
  );
};
