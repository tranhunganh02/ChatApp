// import { format } from "date-fns";

/**
 * Convert ISO 8601 timestamp to a readable format.
 * @param timestamp - ISO 8601 string (e.g., "2024-11-02T19:08:24.509982").
 * @param formatStr - Desired output format (default: "yyyy-MM-dd HH:mm:ss").
 * @returns Formatted date string or an empty string if the input is invalid.
 */
// export const formatTimestamp = (
//   timestamp: string,
//   formatStr: string = "yyyy-MM-dd HH:mm:ss"
// ): string => {
//   try {
//     const date = new Date(timestamp);
//     return format(date, formatStr);
//   } catch (error) {
//     console.error("Invalid timestamp:", error);
//     return "";
//   }
// };

export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } else {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day} thg ${month}`;
  }
};
