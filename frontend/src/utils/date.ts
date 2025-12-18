import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import 'dayjs/locale/zh-cn';

dayjs.extend(isoWeek);
dayjs.locale('zh-cn');

/**
 * 获取指定日期所在自然周的周一日期
 */
export function getWeekStart(dateString: string): string {
  const date = dayjs(dateString);
  return date.startOf('isoWeek').format('YYYY-MM-DD');
}

/**
 * 获取指定周开始日期后的第 N 天
 */
export function getDateInWeek(weekStart: string, days: number): string {
  return dayjs(weekStart).add(days, 'day').format('YYYY-MM-DD');
}

/**
 * 获取当前日期所在周的周一
 */
export function getCurrentWeekStart(): string {
  return dayjs().startOf('isoWeek').format('YYYY-MM-DD');
}

/**
 * 格式化日期显示
 */
export function formatDate(dateString: string): string {
  return dayjs(dateString).format('MM月DD日');
}

/**
 * 获取星期几（中文）
 */
export function getWeekday(dateString: string): string {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return weekdays[dayjs(dateString).day()];
}

