"use client";

import moment from "moment";

export function convertDate(date: string, format = "YYYY-MM-DD HH:mm:ss") {
  return moment(date).format(format);
}

export function convertMicrosecond(
  date: string | number,
  format = "YYYY-MM-DD HH:mm:ss"
) {
  return moment(date, "x").format(format);
}

export function convertTimeStampToTimeNoUTC(timestamp: string, format = "LT") {
  return moment(timestamp, "X").format(format);
}

export function convertTimeStamp(
  timestamp: string,
  format = "YYYY-MM-DD HH:mm:ss"
) {
  return moment(timestamp, "X").format(format);
}

export function splitAddress(address: string, length: number = 6): string {
  if (!address || address.length <= length * 2) {
    return address;
  }
  return `${address.substring(0, length)}...${address.substring(
    address.length - length
  )}`;
}

export function money(
  value: number | string,
  symbol: string = "",
  left: boolean = true,
  decimal: number = 2
): string {
  try {
    // Format the number using Intl.NumberFormat with custom decimal places
    const formattedNumber = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    }).format(Number(value));

    // Add the symbol to the left or right
    return left
      ? `${symbol}${formattedNumber}`
      : `${formattedNumber} ${symbol}`;
  } catch {
    return "0";
  }
}

export function convertDuration(openTime: number, closeTime: number): string {
  // Calculate the duration
  const duration = moment.duration(
    moment(openTime, "x").diff(moment(closeTime, "x"))
  );

  // Extract hours, minutes, and seconds from the duration
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  // Format the duration into a human-readable format
  return `${hours}h ${minutes}m ${seconds}s`;
}

export function truncateStr(
  address: string | undefined | null,
  startLength = 3,
  endLength = 3
): string {
  if (address == undefined || address.length === 0) return "";
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

export function countdown(timestamp: number) {
  const countdown_to = moment.unix(timestamp);
  const duration = moment.duration(countdown_to.diff(moment()));
  if (duration.asMilliseconds() > 0) {
    const days = duration.days().toString();
    const hours = duration.hours().toString();
    const minutes = duration.minutes().toString();
    const seconds = duration.seconds().toString();
    return {
      d: days.padStart(2, "0"),
      h: hours.padStart(2, "0"),
      m: minutes.padStart(2, "0"),
      s: seconds.padStart(2, "0"),
    };
  }
  return null;
}

export function copy(text: string) {
  return new Promise(async (resolve, reject) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    await navigator.clipboard.writeText(text ?? "");

    resolve(true);
  });
}

export function decodedToken(token: string) {
  try {
    if (token == null) return null;
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

/**
 * Count decimal places in a number
 * @param value - Number to count decimals for
 * @returns Number of decimal places
 */
export function countDecimals(value: number | string): number {
  try {
    const numValue = parseFloat(String(value));
    if (isNaN(numValue)) return 0;
    if (Math.floor(numValue) === numValue) return 0;
    const decimalPart = String(numValue).split(".")[1];
    return decimalPart ? decimalPart.length : 0;
  } catch {
    return 0;
  }
}
