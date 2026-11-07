import { SOURCE } from "../data";

export default function SourceNote() {
  return (
    <p className="source-note small muted">
      Benefits are adapted from{" "}
      <a href={SOURCE.url} target="_blank" rel="noopener noreferrer">
        {SOURCE.publisher}, “{SOURCE.title}”
      </a>
      . These are traditional and general wellness claims, not medical advice. Talk with a healthcare professional
      before using herbs, especially if you're pregnant, nursing, or taking medication.
    </p>
  );
}
