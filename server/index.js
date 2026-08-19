const path = require("path");
const express = require("express");
const { createAdminApiRouter } = require("./adminApi");

const PORT = process.env.PORT || 5177;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "..", "runtime-data");
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, "..", "uploads", "images");

const app = express();
app.use("/api", createAdminApiRouter({ dataDir: DATA_DIR, uploadsDir: UPLOADS_DIR }));

app.listen(PORT, "127.0.0.1", () => {
  console.log(`admin api listening on 127.0.0.1:${PORT}`);
  console.log(`data dir: ${DATA_DIR}`);
  console.log(`uploads dir: ${UPLOADS_DIR}`);
});
