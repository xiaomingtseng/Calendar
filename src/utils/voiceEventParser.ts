import { addDays, startOfDay, addWeeks } from 'date-fns';
import type { Event } from '../types/calendar';
import { generateId } from './dateUtils';
import { DEFAULT_CATEGORIES } from '../types/calendar';

interface ParsedEventData {
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  categoryId?: string;
  description?: string;
}

export class VoiceEventParser {
  // 分類關鍵字映射
  private static categoryKeywords = {
    [DEFAULT_CATEGORIES[0].id]: ['工作', '會議', '開會', '報告', '專案', '任務', '上班'],
    [DEFAULT_CATEGORIES[1].id]: ['個人', '私人', '家庭', '購物', '休息'],
    [DEFAULT_CATEGORIES[2].id]: ['運動', '健身', '跑步', '游泳', '瑜珈', '醫生', '看醫生', '健康'],
    [DEFAULT_CATEGORIES[3].id]: ['聚餐', '聚會', '朋友', '約會', '電影', '社交', '派對']
  };

  public static parseVoiceInput(input: string): ParsedEventData {
    console.log('解析語音輸入:', input);
    
    let title = input;
    const today = new Date();
    let eventDate = today;
    let startTime: string | undefined;
    let endTime: string | undefined;
    let categoryId: string | undefined;

    // 解析日期
    eventDate = this.parseDate(input, today);
    
    // 解析時間
    const times = this.parseTime(input);
    if (times.length > 0) {
      startTime = times[0];
      if (times.length > 1) {
        endTime = times[1];
      }
    }

    // 解析分類
    categoryId = this.parseCategory(input);

    // 清理標題，移除已解析的時間和日期資訊
    title = this.cleanTitle(input);

    // 如果標題太短，加上一些描述
    if (title.length < 2) {
      title = '語音建立的事件';
    }

    return {
      title,
      date: eventDate,
      startTime,
      endTime,
      categoryId,
      description: input !== title ? `原始輸入：${input}` : undefined
    };
  }

  private static parseDate(input: string, baseDate: Date): Date {
    const today = startOfDay(baseDate);

    // 今天
    if (input.includes('今天') || input.includes('今日')) {
      return today;
    }

    // 明天
    if (input.includes('明天') || input.includes('明日')) {
      return addDays(today, 1);
    }

    // 後天
    if (input.includes('後天')) {
      return addDays(today, 2);
    }

    // 下週 + 星期
    const nextWeekMatch = input.match(/(下週|下星期)([一二三四五六日天])/);
    if (nextWeekMatch) {
      const dayMap: { [key: string]: number } = {
        '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '日': 0, '天': 0
      };
      const targetDay = dayMap[nextWeekMatch[2]];
      const nextWeek = addWeeks(today, 1);
      const currentDay = nextWeek.getDay();
      const daysToAdd = targetDay >= currentDay ? targetDay - currentDay : 7 + targetDay - currentDay;
      return addDays(nextWeek, daysToAdd);
    }

    // 具體日期 (X月X日)
    const dateMatch = input.match(/(\d{1,2})月(\d{1,2})[日號]/);
    if (dateMatch) {
      const month = parseInt(dateMatch[1]) - 1; // JavaScript 月份從0開始
      const day = parseInt(dateMatch[2]);
      const currentYear = baseDate.getFullYear();
      let eventDate = new Date(currentYear, month, day);
      
      // 如果日期已過，設定為明年
      if (eventDate < today) {
        eventDate = new Date(currentYear + 1, month, day);
      }
      return eventDate;
    }

    // 單獨的星期幾 (假設是下週)
    const weekdayMatch = input.match(/([一二三四五六日天])/);
    if (weekdayMatch && !input.includes('星期') && !input.includes('週')) {
      const dayMap: { [key: string]: number } = {
        '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '日': 0, '天': 0
      };
      const targetDay = dayMap[weekdayMatch[1]];
      const currentDay = today.getDay();
      const daysToAdd = targetDay > currentDay ? targetDay - currentDay : 7 + targetDay - currentDay;
      return addDays(today, daysToAdd);
    }

    return today; // 默認今天
  }

  private static parseTime(input: string): string[] {
    const times: string[] = [];

    // 標準時間格式 (14:30, 14點30)
    let match;
    const timeRegex = /(\d{1,2})[：:點](\d{2})/g;
    while ((match = timeRegex.exec(input)) !== null) {
      const hour = parseInt(match[1]);
      const minute = parseInt(match[2]);
      if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
        times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }

    // 整點時間 (14點, 2點)
    const hourRegex = /(\d{1,2})[：:點]/g;
    while ((match = hourRegex.exec(input)) !== null) {
      const hour = parseInt(match[1]);
      if (hour >= 0 && hour <= 23) {
        times.push(`${hour.toString().padStart(2, '0')}:00`);
      }
    }

    // 上午/下午時間
    const ampmRegex = /(上午|下午|早上|晚上|中午)(\d{1,2})[：:點]?(\d{2})?/g;
    while ((match = ampmRegex.exec(input)) !== null) {
      const period = match[1];
      let hour = parseInt(match[2]);
      const minute = match[3] ? parseInt(match[3]) : 0;

      if (period === '下午' || period === '晚上') {
        if (hour !== 12) hour += 12;
      } else if (period === '上午' || period === '早上') {
        if (hour === 12) hour = 0;
      } else if (period === '中午') {
        hour = 12;
      }

      if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
        times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }

    return [...new Set(times)]; // 去重
  }

  private static parseCategory(input: string): string | undefined {
    for (const [categoryId, keywords] of Object.entries(this.categoryKeywords)) {
      for (const keyword of keywords) {
        if (input.includes(keyword)) {
          return categoryId;
        }
      }
    }
    return undefined;
  }

  private static cleanTitle(input: string): string {
    let title = input;

    // 移除日期相關詞彙
    title = title.replace(/(今天|今日|明天|明日|後天|下週|下星期|[一二三四五六日天]|(\d{1,2})月(\d{1,2})[日號])/g, '');
    
    // 移除時間相關詞彙
    title = title.replace(/(\d{1,2})[：:點](\d{2})/g, '');
    title = title.replace(/(\d{1,2})[：:點]/g, '');
    title = title.replace(/(上午|下午|早上|晚上|中午)(\d{1,2})[：:點]?(\d{2})?/g, '');
    
    // 移除多餘空格
    title = title.replace(/\s+/g, ' ').trim();
    
    // 移除常見的連接詞
    title = title.replace(/^(要|去|有|的|是|在)\s*/g, '');
    
    return title;
  }

  public static createEventFromParsed(parsed: ParsedEventData): Event {
    const category = DEFAULT_CATEGORIES.find(cat => cat.id === parsed.categoryId) || DEFAULT_CATEGORIES[0];
    
    return {
      id: generateId(),
      title: parsed.title,
      description: parsed.description || '',
      date: parsed.date,
      startTime: parsed.startTime,
      endTime: parsed.endTime,
      category,
      color: category.color
    };
  }
}
