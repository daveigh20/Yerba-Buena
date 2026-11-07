import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const NAV = [
  { to: "/herbs", label: "Herbs" },
  { to: "/remedies", label: "Remedies" },
  { to: "/trail-map", label: "Trail Map" },
  { to: "/check-in", label: "Check-in" },
];

export default function Layout() {
  const { pathname } = useLocation();

  // Start each new page at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="brand">
            <img src="/favicon.svg" alt="" width={24} height={24} />
            Yerba Buena
          </Link>
          <nav aria-label="Main">
            <ul className="nav">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className="nav__link">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="main" className="container main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">Yerba Buena · Information here is educational, not medical advice.</div>
      </footer>
    </div>
  );
}
