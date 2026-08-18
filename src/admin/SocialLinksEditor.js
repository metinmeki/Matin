import React, { useState } from "react";
import {
  AiOutlineInstagram,
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineMail,
  AiFillYoutube,
} from "react-icons/ai";
import { FiSave, FiCheck, FiAlertCircle } from "react-icons/fi";
import socialLinksData from "../data/socialLinks.json";
import { saveData } from "./adminSave";

const iconByPlatform = {
  instagram: AiOutlineInstagram,
  github: AiFillGithub,
  linkedin: AiFillLinkedin,
  youtube: AiFillYoutube,
  email: AiOutlineMail,
};

export default function SocialLinksEditor() {
  const [links, setLinks] = useState(() => JSON.parse(JSON.stringify(socialLinksData)));
  const [status, setStatus] = useState(null);

  const updateField = (index, field, value) => {
    setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, [field]: value } : l)));
  };

  const handleSave = async () => {
    setStatus("saving");
    try {
      await saveData("socialLinks", links);
      setStatus("saved");
    } catch (err) {
      setStatus(`error: ${err.message}`);
    }
  };

  return (
    <div>
      <div className="admin-notice">
        Edit the URL for each platform, or turn a platform off to hide it
        from the "Connect with Me" section.
      </div>

      <div className="admin-toolbar">
        <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={status === "saving"}>
          <FiSave /> Save Changes
        </button>
        {status === "saving" && <span className="admin-status admin-status-saving">Saving…</span>}
        {status === "saved" && (
          <span className="admin-status admin-status-saved">
            <FiCheck /> Saved
          </span>
        )}
        {status && status.startsWith("error") && (
          <span className="admin-status admin-status-error">
            <FiAlertCircle /> {status}
          </span>
        )}
      </div>

      {links.map((link, index) => {
        const Icon = iconByPlatform[link.platform];
        return (
          <div className="admin-social-row" key={link.platform}>
            <span className="admin-social-icon">{Icon && <Icon />}</span>
            <span className="admin-social-platform">{link.platform}</span>
            <div className="admin-social-url">
              <input
                className="admin-input"
                value={link.url}
                onChange={(e) => updateField(index, "url", e.target.value)}
              />
            </div>
            <label className="admin-switch-row">
              <span className="admin-switch">
                <input
                  type="checkbox"
                  checked={link.enabled}
                  onChange={(e) => updateField(index, "enabled", e.target.checked)}
                />
                <span className="admin-switch-track" />
              </span>
              <span>{link.enabled ? "Enabled" : "Hidden"}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
