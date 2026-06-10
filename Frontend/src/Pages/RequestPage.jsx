import { useState } from "react";
import { Link } from "react-router-dom";



const categories = [
  { id: "medical", emoji: "❤️", label: "Medical" },
  { id: "blood", emoji: "🩸", label: "Blood" },
  { id: "transport", emoji: "🚚", label: "Transport" },
  { id: "medicine", emoji: "💊", label: "Medicine" },
  { id: "food", emoji: "🍱", label: "Food" },
  { id: "shelter", emoji: "🏠", label: "Shelter" },
];

const priorities = [
  { id: "low", label: "Low", activeStyle: { background: "#2d2d3a", color: "#e8e8f0", border: "1.5px solid #555" } },
  { id: "med", label: "Medium", activeStyle: { background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1.5px solid rgba(99,102,241,0.4)" } },
  { id: "high", label: "High", activeStyle: { background: "rgba(234,179,8,0.15)", color: "#fcd34d", border: "1.5px solid rgba(234,179,8,0.4)" } },
  { id: "critical", label: "Critical", activeStyle: { background: "#e53e3e", color: "#fff", border: "1.5px solid #e53e3e" } },
];

const responders = [
  { n: "Dr. Priya R.", t: "O- · Verified · 0.6 km", eta: "4 min", initials: "PR" },
  { n: "Apollo Blood Bank", t: "Open 24×7 · 1.1 km", eta: "8 min", initials: "AB" },
  { n: "Rahul M.", t: "O- · 1.4 km", eta: "9 min", initials: "RM" },
];

const hospitals = [
  "Apollo Hospital · 1.1 km · 24×7",
  "Civil Hospital · 2.4 km · ER open",
  "Fortis · 3.0 km · Trauma center",
];

export default function RequestPage() {
  const [cat, setCat] = useState("blood");
  const [pri, setPri] = useState("high");

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#0a0a0f", color: "#e8e8f0", minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .glass { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); }
        .glass-strong { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); }
        input, textarea {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          color: #e8e8f0;
          font-size: 14px;
          width: 100%;
          padding: 10px 14px;
          outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
        }
        input::placeholder, textarea::placeholder { color: rgba(232,232,240,0.3); }
        input:focus, textarea:focus { border-color: rgba(229,62,62,0.6); box-shadow: 0 0 0 3px rgba(229,62,62,0.1); }
        textarea { resize: vertical; }
        .cat-btn { transition: all 0.15s; cursor: pointer; }
        .cat-btn:hover { border-color: rgba(229,62,62,0.4) !important; }
        .pri-btn { transition: all 0.15s; cursor: pointer; }
        .pri-btn:hover { border-color: rgba(229,62,62,0.4) !important; }
        .hospital-row:hover { background: rgba(255,255,255,0.04); }
        .submit-btn { transition: opacity 0.2s, transform 0.1s; cursor: pointer; }
        .submit-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        @media (max-width: 900px) {
          .main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .loc-grid { grid-template-columns: 1fr !important; }
          .pri-grid { grid-template-columns: 1fr 1fr !important; }
          .cat-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .hero-section { padding: 20px 16px 0 !important; }
          .form-card { padding: 20px !important; }
        }
      `}</style>
      
      {/* PAGE HEADER */}
      <div className="hero-section" style={{ paddingTop: 88, paddingBottom: 0, maxWidth: 1100, margin: "0 auto", padding: "88px 24px 0" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.5, marginBottom: 6 }}>Request emergency help</h1>
        <p style={{ fontSize: 14, color: "rgba(232,232,240,0.5)" }}>Be specific. AI will match you with the closest verified responder.</p>
      </div>

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 60px" }}>
        <div className="main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24 }}>

          {/* FORM */}
          <div className="form-card glass-strong" style={{ borderRadius: 24, padding: 32 }}>

            {/* Category */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>What do you need?</label>
              <div className="cat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginTop: 12 }}>
                {categories.map(c => (
                  <button
                    type="button"
                    key={c.id}
                    className="cat-btn"
                    onClick={() => setCat(c.id)}
                    style={{
                      padding: "10px 6px",
                      borderRadius: 14,
                      border: cat === c.id ? "2px solid #e53e3e" : "1.5px solid rgba(255,255,255,0.1)",
                      background: cat === c.id ? "rgba(229,62,62,0.08)" : "rgba(255,255,255,0.03)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{c.emoji}</span>
                    <span style={{ fontSize: 11, fontWeight: 500, color: cat === c.id ? "#f56565" : "rgba(232,232,240,0.6)" }}>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Title</label>
              <input placeholder="O-negative blood needed for surgery" />
            </div>

            {/* Description */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600 }}>Describe the situation</label>
                <button type="button" style={{ fontSize: 12, color: "#a5b4fc", fontWeight: 500, display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer" }}>
                  🎤 Voice report
                </button>
              </div>
              <textarea rows={4} placeholder="Patient age, condition, exact need, when by..." style={{ padding: "12px 14px" }} />
            </div>

            {/* Priority */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 12 }}>Priority level</label>
              <div className="pri-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {priorities.map(p => (
                  <button
                    type="button"
                    key={p.id}
                    className="pri-btn"
                    onClick={() => setPri(p.id)}
                    style={{
                      padding: "10px 0",
                      borderRadius: 12,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      ...(pri === p.id
                        ? p.activeStyle
                        : { background: "rgba(255,255,255,0.03)", color: "rgba(232,232,240,0.5)", border: "1.5px solid rgba(255,255,255,0.1)" }),
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              {pri === "critical" && (
                <div style={{ marginTop: 12, display: "flex", alignItems: "flex-start", gap: 8, padding: 12, borderRadius: 12, background: "rgba(229,62,62,0.08)", border: "1px solid rgba(229,62,62,0.2)", fontSize: 12, color: "#f87171", lineHeight: 1.6 }}>
                  <span style={{ flexShrink: 0 }}>⚠️</span>
                  Critical requests are broadcast to all verified responders within 10 km and ping nearest hospitals.
                </div>
              )}
            </div>

            {/* Location & Contact */}
            <div className="loc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Location</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>📍</span>
                  <input placeholder="Detected via GPS · tap to change" style={{ paddingLeft: 34 }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Contact number</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>📞</span>
                  <input placeholder="+91 98765 43210" style={{ paddingLeft: 34 }} />
                </div>
              </div>
            </div>

            {/* Upload */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Attach photos (optional)</label>
              <div style={{ border: "2px dashed rgba(255,255,255,0.12)", borderRadius: 16, padding: "28px 20px", textAlign: "center", cursor: "pointer", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(229,62,62,0.4)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>📷</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>Drop images here or tap to upload</div>
                <div style={{ fontSize: 11, color: "rgba(232,232,240,0.4)", marginTop: 4 }}>Up to 5 images · 10MB each</div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              className="submit-btn"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #e53e3e, #c53030)",
                color: "#fff",
                border: "none",
                fontSize: 15,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              📤 Request Immediate Help
            </button>
          </div>

          {/* SIDEBAR */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* AI Match Preview */}
            <div className="glass-strong" style={{ borderRadius: 24, padding: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: 2, display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                ✨ AI MATCH PREVIEW
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.3, marginBottom: 16 }}>3 likely responders within 1.5 km</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {responders.map(r => (
                  <div key={r.n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #e53e3e, #9f7aea)", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                      {r.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.n}</div>
                      <div style={{ fontSize: 11, color: "rgba(232,232,240,0.45)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.t}</div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#4ade80", flexShrink: 0 }}>{r.eta}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Hospitals */}
            <div className="glass-strong" style={{ borderRadius: 24, padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Nearby hospitals</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {hospitals.map(h => (
                  <div
                    key={h}
                    className="hospital-row"
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 8px", borderRadius: 10, fontSize: 13, color: "rgba(232,232,240,0.7)", cursor: "pointer", transition: "background 0.15s" }}
                  >
                    <span style={{ fontSize: 13, flexShrink: 0 }}>📍</span>
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div style={{ padding: 20, borderRadius: 20, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#a5b4fc", marginBottom: 8 }}>💡 TIPS FOR FASTER MATCH</div>
              <ul style={{ fontSize: 12, color: "rgba(232,232,240,0.55)", lineHeight: 1.8, paddingLeft: 16 }}>
                <li>Include blood group if medical</li>
                <li>Mention quantity needed</li>
                <li>Enable GPS for precise location</li>
                <li>Add a contact number</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
