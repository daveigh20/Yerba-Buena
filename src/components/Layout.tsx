import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import { type Lang, useLanguage, useT } from "../i18n/LanguageContext";
import { HTML_LANG, LANG_NAMES, LANGS } from "../i18n/messages";

const NAV = [
  { to: "/herbs", key: "herbs" },
  { to: "/japanese-herbs", key: "japanese" },
  { to: "/remedies", key: "remedies" },
  { to: "/trail-map", key: "trailMap" },
  { to: "/check-in", key: "checkIn" },
] as const;

export default function Layout() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { lang, setLang } = useLanguage();
  const t = useT();

  // Start each new page at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        {t.layout.skip}
      </a>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="brand">
            <img src="/favicon.svg" alt="" width={24} height={24} />
            Yerba Buena
          </Link>
          <nav aria-label={t.layout.mainNav}>
            <ul className="nav">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className="nav__link">
                    {t.layout.nav[item.key]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="auth-nav">
            <select
              className="lang-switch"
              aria-label={t.languageLabel}
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
            >
              {LANGS.map((code) => (
                <option key={code} value={code} lang={HTML_LANG[code]}>
                  {LANG_NAMES[code]}
                </option>
              ))}
            </select>
            {user !== undefined &&
              (user ? (
                <NavLink to="/account" className="nav__link">
                  {user.name.split(" ")[0]}
                </NavLink>
              ) : (
                <>
                  <NavLink to="/login" className="nav__link">
                    {t.layout.logIn}
                  </NavLink>
                  <Link to="/signup" className="button button--small">
                    {t.layout.signUp}
                  </Link>
                </>
              ))}
          </div>
        </div>
      </header>
      <main id="main" className="container main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">Yerba Buena · {t.layout.footer}</div>
      </footer>
    </div>
  );
}
