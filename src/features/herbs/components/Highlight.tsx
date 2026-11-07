import { Fragment, type ReactNode } from "react";
import { findMatches } from "../lib/normalize";

/** Renders `text` with every match of `query` wrapped in <mark>. */
export default function Highlight({ text, query }: { text: string; query: string }) {
  const ranges = findMatches(text, query);
  if (!ranges.length) return <>{text}</>;

  const parts: ReactNode[] = [];
  let last = 0;
  ranges.forEach(([start, end], i) => {
    if (start > last) parts.push(<Fragment key={`t${i}`}>{text.slice(last, start)}</Fragment>);
    parts.push(<mark key={`m${i}`}>{text.slice(start, end)}</mark>);
    last = end;
  });
  if (last < text.length) parts.push(<Fragment key="end">{text.slice(last)}</Fragment>);
  return <>{parts}</>;
}
