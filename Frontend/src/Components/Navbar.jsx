import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/map", label: "Live Map" },
  { to: "donate", label: "Donor" },
  { to: "/request", label: "Request Help" },
  { to: "/alerts", label: "Alerts" },
  { to: "/analytics", label: "Analytics" },
  { to: "/adminpage", label: "Admin" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (

    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 24px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "rgba(10,10,15,0.92)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(20px)",
    }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: "#f56565" }}>ResQ</span>
        <span style={{ fontSize: 20, fontWeight: 300, color: "#e8e8f0" }}>Link</span>
      </Link>

      <div style={{ display: "flex", gap: 24, fontSize: 14 }}>
        {links.map(l => (
          <Link key={l.to} to={l.to} style={{
            textDecoration: "none",
            color: pathname === l.to ? "#e8e8f0" : "rgba(232,232,240,0.5)",
            fontWeight: pathname === l.to ? 600 : 400,
            borderBottom: pathname === l.to ? "1.5px solid #f56565" : "none",
            paddingBottom: 2,
          }}>{l.label}</Link>
        ))}
      </div>

      <Link to="/request" style={{
        background: "linear-gradient(135deg,#e53e3e,#c53030)",
        color: "#fff", border: "none", padding: "8px 18px",
        borderRadius: 8, fontSize: 13, fontWeight: 700,
        textDecoration: "none",
      }}>Get Help Now</Link>
    </nav>

  );
}