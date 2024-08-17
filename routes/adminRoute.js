const express = require("express");
const { ensureAuthenticated, ensureRole } = require("../middleware/auth");

const adminRouter = (pool) => {
  const router = express.Router();

  router.get("/admin/profile", ensureAuthenticated, ensureRole("admin"), (req, res) => {
    res.render("admin/profile", {
      title: "Profile | PWA App",
    });
  });

  return router;
};

module.exports = adminRouter;
