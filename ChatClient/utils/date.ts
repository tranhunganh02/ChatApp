// import { format } from 'date-fns';

/**
 * Convert ISO 8601 timestamp to a readable format.
 * @param timestamp - ISO 8601 string (e.g., "2024-11-02T19:08:24.509982").
 * @param formatStr - Desired output format (default: "yyyy-MM-dd HH:mm:ss").
 * @returns Formatted date string or an empty string if the input is invalid.
 */
// export const formatTimestamp = (timestamp: string, formatStr: string = 'yyyy-MM-dd HH:mm:ss'): string => {
//   try {
//     const date = new Date(timestamp);
//     return format(date, formatStr);
//   } catch (error) {
//     console.error('Invalid timestamp:', error);
//     return '';
//   }
// };

export const formatDate = (dateStr: string): string => {
  const inputDate = new Date(dateStr);

  const now = new Date();

  if (inputDate.toDateString() === now.toDateString()) {
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  } else {
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();
    return `${day} thg ${month < 10 ? "0" + month : month}, ${year}`;
  }
};
