import { useState } from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const OPTIONS = [
  { value: "good", emoji: "😊", label: "Good" },
  { value: "okay", emoji: "😐", label: "Okay" },
  { value: "not-good", emoji: "☹️", label: "Not good" },
] as const;

type Answer = (typeof OPTIONS)[number]["value"] | "skipped";

export default function WellbeingCheckInPage() {
  useDocumentTitle("Well-being Check-in");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const chosen = OPTIONS.find((o) => o.value === answer);

  return (
    <section className="check-in">
      <header className="page-header">
        <h1>Mental Well-being Check-in</h1>
        <p className="lead">How would you describe your overall mental well-being today?</p>
      </header>

      {answer === null ? (
        <>
          <div className="check-in__options" role="group" aria-label="How are you feeling?">
            {OPTIONS.map((o) => (
              <button key={o.value} type="button" className="check-in__option" onClick={() => setAnswer(o.value)}>
                <span className="check-in__emoji" aria-hidden="true">
                  {o.emoji}
                </span>
                {o.label}
              </button>
            ))}
          </div>
          <button type="button" className="button button--secondary" onClick={() => setAnswer("skipped")}>
            Skip
          </button>
        </>
      ) : (
        <div className="card check-in__result" role="status">
          <p className="lead">{chosen ? `Thank you for sharing! ${chosen.emoji}` : "Survey skipped."}</p>
          <button type="button" className="button button--secondary" onClick={() => setAnswer(null)}>
            {chosen ? "Change answer" : "Take the check-in"}
          </button>
        </div>
      )}
    </section>
  );
}
