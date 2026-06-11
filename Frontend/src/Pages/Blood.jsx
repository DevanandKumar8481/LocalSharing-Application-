import { useState } from "react";
import {
  Droplet, Search, MapPin, Clock, Star, AlertTriangle,
  ChevronRight, Info, Phone, Navigation,
  TrendingUp, TrendingDown, Minus,
} from "lucide-react";

//Tokens 
const C = {
  primary:  "#E5383B",
  success:  "#22c55e",
  warning:  "#f59e0b",
  bg:       "#f8f9fc",
  card:     "#ffffff",
  border:   "#e8eaed",
  text:     "#111827",
  muted:    "#6b7280",
  accent:   "#E5383B",
  accentBg: "#fde8e8",
  gradient: "linear-gradient(135deg,#E5383B 0%,#c53030 100%)",
};

//  CSS 
if (typeof document !== "undefined" && !document.getElementById("blood-avail-styles")) {
  const s = document.createElement("style");
  s.id = "blood-avail-styles";
  s.textContent = `
    @keyframes pulse-ring {
      0%   { transform:scale(1);   opacity:.55; }
      100% { transform:scale(1.8); opacity:0;   }
    }
    .bl-item:hover { box-shadow:0 8px 28px rgba(0,0,0,.1); transform:translateY(-2px); }
    .bl-item       { transition:box-shadow .2s,transform .2s; }
    .bl-chip:hover { opacity:.85; }
    .bl-chip       { transition:opacity .15s,background .15s,color .15s; cursor:pointer; }
    .bl-tip:hover  { box-shadow:0 4px 14px rgba(0,0,0,.07); }
    .bl-tip        { transition:box-shadow .18s; }
    .bl-btn:hover  { opacity:.85; }
    .bl-btn        { transition:opacity .15s; }
  `;
  document.head.appendChild(s);
}

// Data 
const FILTER_CHIPS = ["O-", "O+", "A+", "B+", "AB-", "Plasma"];

const STATS = [
  { label: "Donors online",   value: "248", tone: "ok"  },
  { label: "Critical groups", value: "2",   tone: "bad" },
  { label: "Active drives",   value: "6",   tone: null  },
  { label: "Units today",     value: "84",  tone: "ok"  },
];

const ITEMS = [
  { name: "Rahul Mehta",          meta: "Connaught Place · Last donated 47 days ago",  distanceKm: 0.8, available: 1,   unit: "unit",  rating: 4.9, verified: true, status: "live", tags: ["O-","Plasma"], eta: "12 min" },
  { name: "Red Cross Blood Bank", meta: "Karol Bagh · 24×7 collection centre",          distanceKm: 1.4, available: 142, capacity: 200, unit: "units", rating: 4.8, verified: true, status: "live", tags: ["O+","A+","B+"] },
  { name: "Sara Khan",            meta: "Karol Bagh · Repeat donor (8×)",               distanceKm: 1.6, available: 1,   unit: "unit",  rating: 5.0, verified: true, status: "live", tags: ["A+"], eta: "18 min" },
  { name: "Apollo Blood Centre",  meta: "Saket · Low O- stock alert",                   distanceKm: 4.2, available: 6,   capacity: 80,  unit: "units", rating: 4.7, verified: true, status: "low",  tags: ["O-","AB-"] },
  { name: "Vikram Iyer",          meta: "South Ext · Donated 3 months ago",             distanceKm: 2.1, available: 1,   unit: "unit",  rating: 4.6, verified: true, status: "live", tags: ["B+"], eta: "22 min" },
];

const TIPS = [
  { title: "Donate every 90 days", body: "Whole blood donors can give once every 3 months." },
  { title: "Plasma in 7 days",     body: "Plasma replenishes within a week — safer for frequent giving." },
  { title: "Bring an ID",          body: "Aadhaar or government photo ID is required at all centres." },
];

// Helpers 
const STATUS_CFG = {
  live: { dot: "#22c55e", label: "Live",      bg: "#dcfce7", color: "#22c55e" },
  low:  { dot: "#f59e0b", label: "Low stock", bg: "#fef3c7", color: "#f59e0b" },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || STATUS_CFG.live;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:5,
      fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:99,
      background:cfg.bg, color:cfg.color,
    }}>
      <span style={{
        width:6, height:6, borderRadius:"50%", background:cfg.dot, display:"inline-block",
        ...(status==="live" ? { animation:"pulse-ring 1.6s ease-out infinite" } : {}),
      }} />
      {cfg.label}
    </span>
  );
}

