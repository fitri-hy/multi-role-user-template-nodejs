const express = require("express");
const { ensureAuthenticated, ensureRole } = require("../middleware/auth");

const webRouter = (pool) => {
  const router = express.Router();

  router.get("/admin", ensureAuthenticated, ensureRole("admin"), (req, res) => {
    res.render("admin/index", {
      title: "Admin | PWA App",
    });
  });

  router.get("/users", ensureAuthenticated, ensureRole("user"), (req, res) => {
    res.render("users/index", {
      title: "Users | PWA App",
    });
  });

  router.get("/client", ensureAuthenticated, ensureRole("client"), (req, res) => {
    res.render("client/index", {
      title: "Client | PWA App",
    });
  });

  router.get("/", (req, res) => {
    res.render("home", {
      title: "Default Home | PWA App",
    });
  });
  
  router.get("/forget-password", (req, res) => {
    res.render("forget-password", {
      title: "Forget Password | PWA App",
    });
  });

  return router;
};

module.exports = webRouter;
