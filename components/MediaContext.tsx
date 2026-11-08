"use client";
import { createContext, useContext } from "react";

const Media = createContext<string[]>([]);
export function MediaProvider({ videos, children }: { videos: string[]; children: React.ReactNode }) {
  return <Media.Provider value={videos}>{children}</Media.Provider>;
}
export const useHasVideo = (slug: string) => useContext(Media).includes(slug);
