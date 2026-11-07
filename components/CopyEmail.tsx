"use client";
import { profile } from "@/lib/data";
import { toast } from "./Toast";

export async function copyText(text: string, done = "Copied to clipboard") {
  try {
    await navigator.clipboard.writeText(text);
    toast(done);
  } catch {
    window.location.href = `mailto:${profile.email}`;
  }
}

export default function CopyEmail({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => copyText(profile.email, "Email copied ✓")} aria-label={`Copy ${profile.email}`}>
      {children ?? profile.email}
    </button>
  );
}
