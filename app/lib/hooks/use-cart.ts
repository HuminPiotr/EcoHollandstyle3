"use client";
import { create } from "zustand"; // polecam zustand do stanów w Next, ale na razie zróbmy prosty mock

export const useCart = () => ({
  totalItems: 0,
  setIsOpen: (open: boolean) => console.log("Cart open:", open),
});
