/**
 * 日期工具函数
 */

/**
 * 获取指定日期所在自然周的周一日期
 * @param dateString 日期字符串，格式 YYYY-MM-DD
 * @returns 周一日期字符串，格式 YYYY-MM-DD
 */
export function getWeekStart(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // 调整为周一
  const monday = new Date(date.setDate(diff));
  
  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, '0');
  const dayOfMonth = String(monday.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${dayOfMonth}`;
}

/**
 * 获取指定周开始日期后的第 N 天
 * @param weekStart 周一开始日期，格式 YYYY-MM-DD
 * @param days 天数偏移（0 = 周一，6 = 周日）
 * @returns 日期字符串，格式 YYYY-MM-DD
 */
export function getDateInWeek(weekStart: string, days: number): string {
  const date = new Date(weekStart + 'T00:00:00');
  date.setDate(date.getDate() + days);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const dayOfMonth = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${dayOfMonth}`;
}

/**
 * 验证日期字符串格式是否为 YYYY-MM-DD
 */
export function isValidDateString(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }
  const date = new Date(dateString + 'T00:00:00');
  return date instanceof Date && !isNaN(date.getTime());
}

