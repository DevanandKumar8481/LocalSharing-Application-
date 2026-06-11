import { useState } from "react";
import {
  Plus, Droplet, Truck, Pill, MapPin, Clock, TrendingUp,
  AlertTriangle, CheckCircle2, ArrowUpRight, HeartPulse,
  Activity, Award, Zap
} from "lucide-react";
import { Link } from "react-router-dom";

//  Design tokens 
const COLOR = {
  primary:      "#E5383B",
  primaryLight: "#fde8e8",
  secondary:    "#6C63FF",
  secondaryLight:"#eeecff",
  success:      "#22c55e",
  successLight: "#dcfce7",
  warning:      "#f59e0b",
  warningLight: "#fef3c7",
  bg:           "#f8f9fc",
  card:         "#ffffff",
  border:       "#e8eaed",
  text:         "#111827",
  muted:        "#6b7280",
  gradHero:     "linear-gradient(135deg, #E5383B 0%, #a21caf 100%)",
  gradCard:     "linear-gradient(135deg, #6C63FF 0%, #E5383B 100%)",
};

const S = {
  shell: {
    minHeight: "100vh",
    background: COLOR.bg,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: COLOR.text,
  },
  header: {
    background: COLOR.card,
    borderBottom: `1px solid ${COLOR.border}`,
    padding: "0 24px",
    height: 68,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logo: {
    fontWeight: 800,
    fontSize: 20,
    background: COLOR.gradHero,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.5px",
  },
  main: { maxWidth: 1200, margin: "0 auto", padding: "28px 20px 48px" },
  pageTitle: { fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 2 },
  pageSub:   { fontSize: 13, color: COLOR.muted, marginBottom: 28 },
  row:  (gap = 16) => ({ display: "flex", gap, flexWrap: "wrap" }),
  card: (extra = {}) => ({
    background: COLOR.card,
    border: `1px solid ${COLOR.border}`,
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 2px 12px rgba(0,0,0,.05)",
    ...extra,
  }),

  // Buttons
  btnPrimary: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "10px 18px", borderRadius: 10, border: "none",
    background: COLOR.gradHero, color: "#fff",
    fontWeight: 600, fontSize: 14, cursor: "pointer",
  },
  btnOutline: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "10px 16px", borderRadius: 10,
    border: `1.5px solid ${COLOR.border}`, background: "transparent",
    fontWeight: 500, fontSize: 14, cursor: "pointer", color: COLOR.text,
  },
  btnSm: {
    padding: "6px 14px", borderRadius: 8, border: `1.5px solid ${COLOR.border}`,
    background: "transparent", fontWeight: 500, fontSize: 12, cursor: "pointer",
  },
  tag: (bg, color) => ({
    fontSize: 10, fontWeight: 700, padding: "3px 8px",
    borderRadius: 99, background: bg, color,
  }),
  iconBox: (bg, size = 48, radius = 12) => ({
    width: size, height: size, borderRadius: radius,
    background: bg, display: "grid", placeItems: "center", flexShrink: 0,
  }),
};

// Helpers 
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  return w;
}

