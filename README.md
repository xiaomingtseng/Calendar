# 我的行事曆 📅

一個使用 React + TypeScript + Vite + Tailwind CSS 建立的現代化行事曆應用。

## 功能特色

✨ **核心功能**
- 📆 月檢視行事曆
- ➕ 新增/編輯/刪除事件
- 🎨 事件分類與顏色標記
- 💾 本地存儲（localStorage）
- 📱 響應式設計

🎯 **事件管理**
- 事件標題和描述
- 開始與結束時間
- 預設分類：工作、個人、健康、社交
- 直觀的視覺化展示

## 技術棧

- **前端框架**: React 18 + TypeScript
- **建置工具**: Vite
- **樣式框架**: Tailwind CSS
- **日期處理**: date-fns
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
│   └── EventForm.tsx       # 事件表單
├── types/               # TypeScript 型別定義
│   └── calendar.ts         # 行事曆相關型別
├── utils/               # 工具函數
│   └── dateUtils.ts        # 日期處理工具
├── App.tsx              # 主應用元件
└── main.tsx             # 應用入口

```

## 使用說明

1. **瀏覽行事曆**: 使用左右箭頭切換月份，點擊"今天"回到當前月份
2. **新增事件**: 點擊"新增事件"按鈕或直接點擊日期格子
3. **編輯事件**: 點擊已存在的事件進行編輯
4. **分類管理**: 為不同事件選擇適當的分類標籤

## 未來規劃

🚀 **即將推出的功能**
- [ ] 週檢視和日檢視
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
