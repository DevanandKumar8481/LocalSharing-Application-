import { useState } from "react";

// CSS 
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --primary:       #E53935;
    --primary-fg:    #fff;
    --secondary:     #7C3AED;
    --success:       #16A34A;
    --warning:       #D97706;
    --bg:            #0F1117;
    --surface:       #161B27;
    --surface2:      #1E2535;
    --border:        rgba(255,255,255,0.08);
    --muted:         rgba(255,255,255,0.45);
    --fg:            #F1F5F9;
    --font-display:  'Space Grotesk', sans-serif;
    --font-body:     'Inter', sans-serif;
    --radius-sm:     10px;
    --radius-md:     16px;
    --radius-lg:     24px;
    --shadow-glass:  0 4px 32px rgba(0,0,0,0.45);
    --gradient-hero: linear-gradient(135deg,#E53935,#7C3AED);
    --gradient-emergency: linear-gradient(135deg,#E53935,#b91c1c);
  }

  body { background: var(--bg); color: var(--fg); font-family: var(--font-body); min-height: 100vh; }

  /* ── cover ── */
  .cover {
    height: 192px;
    width: 100%;
    background: linear-gradient(135deg, rgba(229,57,53,0.25) 0%, rgba(124,58,237,0.15) 60%, rgba(22,163,74,0.1) 100%);
    position: relative;
    overflow: hidden;
  }
  .cover::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 50%, rgba(229,57,53,0.2) 0%, transparent 65%);
  }

  /* ── shell ── */
  .shell { max-width: 1100px; margin: 0 auto; padding: 0 20px 60px; }

  /* ── card ── */
  .card {
    background: var(--surface);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-glass);
    overflow: hidden;
  }
  .card-body   { padding: 28px 28px 28px; }
  .card-header { padding: 20px 24px 0; }
  .card-content{ padding: 20px 24px 24px; }
  .card-title  { font-family: var(--font-display); font-size: 16px; font-weight: 700; margin-bottom: 16px; }

  /* ── profile header card ── */
  .header-card { margin-top: -80px; }

  /* ── avatar ── */
  .avatar {
    width: 112px; height: 112px;
    border-radius: 20px;
    border: 4px solid var(--surface);
    background: var(--gradient-hero);
    display: grid; place-items: center;
    font-size: 28px; font-weight: 700; color: #fff;
    flex-shrink: 0;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }

  /* ── header row ── */
  .profile-header { display: flex; flex-direction: column; gap: 20px; }
  @media(min-width:640px){
    .profile-header { flex-direction: row; align-items: flex-end; justify-content: space-between; }
  }
  .profile-left { display: flex; flex-direction: column; gap: 16px; }
  @media(min-width:640px){ .profile-left { flex-direction: row; align-items: flex-end; } }

  .profile-name-block { display: flex; flex-direction: column; gap: 4px; }
  .profile-name {
    display: flex; align-items: center; gap: 8px;
    font-family: var(--font-display);
    font-size: clamp(22px,4vw,30px); font-weight: 700;
  }
  .profile-role  { font-size: 13px; color: var(--muted); font-weight: 500; }
  .profile-meta  { display: flex; flex-wrap: wrap; gap: 12px; font-size: 12px; color: var(--muted); margin-top: 4px; }
  .profile-meta span { display: flex; align-items: center; gap: 4px; }

  /* ── bio ── */
  .bio { margin-top: 20px; font-size: 13px; line-height: 1.7; color: var(--muted); max-width: 720px; }

  /* ── badges ── */
  .badge-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
  .badge-pill {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 600;
    padding: 5px 11px; border-radius: 999px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    color: var(--fg);
  }

  /* ── action buttons ── */
  .btn-row { display: flex; gap: 8px; flex-shrink: 0; }
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    padding: 0 16px; height: 40px; border-radius: var(--radius-sm);
    font-size: 13px; font-weight: 600;
    border: none; cursor: pointer;
    transition: opacity .15s, transform .1s;
  }
  .btn:hover   { opacity: .85; }
  .btn:active  { transform: scale(.97); }
  .btn-outline { background: transparent; border: 1px solid var(--border); color: var(--fg); }
  .btn-primary { background: var(--gradient-emergency); color: #fff; box-shadow: 0 2px 14px rgba(229,57,53,0.35); }

  /* ── stats grid ── */
  .stats-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; margin-top: 24px; }
  @media(min-width:768px){ .stats-grid { grid-template-columns: repeat(4,1fr); } }

  .stat-card { padding: 20px; }
  .stat-icon-row { display: flex; align-items: center; gap: 8px; color: var(--muted); }
  .stat-icon-row span { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; }
  .stat-val { font-size: 28px; font-weight: 700; margin-top: 10px; }

  /* ── details grid ── */
  .details-grid { display: grid; gap: 20px; margin-top: 20px; }
  @media(min-width:900px){ .details-grid { grid-template-columns: 2fr 1fr; } }

  /* ── detail row ── */
  .detail-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .detail-left { display: flex; align-items: center; gap: 12px; color: var(--muted); }
  .detail-icon-wrap {
    width: 36px; height: 36px; border-radius: 10px;
    background: rgba(255,255,255,0.06);
    display: grid; place-items: center; flex-shrink: 0;
  }
  .detail-label { font-size: 13px; font-weight: 500; }
  .detail-val   { font-size: 13px; color: var(--fg); }
  .separator    { height: 1px; background: var(--border); margin: 4px 0; }

  /* ── activity ── */
  .activity-item { display: flex; align-items: flex-start; gap: 12px; }
  .activity-dot  { width: 8px; height: 8px; border-radius: 50%; background: var(--primary); flex-shrink: 0; margin-top: 6px; }
  .activity-text { font-size: 13px; }
  .activity-time { font-size: 11px; color: var(--muted); margin-top: 2px; }
