# 我的行事曆 📅

一個使用 React + TypeScript + Vite + Tailwind CSS 建立的現代化行事曆應用。

## 功能特色

✨ **核心功能**
- 📆 月檢視行事曆
- 🔍 點擊日期查看當日詳細行程
- ➕ 新增/編輯/刪除事件
- � 智能語音建立事件
- �🎨 事件分類與顏色標記
- 💾 本地存儲（localStorage）
- 📱 響應式設計

🎯 **事件管理**
- 漸進式事件表單（簡單 → 進階模式）
- 🗣️ 語音輸入與智能解析
- 事件標題和描述
- 開始與結束時間
- 預設分類：工作、個人、健康、社交
- 直觀的視覺化展示
- 日程詳情查看器

## 技術棧

- **前端框架**: React 18 + TypeScript
- **建置工具**: Vite
- **樣式框架**: Tailwind CSS
- **日期處理**: date-fns
- **語音處理**: Web Speech API
- **狀態管理**: React Hooks

## 開始使用

### 安裝相依套件

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

開啟瀏覽器訪問 `http://localhost:5173`

### 建置專案

```bash
npm run build
```

### 預覽建置結果

```bash
npm run preview
```

## 專案結構

```
src/
├── components/          # React 元件
│   ├── CalendarGrid.tsx    # 主行事曆網格
│   ├── CalendarHeader.tsx  # 行事曆標題列
│   ├── CalendarWeekHeader.tsx # 週標題
│   ├── CalendarDay.tsx     # 日期格子
│   ├── EventForm.tsx       # 事件表單（漸進式UI）
│   ├── DayDetailView.tsx   # 日程詳情查看器
│   ├── VoiceInput.tsx      # 語音輸入組件
│   ├── VoiceEventCreator.tsx # 語音事件建立器
│   ├── Sidebar.tsx         # 側邊欄
│   └── WeekView.tsx        # 週檢視
├── types/               # TypeScript 型別定義
│   ├── calendar.ts         # 行事曆相關型別
│   └── speech.d.ts         # 語音API型別定義
├── utils/               # 工具函數
│   ├── dateUtils.ts        # 日期處理工具
│   └── voiceEventParser.ts # 語音事件解析器
├── App.tsx              # 主應用元件
└── main.tsx             # 應用入口

```

## 使用說明

1. **瀏覽行事曆**: 使用左右箭頭切換月份，點擊"今天"回到當前月份
2. **查看日程**: 點擊任意日期查看當天的詳細行程安排
3. **新增事件**: 
   - 點擊側邊欄"✍️ 新增事件"按鈕
   - 或在日程詳情中點擊"新增事件"
   - 支援簡單模式（僅標題+日期）和進階模式（完整資訊）
4. **🎤 語音建立事件**:
   - 點擊側邊欄"🎤 語音建立"按鈕
   - 點擊麥克風圖示開始說話
   - 說出事件內容，例如："明天下午2點開會"
   - 系統會自動解析日期、時間和分類
   - 確認解析結果後建立事件
5. **編輯事件**: 在日程詳情中點擊任意事件進行編輯
6. **分類管理**: 為不同事件選擇適當的分類標籤
7. **切換視圖**: 切換月檢視和週檢視

## 🎤 語音輸入功能

語音輸入支援繁體中文，能智能識別：

### 📅 日期識別
- **相對日期**: "今天"、"明天"、"後天"
- **星期**: "下週一"、"下星期三"
- **具體日期**: "1月15日"、"12月25號"

### ⏰ 時間識別  
- **24小時制**: "14:30"、"9:00"
- **中文時間**: "下午2點30"、"早上9點"
- **口語化**: "晚上7點"、"中午12點"

### 🏷️ 智能分類
- **工作**: 包含"會議"、"報告"、"工作"等關鍵字
- **健康**: 包含"運動"、"看醫生"、"健身"等關鍵字
- **社交**: 包含"聚餐"、"朋友"、"約會"等關鍵字
- **個人**: 包含"購物"、"休息"、"私人"等關鍵字

### 語音輸入範例
```
"明天下午2點開會" → 明天 14:00 工作分類
"下週三早上9點看醫生" → 下週三 09:00 健康分類  
"今晚7點和朋友聚餐" → 今天 19:00 社交分類
"1月20日購物" → 1月20日 個人分類
```

## 測試事件功能

為了確保事件功能正常運作：
1. 開啟開發者工具 (F12)
2. 點擊任意日期新增事件
3. 填入事件標題並儲存
4. 檢查控制台是否有相關日誌
5. 確認事件是否顯示在行事曆上

## 未來規劃

🚀 **即將推出的功能**
- [x] 週檢視和日檢視
- [x] 漸進式事件表單設計
- [x] 日程詳情查看器
- [x] 🎤 語音輸入與智能事件建立
- [ ] 事件搜索功能
- [ ] 事件匯出/匯入
- [ ] 提醒通知
- [ ] 重複事件設定
- [ ] 手機版 React Native 應用
- [ ] 雲端同步功能

## 開發指南

想要貢獻或了解更多開發細節，請參考：
- React + TypeScript 最佳實踐
- Tailwind CSS 設計系統
- date-fns 日期處理指南

## 授權

MIT License
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
