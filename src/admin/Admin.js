import React, { useState } from "react";
import {
  FiLock,
  FiLogOut,
  FiExternalLink,
  FiFolder,
  FiAward,
  FiShare2,
} from "react-icons/fi";
import ProjectsEditor from "./ProjectsEditor";
import CertificatesEditor from "./CertificatesEditor";
import SocialLinksEditor from "./SocialLinksEditor";
import projectsData from "../data/projects.json";
import certificatesData from "../data/certificates.json";
import socialLinksData from "../data/socialLinks.json";
import "./admin.css";

// Not real security: this only gates casual access to the local dev-only
// content editor. The whole /admin route is stripped from production
// builds (see App.js), so this password never ships to the public site.
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "portfolio-admin";
const SESSION_KEY = "adminAuthed";

const SECTIONS = [
  { key: "projects", label: "Projects", icon: FiFolder, count: projectsData.length },
  { key: "certificates", label: "Certificates", icon: FiAward, count: certificatesData.length },
  { key: "socialLinks", label: "Social Links", icon: FiShare2, count: socialLinksData.length },
];

function LoginGate({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="admin-shell">
      <div className="admin-login-wrap">
        <form className="admin-login-card" onSubmit={handleSubmit}>
          <div className="admin-login-icon">
            <FiLock />
          </div>
          <h2>Portfolio Admin</h2>
          <p className="admin-login-sub">Sign in to manage site content</p>

          {error && <div className="admin-error">Incorrect password.</div>}

          <div className="admin-login-field">
            <FiLock size={15} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              autoFocus
            />
          </div>

          <button type="submit" className="admin-btn admin-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true"
  );
  const [active, setActive] = useState("projects");

  if (!authed) {
    return <LoginGate onSuccess={() => setAuthed(true)} />;
  }

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  const activeSection = SECTIONS.find((s) => s.key === active);

  return (
    <div className="admin-shell">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <div className="admin-brand-mark">MM</div>
            <div className="admin-brand-text">
              <h1>Metin Meki</h1>
              <span>Content Admin</span>
            </div>
          </div>

          <nav>
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.key}
                  className={`admin-nav-item ${active === section.key ? "active" : ""}`}
                  onClick={() => setActive(section.key)}
                >
                  <Icon />
                  {section.label}
                  <span className="admin-badge" style={{ marginLeft: "auto" }}>
                    {section.count}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="admin-sidebar-footer">
            <a
              href="#/"
              target="_blank"
              rel="noreferrer"
              className="admin-btn admin-btn-ghost"
            >
              <FiExternalLink /> View Site
            </a>
            <button className="admin-btn admin-btn-ghost" onClick={handleLogout}>
              <FiLogOut /> Log Out
            </button>
          </div>
        </aside>

        <main className="admin-main">
          <div className="admin-topbar">
            <div>
              <h2>
                {activeSection.label}
                <span className="admin-badge">{activeSection.count} items</span>
              </h2>
              <p>
                Changes save to the JSON files in <code>src/data/</code> via
                the local dev server. This page only exists while{" "}
                <code>npm start</code> is running — it is not part of the
                production build.
              </p>
            </div>
          </div>

          {active === "projects" && <ProjectsEditor />}
          {active === "certificates" && <CertificatesEditor />}
          {active === "socialLinks" && <SocialLinksEditor />}
        </main>
      </div>
    </div>
  );
}