function CapacityBar({ available, capacity }) {
  if (!capacity) return null;
  const pct = Math.min(100, Math.round((available / capacity) * 100));
  const color = pct < 25 ? C.warning : C.accent;
  return (
    <div style={{ marginTop:8 }}>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4 }}>
        <span style={{ color:C.muted }}>{available} / {capacity}</span>
        <span style={{ fontWeight:700, color }}>{pct}%</span>
      </div>
      <div style={{ height:5, borderRadius:99, background:C.border, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:99 }} />
      </div>
    </div>
  );
}

function StatTone({ tone }) {
  if (tone === "ok")  return <TrendingUp  size={13} color={C.success} />;
  if (tone === "bad") return <TrendingDown size={13} color={C.primary} />;
  return <Minus size={13} color={C.muted} />;
}

const card = (extra = {}) => ({
  background: C.card, border:`1px solid ${C.border}`,
  borderRadius:20, padding:24,
  boxShadow:"0 2px 12px rgba(0,0,0,.05)", ...extra,
});

//  Component 
export default function Blood() {
  const [search, setSearch]     = useState("");
  const [activeChips, setChips] = useState([]);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 900;

  function toggleChip(c) {
    setChips(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  }

  const filtered = ITEMS.filter(item => {
    const q = search.toLowerCase();
    const matchSearch = item.name.toLowerCase().includes(q) || item.meta.toLowerCase().includes(q);
    const matchChips  = activeChips.length === 0 || activeChips.every(c => item.tags.includes(c));
    return matchSearch && matchChips;
  });

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Inter','Segoe UI',sans-serif", color:C.text }}>

      {/* Header */}
      <header style={{
        background:C.card, borderBottom:`1px solid ${C.border}`,
        padding:"0 24px", height:64,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        position:"sticky", top:0, zIndex:10,
        boxShadow:"0 1px 6px rgba(0,0,0,.04)",
      }}>
        <div style={{
          fontWeight:800, fontSize:20,
          background:C.gradient,
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          backgroundClip:"text", letterSpacing:"-0.5px",
        }}>ResQ Link</div>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:6,
          fontSize:12, fontWeight:600, color:C.success,
          background:"#dcfce7", padding:"5px 12px", borderRadius:99,
        }}>
          <span style={{
            width:7, height:7, borderRadius:"50%", background:C.success,
            display:"inline-block", animation:"pulse-ring 1.6s ease-out infinite",
          }} />
          248 donors online
        </div>
      </header>

      <main style={{ maxWidth:1200, margin:"0 auto", padding:"28px 20px 56px" }}>

        {/* Title */}
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:6 }}>
          <div style={{ width:50, height:50, borderRadius:14, background:C.accentBg, display:"grid", placeItems:"center" }}>
            <Droplet size={22} color={C.accent} />
          </div>
          <div>
            <h1 style={{ fontSize:26, fontWeight:800, letterSpacing:"-0.5px", margin:0 }}>Live Blood Donors</h1>
            <p style={{ fontSize:13, color:C.muted, margin:"2px 0 0" }}>Verified donors and blood-bank stock updated every 30 seconds.</p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:12, margin:"20px 0" }}>
          {STATS.map(s => (
            <div key={s.label} style={card({ padding:"16px 18px" })}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                <span style={{ fontSize:11, color:C.muted }}>{s.label}</span>
                <StatTone tone={s.tone} />
              </div>
              <div style={{ fontSize:24, fontWeight:800 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Critical banner */}
        <div style={{
          borderRadius:20, padding:"18px 22px", marginBottom:20,
          background:"linear-gradient(to right,#fde8e8,#fff7ed)",
          border:`1px solid ${C.accent}40`,
          display:"flex", alignItems:"center", gap:16, flexWrap:"wrap",
        }}>
          <div style={{ width:44, height:44, borderRadius:12, background:C.accent, display:"grid", placeItems:"center", flexShrink:0 }}>
            <AlertTriangle size={20} color="#fff" />
          </div>
          <div style={{ flex:1, minWidth:220 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.accent, letterSpacing:.5 }}>CRITICAL · RIGHT NOW</div>
            <div style={{ fontSize:16, fontWeight:800, marginTop:2 }}>O- needed for trauma surgery — Apollo Hospital, 1.1 km</div>
            <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>Patient: 34F · 2 units by 9 PM</div>
          </div>
          <button className="bl-btn" style={{
            padding:"10px 20px", borderRadius:10, border:"none",
            background:C.gradient, color:"#fff",
            fontWeight:700, fontSize:14, cursor:"pointer",
            boxShadow:`0 4px 14px ${C.accent}55`, flexShrink:0,
          }}>I can donate</button>
        </div>

        {/* Search + Chips */}
        <div style={card({ marginBottom:20 })}>
          <div style={{ position:"relative", marginBottom:14 }}>
            <Search size={15} color={C.muted} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search donor name, hospital or group…"
              style={{
                width:"100%", height:44, padding:"0 12px 0 36px",
                borderRadius:11, border:`1.5px solid ${C.border}`,
                fontSize:14, color:C.text, background:C.bg,
                outline:"none", boxSizing:"border-box",
              }}
            />
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {FILTER_CHIPS.map(chip => {
              const on = activeChips.includes(chip);
              return (
                <button key={chip} className="bl-chip" onClick={() => toggleChip(chip)} style={{
                  padding:"6px 14px", borderRadius:99, fontSize:13, fontWeight:600,
                  border:`1.5px solid ${on ? C.accent : C.border}`,
                  background: on ? C.accent : C.card,
                  color: on ? "#fff" : C.text,
                }}>{chip}</button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"2fr 1fr", gap:16, alignItems:"start" }}>

          {/* Items */}
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ fontSize:13, color:C.muted, marginBottom:4 }}>{filtered.length} results · sorted by distance</div>
            {filtered.length === 0 && (
              <div style={card({ textAlign:"center", padding:40, color:C.muted })}>No results match your filters.</div>
            )}
            {filtered.map((item, i) => (
              <div key={i} className="bl-item" style={card()}>
                <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                  <div style={{ width:48, height:48, borderRadius:14, background:C.accentBg, display:"grid", placeItems:"center", flexShrink:0 }}>
                    <Droplet size={20} color={C.accent} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                      <span style={{ fontWeight:700, fontSize:15 }}>{item.name}</span>
                      {item.verified && (
                        <span style={{ fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:6, background:"#dcfce7", color:C.success }}>✓ Verified</span>
                      )}
                      <StatusBadge status={item.status} />
                    </div>
                    <div style={{ fontSize:12, color:C.muted, marginTop:3 }}>{item.meta}</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:8 }}>
                      {item.tags.map(t => (
                        <span key={t} style={{ fontSize:11, fontWeight:600, padding:"2px 9px", borderRadius:99, background:C.accentBg, color:C.accent }}>{t}</span>
                      ))}
                    </div>
                    <CapacityBar available={item.available} capacity={item.capacity} />
                    <div style={{ display:"flex", flexWrap:"wrap", gap:14, marginTop:10, fontSize:12, color:C.muted }}>
                      <span style={{ display:"flex", alignItems:"center", gap:4 }}><MapPin size={11} /> {item.distanceKm} km</span>
                      {item.eta && <span style={{ display:"flex", alignItems:"center", gap:4 }}><Clock size={11} /> {item.eta}</span>}
                      <span style={{ display:"flex", alignItems:"center", gap:4 }}><Star size={11} color={C.warning} fill={C.warning} /> {item.rating}</span>
                      <span style={{ fontWeight:600, color:C.accent }}>{item.available} {item.unit}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, marginTop:14, flexWrap:"wrap" }}>
                  <button className="bl-btn" style={{ flex:1, padding:"9px 0", borderRadius:9, border:`1.5px solid ${C.border}`, background:"transparent", fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}><Phone size={13} /> Contact</button>
                  <button className="bl-btn" style={{ flex:1, padding:"9px 0", borderRadius:9, border:`1.5px solid ${C.border}`, background:"transparent", fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}><Navigation size={13} /> Directions</button>
                  <button className="bl-btn" style={{ flex:2, padding:"9px 0", borderRadius:9, border:"none", background:C.gradient, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:5, boxShadow:`0 4px 12px ${C.accent}40` }}>
                    Request donor <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right rail */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={card()}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:14 }}>
                <Info size={16} color={C.accent} />
                <span style={{ fontWeight:800, fontSize:15 }}>Tips & guidelines</span>
              </div>
              {TIPS.map(tip => (
                <div key={tip.title} className="bl-tip" style={{ padding:"12px 14px", borderRadius:12, background:C.bg, border:`1px solid ${C.border}`, marginBottom:10 }}>
                  <div style={{ fontSize:13, fontWeight:700, marginBottom:4 }}>{tip.title}</div>
                  <div style={{ fontSize:12, color:C.muted, lineHeight:1.6 }}>{tip.body}</div>
                </div>
              ))}
            </div>
            <div style={card({ background:C.accentBg, border:`1px solid ${C.accent}30` })}>
              <Droplet size={26} color={C.accent} />
              <h3 style={{ fontSize:16, fontWeight:800, margin:"10px 0 6px" }}>Be a blood donor</h3>
              <p style={{ fontSize:12, color:C.muted, lineHeight:1.6, margin:"0 0 14px" }}>
                Register once. Get notified only for critical requests near you that match your blood group.
              </p>
              <button className="bl-btn" style={{ width:"100%", padding:"11px 0", borderRadius:10, border:"none", background:C.gradient, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer" }}>
                Register as donor
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}