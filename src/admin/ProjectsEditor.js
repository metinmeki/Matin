import React, { useState } from "react";
import { FiPlus, FiTrash2, FiSave, FiCheck, FiAlertCircle } from "react-icons/fi";
import projectsData from "../data/projects.json";
import { resolveImage } from "../data/imageMap";
import { saveData } from "./adminSave";

function blankProject() {
  return {
    id: `project-${Date.now()}`,
    title: "",
    image: "",
    githubUrl: "",
    description: "",
    techStack: [],
    featured: false,
  };
}

export default function ProjectsEditor() {
  const [projects, setProjects] = useState(() => JSON.parse(JSON.stringify(projectsData)));
  const [status, setStatus] = useState(null);

  const updateField = (index, field, value) => {
    setProjects((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };

  const removeProject = (index) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  const addProject = () => {
    setProjects((prev) => [blankProject(), ...prev]);
  };

  const handleSave = async () => {
    setStatus("saving");
    try {
      await saveData("projects", projects);
      setStatus("saved");
    } catch (err) {
      setStatus(`error: ${err.message}`);
    }
  };

  return (
    <div>
      <div className="admin-notice">
        New or changed images go in <code>public/images/</code> — reference
        them here by filename (e.g. <code>my-project.png</code>).
      </div>

      <div className="admin-toolbar">
        <button className="admin-btn admin-btn-ghost" onClick={addProject}>
          <FiPlus /> Add Project
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

      {projects.length === 0 && <div className="admin-empty">No projects yet. Add one above.</div>}

      {projects.map((project, index) => (
        <div className="admin-item-card" key={project.id}>
          <img
            className="admin-item-thumb"
            src={resolveImage(project.image)}
            alt=""
            onError={(e) => {
              e.target.style.visibility = "hidden";
            }}
          />
          <div className="admin-item-body">
            <div className="admin-item-top">
              <span className="admin-item-title">
                {project.title || "Untitled project"}
              </span>
              <button className="admin-btn-icon" onClick={() => removeProject(index)} title="Remove">
                <FiTrash2 />
              </button>
            </div>

            <div className="admin-item-fields">
              <div className="admin-field">
                <label>Title</label>
                <input
                  className="admin-input"
                  value={project.title}
                  onChange={(e) => updateField(index, "title", e.target.value)}
                />
              </div>
              <div className="admin-field">
                <label>Image filename</label>
                <input
                  className="admin-input"
                  value={project.image}
                  onChange={(e) => updateField(index, "image", e.target.value)}
                />
              </div>
              <div className="admin-field">
                <label>GitHub URL</label>
                <input
                  className="admin-input"
                  value={project.githubUrl}
                  onChange={(e) => updateField(index, "githubUrl", e.target.value)}
                />
              </div>
              <div className="admin-field">
                <label>Tech stack (comma separated)</label>
                <input
                  className="admin-input"
                  value={project.techStack.join(", ")}
                  onChange={(e) =>
                    updateField(
                      index,
                      "techStack",
                      e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                    )
                  }
                />
              </div>
              <div className="admin-field">
                <label>Featured on home page</label>
                <label className="admin-switch-row">
                  <span className="admin-switch">
                    <input
                      type="checkbox"
                      checked={project.featured}
                      onChange={(e) => updateField(index, "featured", e.target.checked)}
                    />
                    <span className="admin-switch-track" />
                  </span>
                  <span>{project.featured ? "Shown on home" : "Hidden from home"}</span>
                </label>
              </div>
            </div>

            <div className="admin-item-fields wide" style={{ marginTop: "0.7rem" }}>
              <div className="admin-field">
                <label>Description</label>
                <textarea
                  className="admin-input"
                  rows={2}
                  value={project.description}
                  onChange={(e) => updateField(index, "description", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
