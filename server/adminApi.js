const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");

const ALLOWED_TYPES = ["projects", "certificates", "socialLinks"];
const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

function sanitizeFilename(originalName) {
  const ext = path.extname(originalName).toLowerCase();
  const base = path
    .basename(originalName, ext)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";
  return { base, ext };
}

// dataDir: directory containing projects.json / certificates.json / socialLinks.json
// uploadsDir: directory uploaded images are written to (created if missing)
// uploadsUrlPrefix: URL prefix returned to the client for uploaded images (e.g. "uploads")
function createAdminApiRouter({ dataDir, uploadsDir, uploadsUrlPrefix = "uploads" }) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(uploadsDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
      const { base, ext } = sanitizeFilename(file.originalname);
      cb(null, `${base}-${Date.now()}${ext}`);
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: MAX_UPLOAD_BYTES },
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (!ALLOWED_IMAGE_EXTENSIONS.includes(ext)) {
        cb(new Error(`Unsupported image type: ${ext}`));
        return;
      }
      cb(null, true);
    },
  });

  const router = express.Router();
  router.use(express.json({ limit: "1mb" }));

  router.get("/content/:type", (req, res) => {
    const { type } = req.params;
    if (!ALLOWED_TYPES.includes(type)) {
      res.status(404).json({ error: "Unknown content type" });
      return;
    }
    const filePath = path.join(dataDir, `${type}.json`);
    fs.readFile(filePath, "utf8", (err, contents) => {
      if (err) {
        res.status(404).json({ error: "No content saved yet" });
        return;
      }
      try {
        res.type("json").send(contents);
      } catch {
        res.status(500).json({ error: "Stored content is corrupted" });
      }
    });
  });

  router.get("/admin/ping", (req, res) => {
    res.json({ ok: true });
  });

  router.post("/admin/save/:type", (req, res) => {
    const { type } = req.params;
    if (!ALLOWED_TYPES.includes(type)) {
      res.status(400).json({ error: "Unknown content type" });
      return;
    }
    if (!Array.isArray(req.body)) {
      res.status(400).json({ error: "Expected a JSON array body" });
      return;
    }
    const filePath = path.join(dataDir, `${type}.json`);
    fs.writeFile(filePath, JSON.stringify(req.body, null, 2) + "\n", (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ ok: true });
    });
  });

  router.post("/admin/upload-image", (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }
      res.json({ path: `${uploadsUrlPrefix}/${req.file.filename}` });
    });
  });

  return router;
}

module.exports = { createAdminApiRouter, ALLOWED_TYPES };
