import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


// --- CUSTOM SVG ICONS (Keeps it zero-dependency) ---
const SirenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.5 1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-1 0V1zm5.5 3.5a.5.5 0 0 1 .707 0l.707.707a.5.5 0 0 1-.707.707L17 5.914a.5.5 0 0 1 0-.707zm-11 0a.5.5 0 0 1 .707.707L5.914 6a.5.5 0 0 1-.707-.707L5.707 4.5a.5.5 0 0 1 0-.707zM12 5a5 5 0 0 1 5 5v3H7v-3a5 5 0 0 1 5-5zm-7 9h14v2H5v-2zm1 3h12l1 3H4l1-3z" />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14m-7-7 7 7-7 7" />
  </svg>
);

// --- STATIC ROLES DATA ---
const ROLES = [
  { id: "requester", title: "I need help", desc: "Request emergency resources" },
  { id: "volunteer", title: "I want to help", desc: "Respond to nearby tasks" },
  { id: "provider", title: "Resource provider", desc: "List blood, food, transport" },
  { id: "ngo", title: "NGO / Authority", desc: "Coordinate at scale" },
];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("volunteer");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emergencyPhone: "",
    location: "",
    password: ""
  });

  // OTP State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);

  // Handle inputs dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // OTP core functionality (Auto-focus shifts)
  const handleOtpChange = (index, value) => {
    const cleanValue = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = cleanValue;
    setOtp(newOtp);

    if (cleanValue && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard"); // or "/loginpage"
  };

  return (
    <>
      <style>{styles}</style>
      <div className="main_container">

        {/* Navbar */}
        <header className="resq-header">
          <Link to="/" className="resq-logo">
            <span className="resq-logo-icon"><SirenIcon /></span>
            <span className="resq-logo-text">ResQ<span>Link</span></span>
          </Link>
          <Link href="/login" className="resq-header-link">
            Already a member? <span>Sign in</span>
          </Link>
        </header>

        <div className="resq-main">
          {/* Progress Tracker */}
          <div className="resq-stepper">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className={`resq-step-node ${step >= num ? "active" : "inactive"}`}>
                  {step > num ? <CheckIcon /> : num}
                </div>
                {num < 3 && <div className={`resq-step-line ${step > num ? "done" : "pending"}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* Form Wizard Container */}
          <div className="resq-card">

            {/* STEP 1: Choose Profile Role */}
            {step === 1 && (
              <div>
                <h1>Pick your role</h1>
                <p>You can change or add roles later from settings.</p>
                <div className="role-grid">
                  {ROLES.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      className={`role-card ${selectedRole === role.id ? "selected" : ""}`}
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div className="role-title">{role.title}</div>
                      <div className="role-desc">{role.desc}</div>
                    </button>
                  ))}
                </div>
                <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
                  Continue <ArrowRight />
                </button>
              </div>
            )}

            {/* STEP 2: Main Identity Details */}
            {step === 2 && (
              <div>
                <h1>Tell us about you</h1>
                <p>We use this to match you with the closest verified people.</p>
                <div className="field-grid">
                  <label>
                    <span className="field-label">Full name</span>
                    <input className="field-input" name="name" placeholder="Aarav Sharma" value={formData.name} onChange={handleInputChange} />
                  </label>
                  <label>
                    <span className="field-label">Email</span>
                    <input className="field-input" type="email" name="email" placeholder="you@email.com" value={formData.email} onChange={handleInputChange} />
                  </label>
                  <label>
                    <span className="field-label">Mobile</span>
                    <input className="field-input" type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange} />
                  </label>
                  <label>
                    <span className="field-label">Emergency contact</span>
                    <input className="field-input" type="tel" name="emergencyPhone" placeholder="+91 98765 43210" value={formData.emergencyPhone} onChange={handleInputChange} />
                  </label>
                  <label className="full">
                    <span className="field-label">Location</span>
                    <input className="field-input" name="location" placeholder="Detect via GPS or type city" value={formData.location} onChange={handleInputChange} />
                  </label>
                  <label className="full">
                    <span className="field-label">Password</span>
                    <input className="field-input" type="password" name="password" placeholder="Min. 8 characters" value={formData.password} onChange={handleInputChange} />
                  </label>
                </div>
                <div className="btn-row">
                  <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>
                    Continue <ArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Security Verification */}
            {step === 3 && (
              <div>
                <h1>Verify your phone</h1>
                <p>We sent a 6-digit code to your mobile. Enter it below.</p>

                <div className="otp-row">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      className="otp-box"
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    />
                  ))}
                </div>

                <p className="otp-note">
                  Didn't get it? <button type="button" className="resq-resend">Resend in 32s</button>
                </p>

                <div className="btn-row">
                  <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    Verify &amp; Enter <ArrowRight />
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="resq-note">
            By continuing you agree to our Terms and Privacy Policy.
            Verification is optional and only used for badge issuance.
          </p>
        </div>
      </div>
    </>
  );
}

// --- CLEANED DESKTOP-FIRST & MOBILE RESPONSIVE CSS ---
const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f0f13; }

  .main_container { min-height: 100vh; color: #f1f1f3; padding-bottom: 2rem; }
  .resq-header { max-width: 72rem; margin: 0 auto; padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; }
  .resq-logo { display: flex; align-items: center; gap: .5rem; text-decoration: none; color: inherit; }
  .resq-logo-icon { width: 2.25rem; height: 2.25rem; border-radius: .75rem; background: #ef4444; display: grid; place-items: center; color: #fff; }
  .resq-logo-text { font-size: 1.125rem; font-weight: 700; }
  .resq-logo-text span { color: #ef4444; }
  .resq-header-link { font-size: .875rem; color: #9ca3af; text-decoration: none; }
  .resq-header-link span { color: #ef4444; font-weight: 600; }

  .resq-main { max-width: 48rem; margin: 0 auto; padding: 1.5rem; }

  .resq-stepper { display: flex; align-items: center; justify-content: center; gap: .5rem; margin-bottom: 2rem; }
  .resq-step-node { width: 2rem; height: 2rem; border-radius: 50%; display: grid; place-items: center; font-size: .75rem; font-weight: 600; }
  .resq-step-node.active { background: #ef4444; color: #fff; }
  .resq-step-node.inactive { background: #27272a; color: #71717a; }
  .resq-step-line { width: 3rem; height: 2px; }
  .resq-step-line.done { background: #ef4444; }
  .resq-step-line.pending { background: #3f3f46; }

  .resq-card { background: #18181b; border: 1px solid #27272a; border-radius: 1rem; padding: 2rem; }
  .resq-card h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem; }
  .resq-card p { font-size: .875rem; color: #9ca3af; margin-bottom: 1.5rem; }

  .role-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: .75rem; margin-bottom: 1.5rem; }
  .role-card { text-align: left; padding: 1.25rem; border-radius: .75rem; border: 1px solid #27272a; background: #212124; color: #fff; cursor: pointer; }
  .role-card.selected { border-color: #ef4444; background: rgba(239,68,68,.05); }
  .role-title { font-weight: 600; font-size: .95rem; }
  .role-desc { font-size: .75rem; color: #9ca3af; margin-top: .25rem; }

  .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
  @media (max-width: 600px) { .field-grid { grid-template-columns: 1fr; } }
  .field-grid .full { grid-column: 1 / -1; }
  .field-label { display: block; font-size: .75rem; font-weight: 500; color: #9ca3af; margin-bottom: .375rem; }
  .field-input { width: 100%; height: 2.75rem; padding: 0 .75rem; background: #212124; border: 1px solid #27272a; border-radius: .5rem; color: #fff; outline: none; }
  .field-input:focus { border-color: #ef4444; }

  .otp-row { display: flex; justify-content: center; gap: .5rem; margin: 2rem 0; }
  .otp-box { width: 3rem; height: 3.5rem; text-align: center; font-size: 1.5rem; font-weight: 700; background: #212124; border: 1px solid #27272a; border-radius: .5rem; color: #fff; outline: none; }
  .otp-box:focus { border-color: #ef4444; }

  .btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; height: 2.75rem; padding: 0 1.5rem; border-radius: .5rem; font-size: .9rem; font-weight: 600; cursor: pointer; border: none; }
  .btn-primary { background: #ef4444; color: #fff; width: 100%; }
  .btn-outline { background: transparent; border: 1px solid #27272a; color: #d4d4d8; }
  .btn-row { display: flex; gap: .75rem; }
  .btn-row .btn { flex: 1; }

  .resq-note { margin-top: 1.5rem; text-align: center; font-size: .75rem; color: #52525b; }
  .otp-note { text-align: center; font-size: .875rem; color: #9ca3af; margin-bottom: 1.5rem; }
  .resq-resend { background: none; border: none; color: #ef4444; font-weight: 600; cursor: pointer; }
`;