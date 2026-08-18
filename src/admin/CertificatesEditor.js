import React, { useState } from "react";
import { FiPlus, FiTrash2, FiSave, FiCheck, FiAlertCircle } from "react-icons/fi";
import certificatesData from "../data/certificates.json";
import { resolveImage } from "../data/imageMap";
import { saveData } from "./adminSave";

function blankCertificate() {
  return {
    id: `certificate-${Date.now()}`,
    image: "",
    alt: "",
    caption: "",
  };
}

export default function CertificatesEditor() {
  const [certificates, setCertificates] = useState(() =>
    JSON.parse(JSON.stringify(certificatesData))
  );
  const [status, setStatus] = useState(null);

  const updateField = (index, field, value) => {
    setCertificates((prev) => prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)));
  };

  const removeCertificate = (index) => {
    setCertificates((prev) => prev.filter((_, i) => i !== index));
  };

  const addCertificate = () => {
    setCertificates((prev) => [blankCertificate(), ...prev]);
  };

  const handleSave = async () => {
    setStatus("saving");
    try {
      await saveData("certificates", certificates);
      setStatus("saved");
    } catch (err) {
      setStatus(`error: ${err.message}`);
    }
  };

  return (
    <div>
      <div className="admin-notice">
        New or changed images go in <code>public/images/</code> — reference
        them here by filename.
      </div>

      <div className="admin-toolbar">
        <button className="admin-btn admin-btn-ghost" onClick={addCertificate}>
          <FiPlus /> Add Certificate
        </button>
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

      {certificates.length === 0 && <div className="admin-empty">No certificates yet. Add one above.</div>}

      {certificates.map((cert, index) => (
        <div className="admin-item-card" key={cert.id}>
          <img
            className="admin-item-thumb"
            src={resolveImage(cert.image)}
            alt=""
            onError={(e) => {
              e.target.style.visibility = "hidden";
            }}
          />
          <div className="admin-item-body">
            <div className="admin-item-top">
              <span className="admin-item-title">{cert.caption || "Untitled certificate"}</span>
              <button className="admin-btn-icon" onClick={() => removeCertificate(index)} title="Remove">
                <FiTrash2 />
              </button>
            </div>

            <div className="admin-item-fields">
              <div className="admin-field">
                <label>Image filename</label>
                <input
                  className="admin-input"
                  value={cert.image}
                  onChange={(e) => updateField(index, "image", e.target.value)}
                />
              </div>
              <div className="admin-field">
                <label>Caption</label>
                <input
                  className="admin-input"
                  value={cert.caption}
                  onChange={(e) => updateField(index, "caption", e.target.value)}
                />
              </div>
              <div className="admin-field">
                <label>Alt text</label>
                <input
                  className="admin-input"
                  value={cert.alt}
                  onChange={(e) => updateField(index, "alt", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
