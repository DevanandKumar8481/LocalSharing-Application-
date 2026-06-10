import { useState } from "react";
import { Siren, Mail, Lock, Smartphone, ShieldCheck, ArrowRight, Eye } from "lucide-react";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  primary:   "#E5383B",
  secondary: "#6C63FF",
  success:   "#22c55e",
  bg:        "#f8f9fc",
  card:      "#ffffff",
  border:    "#e8eaed",
  text:      "#111827",
  muted:     "#6b7280",
  mutedBg:   "#f3f4f6",
  gradHero:  "linear-gradient(135deg,#E5383B 0%,#a21caf 100%)",
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const input = {
  width: "100%", height: 44, padding: "0 12px 0 38px",
  borderRadius: 10, border: `1.5px solid ${C.border}`,
  fontSize: 14, color: C.text, background: C.card,
  outline: "none", boxSizing: "border-box",
};

const btnPrimary = {
  width: "100%", height: 44,
  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
  borderRadius: 10, border: "none",
  background: C.gradHero, color: "#fff",
  fontSize: 15, fontWeight: 700, cursor: "pointer",
  boxShadow: "0 4px 16px rgba(229,56,59,.35)",
};

const btnOutline = {
  flex: 1, height: 44,
  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  borderRadius: 10, border: `1.5px solid ${C.border}`,
  background: C.card, color: C.text,
  fontSize: 14, fontWeight: 500, cursor: "pointer",
};

// ─── CSS (animation) ──────────────────────────────────────────────────────────
if (typeof document !== "undefined" && !document.getElementById("login-styles")) {
  const s = document.createElement("style");
  s.id = "login-styles";
  s.textContent = `
    @keyframes pulse-ring {
      0%   { transform:scale(1);   opacity:.5; }
      100% { transform:scale(1.7); opacity:0;  }
    }
  `;
  document.head.appendChild(s);
}

// ─── Google SVG ───────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.86-3.08.43-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.43C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LoginPage() {
  const [tab, setTab] = useState("email");
  const [showPass, setShowPass] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      fontFamily: "'Inter','Segoe UI',sans-serif",
      color: C.text,
    }}>

      {/* ── Left brand panel ── */}
      {!isMobile && (
        <aside style={{
          position: "relative",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 48, overflow: "hidden",
          background: C.gradHero, color: "#fff",
        }}>
          {/* dot grid */}
          <div style={{
            position: "absolute", inset: 0, opacity: .25,
            backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          {/* glow blob */}
          <div style={{
            position: "absolute", top: -100, right: -100,
            width: 360, height: 360, borderRadius: "50%",
            background: "rgba(255,255,255,.12)", filter: "blur(60px)",
          }} />

          {/* Logo */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 40, height: 40, borderRadius: 12,
              background: "rgba(255,255,255,.18)", backdropFilter: "blur(8px)",
              display: "grid", placeItems: "center",
            }}>
              <Siren size={18} color="#fff" />
            </span>
            <span style={{ fontWeight: 800, fontSize: 20 }}>
              ResQ<span style={{ opacity: .75 }}>Link</span>
            </span>
          </div>

          {/* Hero text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.18, letterSpacing: "-1px", margin: 0 }}>
              When seconds matter,<br />we connect the helpers.
            </h2>
            <p style={{ marginTop: 16, opacity: .9, maxWidth: 400, fontSize: 15, lineHeight: 1.65 }}>
              Sign in to coordinate blood, transport, medicines, food and shelter for those who need it most.
            </p>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 36, maxWidth: 380 }}>
              {[{ v: "12K+", l: "Volunteers" }, { v: "98%", l: "Verified" }, { v: "<3m", l: "Avg ETA" }].map(s => (
                <div key={s.l} style={{
                  borderRadius: 16, background: "rgba(255,255,255,.12)",
                  backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.22)",
                  padding: "14px 16px",
                }}>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>{s.v}</div>
                  <div style={{ fontSize: 11, opacity: .8, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 1, fontSize: 12, opacity: .75 }}>
            © 2026 ResQ Link · Made with care in India
          </div>
        </aside>
      )}

      {/* ── Right form panel ── */}
      <main style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: isMobile ? 24 : 48,
        background: C.bg,
      }}>
        <div style={{ width: "100%", maxWidth: 440 }}>

          {/* Mobile logo */}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10,
                background: C.gradHero,
                display: "grid", placeItems: "center",
              }}>
                <Siren size={17} color="#fff" />
              </span>
              <span style={{ fontWeight: 800, fontSize: 18 }}>
                ResQ<span style={{ color: C.primary }}>Link</span>
              </span>
            </div>
          )}

          <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", margin: 0 }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: C.muted, marginTop: 6, marginBottom: 0 }}>
            Sign in to continue helping your community.
          </p>

          {/* Social buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <button style={btnOutline}><GoogleIcon /> Google</button>
            <button style={btnOutline}><AppleIcon /> Apple</button>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0", color: C.muted, fontSize: 12 }}>
            <span style={{ flex: 1, height: 1, background: C.border }} />
            or continue with
            <span style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          {/* Tabs */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            padding: 4, borderRadius: 12, background: C.mutedBg,
            marginBottom: 20,
          }}>
            {["email", "phone"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "9px 0", borderRadius: 9, border: "none",
                background: tab === t ? C.card : "transparent",
                color: tab === t ? C.text : C.muted,
                fontWeight: 600, fontSize: 14, cursor: "pointer",
                boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,.08)" : "none",
                transition: "all .15s",
              }}>
                {t === "email" ? "Email" : "Mobile OTP"}
              </button>
            ))}
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {tab === "email" ? (
              <>
                {/* Email */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Email address</div>
                  <div style={{ position: "relative" }}>
                    <Mail size={15} color={C.muted} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                    <input type="email" placeholder="you@community.org" style={input} />
                  </div>
                </div>
                {/* Password */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>Password</span>
                    <a href="#" style={{ fontSize: 12, color: C.secondary, textDecoration: "none", fontWeight: 500 }}>Forgot?</a>
                  </div>
                  <div style={{ position: "relative" }}>
                    <Lock size={15} color={C.muted} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      style={{ ...input, paddingRight: 38 }}
                    />
                    <Eye
                      size={15} color={C.muted}
                      onClick={() => setShowPass(v => !v)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Phone */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>Mobile number</div>
                  <div style={{ position: "relative" }}>
                    <Smartphone size={15} color={C.muted} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                    <input type="tel" placeholder="+91 98765 43210" style={input} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
                  <ShieldCheck size={14} color={C.success} />
                  We'll send a 6-digit OTP. Standard SMS rates apply.
                </div>
              </>
            )}

            <button style={btnPrimary}>
              {tab === "email" ? "Sign in" : "Send OTP"}
              <ArrowRight size={16} />
            </button>
          </div>

          <p style={{ marginTop: 24, textAlign: "center", fontSize: 14, color: C.muted }}>
            New to ResQ Link?{" "}
            <a href="#" style={{ color: C.primary, fontWeight: 600, textDecoration: "none" }}>
              Create an account
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
