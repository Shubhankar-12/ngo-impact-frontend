import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToSearchParams = (data: any) => {
 
  const searchParams = new URLSearchParams();
  for (const key in data) {
    searchParams.set(key, data[key]);
  }
  return searchParams;
};
