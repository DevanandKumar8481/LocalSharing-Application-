import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/map", label: "Live Map" },
  { to: "/donate", label: "Donor" },
  { to: "/request", label: "Request Help" },
  { to: "/alerts", label: "Alerts" },
  { to: "/analytics", label: "Analytics" },
  { to: "/adminpage", label: "Admin" },
  { to: "/trackpage", label: "Track Request" }
];


if (typeof document !== "undefined" && !document.getElementById("navbar-resp-styles")) {
  const s = document.createElement("style");
  s.id = "navbar-resp-styles";
  s.textContent = `
    /* Hide Navbar links on mobile */
    @media (max-width: 768px) {
      .nb-desktop-links { display: none !important; }
      .nb-desktop-cta   { display: none !important; }
      .nb-hamburger     { display: flex  !important; }
    }
    /* Hide hamburger on desktop */
    @media (min-width: 769px) {
      .nb-hamburger { display: none !important; }
    }

    /* Drawer slide-in animation */
    @keyframes drawerIn {
      from { transform: translateX(-100%); opacity: 0; }
      to   { transform: translateX(0);     opacity: 1; }
    }
    @keyframes drawerOut {
      from { transform: translateX(0);     opacity: 1; }
      to   { transform: translateX(-100%); opacity: 0; }
    }
    .nb-drawer        { animation: drawerIn  .25s ease forwards; }
    .nb-drawer.closing{ animation: drawerOut .22s ease forwards; }

    /* Overlay fade */
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    .nb-overlay { animation: fadeIn .2s ease forwards; }

    /* Mobile link hover */
    .nb-mob-link:hover { background: rgba(245,101,101,0.06) !important; color: #e8e8f0 !important; }
    /* Desktop link hover */
    .nb-desk-link:hover { color: #e8e8f0 !important; }
  `;
  document.head.appendChild(s);
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  function closeDrawer() {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 210);
  }

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 60, padding: "0 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(10,10,15,0.92)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#f56565" }}>ResQ</span>
          <span style={{ fontSize: 20, fontWeight: 300, color: "#e8e8f0" }}>Link</span>
        </Link>

        {/* Desktop links */}
        <div className="nb-desktop-links" style={{ display: "flex", gap: 22, fontSize: 14 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} className="nb-desk-link" style={{
              textDecoration: "none",
              color: pathname === l.to ? "#e8e8f0" : "rgba(232,232,240,0.5)",
              fontWeight: pathname === l.to ? 600 : 400,
              borderBottom: pathname === l.to ? "1.5px solid #f56565" : "none",
              paddingBottom: 2,
              transition: "color .15s",
            }}>{l.label}</Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <Link to="/request" className="nb-desktop-cta" style={{
            background: "linear-gradient(135deg,#e53e3e,#c53030)",
            color: "#fff", padding: "8px 18px",
            borderRadius: 8, fontSize: 13, fontWeight: 700,
            textDecoration: "none",
          }}>Get Help Now</Link>

          <Link to="/profile"
            onClick={closeDrawer}
            style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg,#f66565,#e53e3e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none", fontWeight:700,fontSize:"16px",
            }}>
            A

          </Link>
        </div>
        {/* Hamburger (mobile only) */}
        <button
          className="nb-hamburger"
          onClick={() => setOpen(true)}
          style={{
            display: "none", // overridden by media query
            alignItems: "center", justifyContent: "center",
            width: 38, height: 38, borderRadius: 9,
            border: "1.5px solid rgba(255,255,255,0.15)",
            background: "transparent", cursor: "pointer",
          }}
        >
          <Menu size={18} color="#e8e8f0" />
        </button>
      </nav>

      {/* Spacer */}
      <div style={{ height: 60 }} />

      {/* ── Mobile Drawer ── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="nb-overlay"
            onClick={closeDrawer}
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "rgba(0,0,0,0.45)",
            }}
          />

          {/* Drawer panel  */}
          <div
            className={`nb-drawer${closing ? " closing" : ""}`}
            style={{
              position: "fixed", top: 0, left: 0, bottom: 0,
              width: "82vw", maxWidth: 340,
              zIndex: 201,
              background: "#ffffff",
              borderRadius: "0 24px 24px 0",
              boxShadow: "4px 0 32px rgba(0,0,0,0.18)",
              display: "flex", flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Drawer header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 20px",
              borderBottom: "1px solid #f0f0f4",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Pink circle logo */}
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "linear-gradient(135deg,#f56565,#e53e3e)",
                }} />
                <span style={{ fontWeight: 800, fontSize: 18, color: "#111" }}>
                  ResQ<span style={{ color: "#f56565" }}>Link</span>
                </span>
              </div>
              <button
                onClick={closeDrawer}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
              >
                <X size={22} color="#6b7280" />
              </button>
            </div>

            {/* Nav links */}
            <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={closeDrawer}
                  className="nb-mob-link"
                  style={{
                    display: "block",
                    padding: "14px 16px",
                    borderRadius: 10,
                    textDecoration: "none",
                    fontSize: 16,
                    fontWeight: pathname === l.to ? 700 : 500,
                    color: pathname === l.to ? "#f56565" : "#111827",
                    background: pathname === l.to ? "rgba(245,101,101,0.07)" : "transparent",
                    marginBottom: 2,
                    transition: "background .15s, color .15s",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Bottom CTA buttons — matches screenshot */}
            <div style={{ padding: "16px 16px 28px", borderTop: "1px solid #f0f0f4", display: "flex", gap: 10 }}>
              <Link
                to="/login"
                onClick={closeDrawer}
                style={{
                  flex: 1, padding: "12px 0", borderRadius: 12,
                  border: "1.5px solid #e8eaed", background: "#fff",
                  color: "#111", fontWeight: 600, fontSize: 14,
                  textDecoration: "none", textAlign: "center",
                  display: "block",
                }}
              >Sign in</Link>
              <Link
                to="/request"
                onClick={closeDrawer}
                style={{
                  flex: 1, padding: "12px 0", borderRadius: 12,
                  background: "linear-gradient(135deg,#e53e3e,#c53030)",
                  color: "#fff", fontWeight: 700, fontSize: 14,
                  textDecoration: "none", textAlign: "center",
                  display: "block",
                }}
              >Get Help</Link>

            </div>
          </div>
        </>
      )}
    </>
  );
}