`;

// icons 
const I = {
  Mail: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Phone: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.07 3.4 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z"/></svg>,
  MapPin: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  MapPinMd: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  CalendarMd: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  Shield: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  ShieldMd: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Heart: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
  Activity: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Award: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
  Pencil: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>,
  BadgeCheck: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>,
};

// data 
const user = {
  name: "Aarav Sharma",
  role: "Verified Volunteer Responder",
  email: "aarav.sharma@resqlink.in",
  phone: "+91 98765 43210",
  location: "Sector 22, New Delhi",
  joined: "March 2025",
  bio: "First-responder volunteer focused on blood logistics and emergency transport coordination across NCR. Available 24/7 for high-priority alerts.",
  initials: "AS",
  stats: {
    requestsHelped: 142,
    livesImpacted: 318,
    avgResponse: "47s",
    rating: "4.9",
  },
  badges: ["Aadhaar Verified", "Background Checked", "CPR Certified", "Top Responder"],
};

const activity = [
  { t: "Delivered blood unit · Sector 22", time: "2h ago" },
  { t: "Accepted transport request #4821", time: "Yesterday" },
  { t: "Verified shelter availability", time: "3d ago" },
];

// sub-components 
function StatCard({ Icon, label, value }) {
  return (
    <div className="card stat-card">
      <div className="stat-icon-row">
        <Icon />
        <span>{label}</span>
      </div>
      <div className="stat-val">{value}</div>
    </div>
  );
}

function DetailRow({ Icon, label, value }) {
  return (
    <div className="detail-row">
      <div className="detail-left">
        <div className="detail-icon-wrap"><Icon /></div>
        <span className="detail-label">{label}</span>
      </div>
      <span className="detail-val">{value}</span>
    </div>
  );
}

// main 
export default function ProfilePage() {
  return (
    <>
      <style>{CSS}</style>

      {/* Cover banner */}
      <div className="cover" />

      <div className="shell">
        {/* ── Header card ── */}
        <div className="card header-card">
          <div className="card-body">
            <div className="profile-header">
              <div className="profile-left">
                <div className="avatar">{user.initials}</div>
                <div className="profile-name-block">
                  <div className="profile-name">
                    {user.name}
                    <I.BadgeCheck />
                  </div>
                  <div className="profile-role">{user.role}</div>
                  <div className="profile-meta">
                    <span><I.MapPin /> {user.location}</span>
                    <span><I.Calendar /> Joined {user.joined}</span>
                  </div>
                </div>
              </div>
              <div className="btn-row">
                <button className="btn btn-outline"><I.Pencil /> Edit Profile</button>
                <button className="btn btn-primary">View Dashboard</button>
              </div>
            </div>

            <p className="bio">{user.bio}</p>

            <div className="badge-row">
              {user.badges.map((b) => (
                <span key={b} className="badge-pill">
                  <I.Shield /> {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="stats-grid">
          <StatCard Icon={I.Heart}    label="Requests Helped" value={user.stats.requestsHelped} />
          <StatCard Icon={I.Activity} label="Lives Impacted"  value={user.stats.livesImpacted} />
          <StatCard Icon={I.Award}    label="Avg Response"    value={user.stats.avgResponse} />
          <StatCard Icon={I.ShieldMd} label="Rating"          value={user.stats.rating} />
        </div>

        {/* ── Details grid ── */}
        <div className="details-grid">
          {/* Contact details */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Contact Details</div>
            </div>
            <div className="card-content" style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <DetailRow Icon={I.Mail}       label="Email"        value={user.email} />
              <div className="separator" />
              <DetailRow Icon={I.Phone}      label="Phone"        value={user.phone} />
              <div className="separator" />
              <DetailRow Icon={I.MapPinMd}   label="Service Area" value={user.location} />
              <div className="separator" />
              <DetailRow Icon={I.CalendarMd} label="Member Since" value={user.joined} />
            </div>
          </div>

          {/* Recent activity */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Recent Activity</div>
            </div>
            <div className="card-content" style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {activity.map((a) => (
                <div key={a.t} className="activity-item">
                  <div className="activity-dot" />
                  <div>
                    <div className="activity-text">{a.t}</div>
                    <div className="activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}