import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import { useLanguage, useT } from "../i18n/LanguageContext";

const NAV = [
  { to: "/herbs", key: "herbs" },
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
            <button
              type="button"
              className="lang-switch"
              lang={lang === "en" ? "es" : "en"}
              aria-label={t.switchToLabel}
              onClick={() => setLang(lang === "en" ? "es" : "en")}
            >
              {t.switchTo}
            </button>
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
