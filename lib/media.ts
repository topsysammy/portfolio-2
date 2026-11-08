import "server-only";
import fs from "node:fs";
import path from "node:path";
import { projects } from "./projects";

/** Slugs whose demo video file is actually in /public. Runs at build time, so dropping a file in and redeploying is enough. */
export function presentVideos(): string[] {
  return projects
    .filter((p) => p.video && fs.existsSync(path.join(process.cwd(), "public", p.video.src)))
    .map((p) => p.slug);
}
