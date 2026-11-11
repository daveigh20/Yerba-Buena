import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { type Lang, LANGS, type Messages, MESSAGES } from "./messages";

export type { Lang, Messages };

const STORAGE_KEY = "yb-lang";

interface LanguageState {
  lang: Lang;
  setLang(lang: Lang): void;
}

const LanguageContext = createContext<LanguageState | null>(null);

/** A saved choice wins; otherwise Spanish for browsers set to Spanish, English for everyone else. */
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as readonly string[]).includes(saved)) return saved as Lang;
  } catch {
    // Storage can be blocked (private mode, strict settings). Fall through to the browser language.
  }
  return typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageState>(
    () => ({
      lang,
      setLang(next) {
        setLangState(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // Not saved; the choice still applies for this visit.
        }
      },
    }),
    [lang],
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageState {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}

/** UI text in the current language. */
export function useT(): Messages {
  return MESSAGES[useLanguage().lang];
}
