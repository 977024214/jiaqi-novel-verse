import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + "亿";
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + "万";
  }
  return num.toString();
}

export function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return "刚刚";
  }
  if (diff < hour) {
    return Math.floor(diff / minute) + "分钟前";
  }
  if (diff < day) {
    return Math.floor(diff / hour) + "小时前";
  }
  if (diff < 7 * day) {
    return Math.floor(diff / day) + "天前";
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day_ = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day_}`;
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function getWordCountText(count: number): string {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + "万字";
  }
  return count + "字";
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "连载中":
      return "text-green-600";
    case "已完结":
      return "text-primary";
    case "暂停更新":
      return "text-yellow-600";
    default:
      return "text-muted-foreground";
  }
}
