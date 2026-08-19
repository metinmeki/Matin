const path = require("path");
const { createAdminApiRouter } = require("../server/adminApi");

module.exports = function (app) {
  app.use(
    "/api",
    createAdminApiRouter({
      dataDir: path.join(__dirname, "data"),
      uploadsDir: path.join(__dirname, "..", "public", "uploads", "images"),
    })
  );
};
