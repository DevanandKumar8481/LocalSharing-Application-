import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// CUSTOM SVG ICONS
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
  { id: "requester", title: "Requester", desc: "Request emergency resources" },
  { id: "volunteer", title: "Volunteer", desc: "Respond to nearby tasks" },
  { id: "provider", title: "Resource provider", desc: "List blood, food, transport" },
  { id: "ngo", title: "NGO / Authority", desc: "Coordinate at scale" },
];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("volunteer");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(32);

  // Form State (All dynamic fields handled)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emergencyPhone: "",
    location: "",
    password: "",
    skills: "",
    availability: "On Call",
    emergencyType: "Medical",
    orgName: "",
    contactPerson: "",
    resourceType: "Blood",
    regNumber: "",
    officerName: ""
  });

  // OTP State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);

  // OTP Resend Timer Effect
  useEffect(() => {
    let interval = null;
    if (step === 3 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handle inputs dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Step 2 Form Validation Engine
  const validateForm = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (["volunteer", "requester"].includes(selectedRole)) {
      if (!formData.name.trim()) tempErrors.name = "Full name is required";
      if (!emailRegex.test(formData.email)) tempErrors.email = "Invalid email address";
    }

    if (["provider", "ngo"].includes(selectedRole)) {
      if (!formData.orgName.trim()) tempErrors.orgName = "Organization name is required";
    }

    if (selectedRole === "volunteer") {
      if (!formData.emergencyPhone.trim()) tempErrors.emergencyPhone = "Emergency contact is required";
      if (!formData.skills.trim()) tempErrors.skills = "Please mention your skills";
    }

    if (selectedRole === "provider") {
      if (!formData.contactPerson.trim()) tempErrors.contactPerson = "Contact person name is required";
      if (!emailRegex.test(formData.email)) tempErrors.email = "Invalid email address";
    }

    if (selectedRole === "ngo") {
      if (!formData.regNumber.trim()) tempErrors.regNumber = "Registration number is required";
      if (!formData.officerName.trim()) tempErrors.officerName = "Officer name is required";
      if (!emailRegex.test(formData.email)) tempErrors.email = "Invalid official email";
    }

    if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
    if (!formData.location.trim()) tempErrors.location = "Location is required";
    if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleStep2Continue = () => {
    if (validateForm()) {
      setStep(3);
    }
  };

  // OTP core functionality
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
    if (otp.join("").length < 6) {
      setErrors({ otp: "Please enter a valid 6-digit verification code" });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 1500);
  };

  // Dynamic Headings for Step 2
  const getHeadingText = () => {
    switch (selectedRole) {
      case "volunteer": return "Volunteer Registration";
      case "requester": return "Requester Registration";
      case "provider": return "Resource Provider Registration";
      case "ngo": return "NGO Registration";
      default: return "Tell us about you";
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="main_container">

        {/* Navbar */}
        <header className="resq-header">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="resq-logo-container">
              <div className="resq-logo-box">R</div>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>ResQ <span style={{ color: "#ef4444" }}>Link</span></span>
            </div>
          </Link>
          <Link to="/login" className="resq-header-link">
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

            {/* STEP 2: Role-Based Identity Details */}
            {step === 2 && (
              <div>
                <h1>{getHeadingText()}</h1>
                <p>We use this to match you with the closest verified people.</p>
                
                <div className="field-grid">
                  
                  {/* VOLUNTEER & REQUESTER FIELDS */}
                  {["volunteer", "requester"].includes(selectedRole) && (
                    <>
                      <label>
                        <span className="field-label">Full name</span>
                        <input className="field-input" name="name" placeholder="Aarav Sharma" value={formData.name} onChange={handleInputChange} />
                        {errors.name && <span className="error-txt">{errors.name}</span>}
                      </label>
                      <label>
                        <span className="field-label">Email</span>
                        <input className="field-input" type="email" name="email" placeholder="you@email.com" value={formData.email} onChange={handleInputChange} />
                        {errors.email && <span className="error-txt">{errors.email}</span>}
                      </label>
                    </>
                  )}

                  {/* RESOURCE PROVIDER FIELDS */}
                  {selectedRole === "provider" && (
                    <>
                      <label>
                        <span className="field-label">Organization Name</span>
                        <input className="field-input" name="orgName" placeholder="Apollo Blood Bank / Food Matrix" value={formData.orgName} onChange={handleInputChange} />
                        {errors.orgName && <span className="error-txt">{errors.orgName}</span>}
                      </label>
                      <label>
                        <span className="field-label">Contact Person Name</span>
                        <input className="field-input" name="contactPerson" placeholder="Jane Doe" value={formData.contactPerson} onChange={handleInputChange} />
                        {errors.contactPerson && <span className="error-txt">{errors.contactPerson}</span>}
                      </label>
                      <label>
                        <span className="field-label">Email</span>
                        <input className="field-input" type="email" name="email" placeholder="contact@org.com" value={formData.email} onChange={handleInputChange} />
                        {errors.email && <span className="error-txt">{errors.email}</span>}
                      </label>
                      <label>
                        <span className="field-label">Resource Type</span>
                        <select className="field-input" name="resourceType" value={formData.resourceType} onChange={handleInputChange}>
                          <option value="Blood">Blood</option>
                          <option value="Food">Food</option>
                          <option value="Medicine">Medicine</option>
                          <option value="Transport">Transport</option>
                          <option value="Shelter">Shelter</option>
                        </select>
                      </label>
                    </>
                  )}

                  {/* NGO / AUTHORITY FIELDS */}
                  {selectedRole === "ngo" && (
                    <>
                      <label>
                        <span className="field-label">Organization Name</span>
                        <input className="field-input" name="orgName" placeholder="Red Cross Base Operations" value={formData.orgName} onChange={handleInputChange} />
                        {errors.orgName && <span className="error-txt">{errors.orgName}</span>}
                      </label>
                      <label>
                        <span className="field-label">Registration Number</span>
                        <input className="field-input" name="regNumber" placeholder="NGO-8392-DL" value={formData.regNumber} onChange={handleInputChange} />
                        {errors.regNumber && <span className="error-txt">{errors.regNumber}</span>}
                      </label>
                      <label>
                        <span className="field-label">Officer Name</span>
                        <input className="field-input" name="officerName" placeholder="Captain Vance" value={formData.officerName} onChange={handleInputChange} />
                        {errors.officerName && <span className="error-txt">{errors.officerName}</span>}
                      </label>
                      <label>
                        <span className="field-label">Official Email</span>
                        <input className="field-input" type="email" name="email" placeholder="ops@ngo.org" value={formData.email} onChange={handleInputChange} />
                        {errors.email && <span className="error-txt">{errors.email}</span>}
                      </label>
                    </>
                  )}

                  {/* CORE SHARED MOBILE FIELD */}
                  <label>
                    <span className="field-label">{selectedRole === "ngo" ? "Official Phone" : "Mobile Number"}</span>
                    <input className="field-input" type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange} />
                    {errors.phone && <span className="error-txt">{errors.phone}</span>}
                  </label>

                  {/* VOLUNTEER EXTRA FIELDS */}
                  {selectedRole === "volunteer" && (
                    <>
                      <label>
                        <span className="field-label">Emergency contact</span>
                        <input className="field-input" type="tel" name="emergencyPhone" placeholder="+91 98765 43210" value={formData.emergencyPhone} onChange={handleInputChange} />
                        {errors.emergencyPhone && <span className="error-txt">{errors.emergencyPhone}</span>}
                      </label>
                      <label className="full">
                        <span className="field-label">Skills (First Aid, Rescue, Medical, etc.)</span>
                        <input className="field-input" name="skills" placeholder="e.g. CPR Certified, Trauma response" value={formData.skills} onChange={handleInputChange} />
                        {errors.skills && <span className="error-txt">{errors.skills}</span>}
                      </label>
                      <div className="full">
                        <span className="field-label" style={{ marginBottom: "0.5rem" }}>Availability</span>
                        <div className="radio-group">
                          {["Full Time", "Weekends", "On Call"].map((mode) => (
                            <label key={mode} className="radio-label">
                              <input type="radio" name="availability" value={mode} checked={formData.availability === mode} onChange={handleInputChange} />
                              {mode}
                            </label>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* REQUESTER EXTRA FIELDS */}
                  {selectedRole === "requester" && (
                    <label>
                      <span className="field-label">Emergency Type</span>
                      <select className="field-input" name="emergencyType" value={formData.emergencyType} onChange={handleInputChange}>
                        <option value="Medical">Medical</option>
                        <option value="Blood">Blood</option>
                        <option value="Food">Food</option>
                        <option value="Shelter">Shelter</option>
                        <option value="Transport">Transport</option>
                      </select>
                    </label>
                  )}

                  {/* LOCATION & PASSWORD FOR ALL */}
                  <label className={["volunteer", "provider"].includes(selectedRole) ? "full" : ""}>
                    <span className="field-label">{selectedRole === "ngo" ? "City / Jurisdiction" : "Location"}</span>
                    <input className="field-input" name="location" placeholder="City, State, Zip Code" value={formData.location} onChange={handleInputChange} />
                    {errors.location && <span className="error-txt">{errors.location}</span>}
                  </label>
                  
                  <label className="full">
                    <span className="field-label">Password</span>
                    <div style={{ position: "relative" }}>
                      <input className="field-input" type={showPassword ? "text" : "password"} name="password" placeholder="Min. 6 characters" value={formData.password} onChange={handleInputChange} />
                      <button type="button" className="pwd-toggle" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {errors.password && <span className="error-txt">{errors.password}</span>}
                  </label>
                </div>

                <div className="btn-row">
                  <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={handleStep2Continue}>
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
                {errors.otp && <div className="error-txt" style={{ textAlign: "center", marginBottom: "1rem" }}>{errors.otp}</div>}

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
                  {timer > 0 ? (
                    `Resend code in ${timer}s`
                  ) : (
                    <button type="button" className="resq-resend" onClick={() => setTimer(32)}>Resend OTP</button>
                  )}
                </p>

                <div className="btn-row">
                  <button type="button" className="btn btn-outline" onClick={() => setStep(2)} disabled={isSubmitting}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Verifying..." : "Verify & Enter"} <ArrowRight />
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

// --- EXTENDED & IMPROVED STYLES DECLARATION ---
const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f0f13; }

  .main_container { min-height: 100vh; color: #f1f1f3; padding-bottom: 2rem; }
  .resq-header { max-width: 72rem; margin: 0 auto; padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; }
  .resq-logo-container { display: flex; align-items: center; gap: 0.5rem; }
  .resq-logo-box { width: 2rem; height: 2rem; border-radius: 6px; background: #ef4444; color: white; display: grid; place-items: center; font-weight: 900; }
  .resq-header-link { font-size: .875rem; color: #9ca3af; text-decoration: none; }
  .resq-header-link span { color: #ef4444; font-weight: 600; }

  .resq-main { max-width: 48rem; margin: 0 auto; padding: 1.5rem; }

  .resq-stepper { display: flex; align-items: center; justify-content: center; gap: .5rem; margin-bottom: 2rem; }
  .resq-step-node { width: 2rem; height: 2rem; border-radius: 50%; display: grid; place-items: center; font-size: .75rem; font-weight: 600; transition: all 0.3s ease; }
  .resq-step-node.active { background: #ef4444; color: #fff; }
  .resq-step-node.inactive { background: #27272a; color: #71717a; }
  .resq-step-line { width: 3rem; height: 2px; }
  .resq-step-line.done { background: #ef4444; }
  .resq-step-line.pending { background: #3f3f46; }

  .resq-card { background: #18181b; border: 1px solid #27272a; border-radius: 1rem; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
  .resq-card h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem; letter-spacing: -0.5px; }
  .resq-card p { font-size: .875rem; color: #9ca3af; margin-bottom: 1.5rem; }

  .role-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: .75rem; margin-bottom: 1.5rem; }
  .role-card { text-align: left; padding: 1.25rem; border-radius: .75rem; border: 1px solid #27272a; background: #212124; color: #fff; cursor: pointer; transition: all 0.2s; }
  .role-card:hover { border-color: #ef444480; }
  .role-card.selected { border-color: #ef4444; background: rgba(239,68,68,.05); }
  .role-title { font-weight: 600; font-size: .95rem; }
  .role-desc { font-size: .75rem; color: #9ca3af; margin-top: .25rem; }

  .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem 1rem; margin-bottom: 1.5rem; }
  @media (max-width: 600px) { .field-grid { grid-template-columns: 1fr; } }
  .field-grid .full { grid-column: 1 / -1; }
  .field-label { display: block; font-size: .75rem; font-weight: 600; color: #9ca3af; margin-bottom: .375rem; text-transform: uppercase; letter-spacing: 0.5px; }
  .field-input { width: 100%; height: 2.75rem; padding: 0 .75rem; background: #212124; border: 1px solid #27272a; border-radius: .5rem; color: #fff; outline: none; transition: border-color 0.2s; font-size: 0.95rem; }
  .field-input:focus { border-color: #ef4444; }
  select.field-input { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>"); background-repeat: no-repeat; background-position: right 10px center; background-size: 16px; }

  .pwd-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #ef4444; font-size: 0.75rem; font-weight: 700; cursor: pointer; text-transform: uppercase; }
  .error-txt { color: #ef4444; font-size: 0.75rem; margin-top: 0.25rem; display: block; font-weight: 500; }

  .radio-group { display: flex; gap: 1.5rem; background: #212124; padding: 0.75rem 1rem; border: 1px solid #27272a; border-radius: 0.5rem; }
  .radio-label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; cursor: pointer; color: #f1f1f3; }
  .radio-label input { accent-color: #ef4444; width: 1rem; height: 1rem; }

  .otp-row { display: flex; justify-content: center; gap: .5rem; margin: 2rem 0; }
  .otp-box { width: 3rem; height: 3.5rem; text-align: center; font-size: 1.5rem; font-weight: 700; background: #212124; border: 1px solid #27272a; border-radius: .5rem; color: #fff; outline: none; transition: all 0.2s; }
  .otp-box:focus { border-color: #ef4444; box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2); }

  .btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; height: 2.75rem; padding: 0 1.5rem; border-radius: .5rem; font-size: .9rem; font-weight: 600; cursor: pointer; border: none; transition: background 0.2s, transform 0.1s; }
  .btn:active { transform: scale(0.98); }
  .btn-primary { background: #ef4444; color: #fff; width: 100%; }
  .btn-primary:hover { background: #dc2626; }
  .btn-outline { background: transparent; border: 1px solid #27272a; color: #d4d4d8; }
  .btn-outline:hover { background: #212124; }
  .btn-row { display: flex; gap: .75rem; }
  .btn-row .btn { flex: 1; }

  .resq-note { margin-top: 1.5rem; text-align: center; font-size: .75rem; color: #52525b; }
  .otp-note { text-align: center; font-size: .875rem; color: #9ca3af; margin-bottom: 1.5rem; }
  .resq-resend { background: none; border: none; color: #ef4444; font-weight: 600; cursor: pointer; text-decoration: underline; }
`;

