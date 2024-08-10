import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = Math.random() * 1000;

export const credentials = {
  email: "arjun@quadb.tech",
  password: "quadb.tech",
};