function Grid({ cols = 1, gap = 16, children, style = {} }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Badge({ color, label }) {
  const map = {
    primary: { bg: COLOR.primary,     fg: "#fff" },
    warning: { bg: COLOR.warning,     fg: "#fff" },
    success: { bg: COLOR.success,     fg: "#fff" },
    secondary:{ bg: COLOR.secondary,  fg: "#fff" },
  };
  const c = map[color] || map.primary;
  return <span style={S.tag(c.bg, c.fg)}>{label}</span>;
}

// SOS pulse animation (keyframes injected once)
const CSS = `
@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: .6; }
  100% { transform: scale(1.55); opacity: 0; }
}
@keyframes spin-slow { to { transform: rotate(360deg); } }
`;
if (typeof document !== "undefined" && !document.getElementById("resq-styles")) {
  const el = document.createElement("style");
  el.id = "resq-styles";
  el.textContent = CSS;
  document.head.appendChild(el);
}

// Sub-components 
function AlertRow({ color, title, sub }) {
  const accent = { primary: COLOR.primary, warning: COLOR.warning, success: COLOR.success }[color];
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div style={{ width: 3, borderRadius: 99, background: accent, flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 11, color: COLOR.muted, marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

// Main Dashboard
export default function Dashboard() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const stats = [
    { icon: Activity, label: "Lives assisted", value: "27",      delta: "+3 this week",    color: COLOR.primary,    bg: COLOR.primaryLight },
    { icon: Clock,    label: "Avg response",   value: "2m 41s",  delta: "−18s vs last",    color: COLOR.secondary,  bg: COLOR.secondaryLight },
    { icon: Award,    label: "Trust score",    value: "4.92",    delta: "Top 5% in city",  color: COLOR.success,    bg: COLOR.successLight },
    { icon: Zap,      label: "Streak",         value: "12 days", delta: "Keep it up!",     color: COLOR.warning,    bg: COLOR.warningLight },
  ];

  const requests = [
    {
      icon: Droplet, title: "O-negative blood needed", urg: "CRITICAL",
      dist: "1.2 km", time: "2 min ago", who: "Apollo Hospital · ICU",
      color: COLOR.primary, bg: COLOR.primaryLight, urgColor: "primary",
    },
    {
      icon: Truck, title: "Transport to dialysis center", urg: "HIGH",
      dist: "0.8 km", time: "8 min ago", who: "Mrs. Mehta · Age 64",
      color: COLOR.warning, bg: COLOR.warningLight, urgColor: "warning",
    },
    {
      icon: Pill, title: "Insulin pen (NovoRapid)", urg: "MEDIUM",
      dist: "2.4 km", time: "14 min ago", who: "Family of 3",
      color: COLOR.secondary, bg: COLOR.secondaryLight, urgColor: "secondary",
    },
  ];

  const quickActions = [
    { icon: Droplet,       label: "Donate blood", to: "/donate" },
    { icon: Plus,          label: "Request help", to: "/request" },
    { icon: MapPin,        label: "Live map" , to: "/map"},
    { icon: CheckCircle2,  label: "My impact", to: "/impact"},
  ];

  return (
    <div style={S.shell}>
      <br></br><br></br>
      {/* Header */}
      <header style={S.header}>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={S.btnOutline}><MapPin size={14} /> Update location</button>
          <button style={S.btnPrimary}><Plus size={14} /> New Request</button>
        </div>
      </header>

      {/* Main */}
      <main style={S.main}>
        <div style={S.pageTitle}>Good evening, Aarav</div>
        <div style={S.pageSub}>3 active requests near you · 12 verified responders online</div>

        {/* Hero row  */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: 16, marginBottom: 20 }}>
          {/* Community status */}
          <div style={{
            borderRadius: 24, padding: "36px 32px",
            background: COLOR.gradHero, color: "#fff",
            position: "relative", overflow: "hidden",
            boxShadow: "0 8px 32px rgba(229,56,59,.35)",
          }}>
            <div style={{
              position: "absolute", top: -80, right: -80,
              width: 260, height: 260, borderRadius: "50%",
              background: "rgba(255,255,255,.1)", filter: "blur(40px)",
            }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, opacity: .9, marginBottom: 12 }}>
                <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
                  <span style={{
                    position: "absolute", inset: 0, borderRadius: "50%",
                    background: "#fff", animation: "pulse-ring 1.4s ease-out infinite",
                  }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", display: "block" }} />
                </span>
                LIVE · COMMUNITY STATUS
              </div>
              <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.2, margin: 0 }}>
                Your neighborhood is stable.
              </h2>
              <p style={{ marginTop: 8, opacity: .9, fontSize: 14, maxWidth: 380 }}>
                No critical alerts within 5 km. 248 donors and 42 shelters are available right now.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 24, maxWidth: 340 }}>
                {[{ v: "248", l: "Donors" }, { v: "42", l: "Shelters" }, { v: "<3m", l: "Avg ETA" }].map(s => (
                  <div key={s.l} style={{
                    borderRadius: 14, background: "rgba(255,255,255,.13)",
                    backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.18)",
                    padding: "12px 14px",
                  }}>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>{s.v}</div>
                    <div style={{ fontSize: 11, opacity: .8, marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SOS button */}
          <div style={{ ...S.card(), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ position: "relative", width: 120, height: 120, cursor: "pointer" }}>
              <span style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: `${COLOR.primary}50`,
                animation: "pulse-ring 1.6s ease-out infinite",
              }} />
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: COLOR.gradHero,
                display: "grid", placeItems: "center",
                boxShadow: `0 0 32px ${COLOR.primary}80`,
              }}>
                <HeartPulse size={40} color="#fff" />
              </div>
            </div>
            <div style={{ marginTop: 20, fontSize: 18, fontWeight: 800 }}>Press for SOS</div>
            <p style={{ fontSize: 12, color: COLOR.muted, marginTop: 6, maxWidth: 200, lineHeight: 1.5 }}>
              Sends live location to your 3 trusted contacts and the nearest first-responders.
            </p>
          </div>
        </div>

        {/* ── Stat strip ── */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
          {stats.map(s => (
            <div key={s.label} style={S.card()}>
              <div style={S.iconBox(s.bg)}>
                <s.icon size={20} color={s.color} />
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, marginTop: 14 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: COLOR.muted, marginTop: 2 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: COLOR.success, marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}>
                <TrendingUp size={12} /> {s.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom grid  */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: 16 }}>
          {/* Active requests */}
          <div style={S.card()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Active requests near you</h3>
              <a href="#" style={{ fontSize: 12, color: COLOR.primary, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                Open map <ArrowUpRight size={12} />
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {requests.map(r => (
                <div key={r.title} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: 14, borderRadius: 14, background: COLOR.bg,
                  border: `1px solid ${COLOR.border}`,
                }}>
                  <div style={S.iconBox(r.bg)}>
                    <r.icon size={22} color={r.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{r.title}</span>
                      <Badge color={r.urgColor} label={r.urg} />
                    </div>
                    <div style={{ fontSize: 12, color: COLOR.muted, marginTop: 3 }}>
                      {r.who} · {r.dist} · {r.time}
                    </div>
                  </div>
                  <button style={S.btnSm}>Accept</button>
                </div>
              ))}
            </div>
          </div>

          {/* Side cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Volunteer status */}
            <div style={S.card()}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Volunteer status</h3>
                <span style={S.tag(COLOR.successLight, COLOR.success)}>ON DUTY</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLOR.success, animation: "pulse-ring 1.4s ease-out infinite", display: "inline-block" }} />
                Visible to nearby requests
              </div>
              <div style={{ marginTop: 16, height: 6, background: COLOR.border, borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "68%", background: COLOR.gradHero, borderRadius: 99 }} />
              </div>
              <div style={{ fontSize: 12, color: COLOR.muted, marginTop: 8 }}>
                68% to next badge: <span style={{ color: COLOR.text, fontWeight: 600 }}>First Responder Gold</span>
              </div>
            </div>

            {/* Emergency alerts */}
            <div style={S.card()}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <AlertTriangle size={16} color={COLOR.warning} />
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Emergency alerts</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <AlertRow color="warning" title="Heavy rainfall warning"     sub="Sector 22 · Next 6 hours" />
                <AlertRow color="primary" title="Blood drive at Civil Hospital" sub="Tomorrow 9 AM – 4 PM" />
                <AlertRow color="success" title="Shelter capacity restored"  sub="Community Hall, Sec 14" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick actions ── */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 12, marginTop: 20 }}>
          {quickActions.map(q => (
            <Link key={q.label} to={q.to} style={{
              ...S.card({ padding: 16 }),
              display: "flex", alignItems: "center", gap: 12,
              textDecoration: "none", color: COLOR.text,
              transition: "box-shadow .2s, transform .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,.05)"; e.currentTarget.style.transform = "none"; }}
            >
              <span style={{ ...S.iconBox(COLOR.gradHero, 40, 10), background: COLOR.gradHero }}>
                <q.icon size={18} color="#fff" />
              </span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{q.label}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
