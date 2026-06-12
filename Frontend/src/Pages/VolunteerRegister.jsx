import { useState } from "react";

// ─── Design tokens ───────────────────────────────────────────────
const COLOR = {
  primary: "#E5383B",
  primaryLight: "rgba(229,56,59,0.10)",
  bg: "#0a0a0f",
  card: "rgba(255,255,255,.05)",
  border: "rgba(255,255,255,.18)",
  text: "#e8e8f0",
  muted: "#6b7280",
  destructive: "#ef4444",
  success: "#22c55e",
  gradHero: "linear-gradient(135deg, #E5383B 0%, #a21caf 100%)",
};

// ─── Inject global CSS once ──────────────────────────────────────
if (typeof document !== "undefined" && !document.getElementById("vr-global")) {
  const s = document.createElement("style");
  s.id = "vr-global";
  s.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: #0a0a0f; font-family: 'Inter', 'Segoe UI', sans-serif; color: #e8e8f0; }
    input::placeholder, textarea::placeholder { color: rgba(232,232,240,0.35); }
    input:focus, select:focus { outline: none; }
    select option { background: #0a0a0f; color: #e8e8f0; }
  `;
  document.head.appendChild(s);
}

// ─── Constants ───────────────────────────────────────────────────
const AVAILABILITY_OPTIONS = ["Always", "Weekdays", "Weekends", "On Call"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// ─── Simple validation ───────────────────────────────────────────
function validate(form, availability) {
  const errs = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errs.name = "Name must be at least 2 characters.";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errs.email = "Enter a valid email address.";
  if (!form.mobile.trim() || !/^[0-9+\-\s()]{7,20}$/.test(form.mobile.trim()))
    errs.mobile = "Enter a valid mobile number.";
  if (!form.skills.trim() || form.skills.trim().length < 2)
    errs.skills = "Please list at least one skill.";
  if (!form.location.trim() || form.location.trim().length < 2)
    errs.location = "Location is required.";
  if (availability.length === 0)
    errs.availability = "Select at least one availability option.";
  return errs;
}

// ─── Sub-components ──────────────────────────────────────────────

function FieldWrapper({ children }) {
  return <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>;
}

function Label({ icon: Icon, children }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 14,
        fontWeight: 600,
        marginBottom: 8,
        color: COLOR.text,
      }}
    >
      {Icon && <Icon size={16} color={COLOR.primary} />}
      {children}
    </label>
  );
}

function ErrorMsg({ msg }) {
  if (!msg) return null;
  return (
    <p style={{ color: COLOR.destructive, fontSize: 12, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
      ⚠ {msg}
    </p>
  );
}

function TextInput({ value, onChange, placeholder, type = "text", hasError, maxLength }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%",
        padding: "12px 14px",
        background: COLOR.bg,
        border: `1.5px solid ${hasError ? COLOR.destructive : focused ? COLOR.primary : COLOR.border}`,
        borderRadius: 10,
        color: COLOR.text,
        fontSize: 14,
        fontFamily: "inherit",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: focused ? `0 0 0 3px rgba(229,56,59,0.12)` : "none",
      }}
    />
  );
}

function SelectInput({ value, onChange, children }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%",
        padding: "12px 14px",
        background: COLOR.bg,
        border: `1.5px solid ${focused ? COLOR.primary : COLOR.border}`,
        borderRadius: 10,
        color: COLOR.text,
        fontSize: 14,
        fontFamily: "inherit",
        cursor: "pointer",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: focused ? `0 0 0 3px rgba(229,56,59,0.12)` : "none",
      }}
    >
      {children}
    </select>
  );
}

function AvailabilityCheckbox({ option, checked, onToggle }) {
  return (
    <div
      onClick={() => onToggle(option)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 14px",
        background: checked ? COLOR.primaryLight : COLOR.bg,
        border: `1.5px solid ${checked ? COLOR.primary : COLOR.border}`,
        borderRadius: 10,
        cursor: "pointer",
        transition: "all 0.2s",
        fontSize: 14,
        color: COLOR.text,
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: 5,
          border: `2px solid ${checked ? COLOR.primary : COLOR.border}`,
          background: checked ? COLOR.primary : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.2s",
        }}
      >
        {checked && <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, lineHeight: 1 }}>✓</span>}
      </div>
      {option}
    </div>
  );
}

// ─── Icon components (inline SVG so no extra deps needed) ─────────
function UserIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function MailIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function PhoneIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function BriefcaseIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
function MapPinIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function DropletIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}
function ClockIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// ─── Main Component ──────────────────────────────────────────────
export default function VolunteerRegistration() {
  const [form, setForm] = useState({
    name: "", email: "", mobile: "", skills: "", location: "", bloodGroup: "",
  });
  const [availability, setAvailability] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  const toggleAvailability = (option) => {
    setAvailability((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
    setErrors((e) => { const n = { ...e }; delete n.availability; return n; });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form, availability);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
    setForm({ name: "", email: "", mobile: "", skills: "", location: "", bloodGroup: "" });
    setAvailability([]);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleReset = () => {
    setForm({ name: "", email: "", mobile: "", skills: "", location: "", bloodGroup: "" });
    setAvailability([]);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLOR.bg,
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        color: COLOR.text,
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: 40 }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "-0.5px",
              marginBottom: 10,
              background: COLOR.gradHero,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Volunteer Registration
          </h1>
          <p style={{ fontSize: 14, color: COLOR.muted }}>
            Join our community of heroes. Share your skills and help us make a difference.
          </p>
        </header>

        {/* Success banner */}
        {submitted && (
          <div
            style={{
              background: "rgba(34,197,94,0.10)",
              border: `1.5px solid ${COLOR.success}`,
              borderRadius: 12,
              padding: "14px 18px",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: COLOR.success,
              fontSize: 14,
            }}
          >
            ✓ Thank you for registering! We'll be in touch soon.
          </div>
        )}

        {/* Form card */}
        <div
          style={{
            background: COLOR.card,
            border: `1px solid ${COLOR.border}`,
            borderRadius: 20,
            padding: "32px 28px",
          }}
        >
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Your Details</h2>
            <p style={{ fontSize: 13, color: COLOR.muted }}>
              All fields required unless marked optional.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Full Name */}
              <FieldWrapper>
                <Label icon={UserIcon}>Full Name</Label>
                <TextInput
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  placeholder="Jane Doe"
                  maxLength={100}
                  hasError={!!errors.name}
                />
                <ErrorMsg msg={errors.name} />
              </FieldWrapper>

              {/* Email */}
              <FieldWrapper>
                <Label icon={MailIcon}>Email Address</Label>
                <TextInput
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  placeholder="jane@example.com"
                  maxLength={255}
                  hasError={!!errors.email}
                />
                <ErrorMsg msg={errors.email} />
              </FieldWrapper>

              {/* Mobile */}
              <FieldWrapper>
                <Label icon={PhoneIcon}>Mobile Number</Label>
                <TextInput
                  type="tel"
                  value={form.mobile}
                  onChange={(v) => update("mobile", v)}
                  placeholder="+91 98765 43210"
                  maxLength={20}
                  hasError={!!errors.mobile}
                />
                <ErrorMsg msg={errors.mobile} />
              </FieldWrapper>

              {/* Skills */}
              <FieldWrapper>
                <Label icon={BriefcaseIcon}>Skills &amp; Expertise</Label>
                <TextInput
                  value={form.skills}
                  onChange={(v) => update("skills", v)}
                  placeholder="e.g. First aid, teaching, driving"
                  maxLength={500}
                  hasError={!!errors.skills}
                />
                <ErrorMsg msg={errors.skills} />
              </FieldWrapper>

              {/* Location */}
              <FieldWrapper>
                <Label icon={MapPinIcon}>Location</Label>
                <TextInput
                  value={form.location}
                  onChange={(v) => update("location", v)}
                  placeholder="City, Country"
                  maxLength={200}
                  hasError={!!errors.location}
                />
                <ErrorMsg msg={errors.location} />
              </FieldWrapper>

              {/* Availability */}
              <FieldWrapper>
                <Label icon={ClockIcon}>When are you available?</Label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    marginTop: 4,
                  }}
                >
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <AvailabilityCheckbox
                      key={opt}
                      option={opt}
                      checked={availability.includes(opt)}
                      onToggle={toggleAvailability}
                    />
                  ))}
                </div>
                <ErrorMsg msg={errors.availability} />
              </FieldWrapper>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  background: COLOR.gradHero,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "opacity 0.2s, transform 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                Register as Volunteer
              </button>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  background: "transparent",
                  color: COLOR.text,
                  border: `1.5px solid ${COLOR.border}`,
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}