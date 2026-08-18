const fs = require("fs");
const path = require("path");

const ALLOWED_TYPES = {
  projects: path.join(__dirname, "data", "projects.json"),
  certificates: path.join(__dirname, "data", "certificates.json"),
  socialLinks: path.join(__dirname, "data", "socialLinks.json"),
};

module.exports = function (app) {
  app.post("/__admin/save/:type", (req, res) => {
    const targetPath = ALLOWED_TYPES[req.params.type];
    if (!targetPath) {
      res.status(400).json({ error: "Unknown data type" });
      return;
    }

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        fs.writeFileSync(targetPath, JSON.stringify(parsed, null, 2) + "\n");
        res.status(200).json({ ok: true });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
  });
};
