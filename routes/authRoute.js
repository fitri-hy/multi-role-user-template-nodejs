const express = require("express");
const bcrypt = require("bcrypt");

const authRouter = (pool) => {
  const router = express.Router();

  router.get("/login", (req, res) => {
    res.render("login", {
      title: "Login | PWA App",
    });
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (rows.length === 0) {
        return res.status(401).send("Invalid email or password");
      }

      const user = rows[0];

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).send("Invalid email or password");
      }

      req.session.userId = user.id;
      req.session.userRole = user.role;

      if (user.role === "admin") {
        return res.redirect("/admin");
      } else if (user.role === "user") {
        return res.redirect("/users");
      } else if (user.role === "client") {
        return res.redirect("/client");
      } else {
        return res.redirect("/");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      res.status(500).send("Internal server error");
    }
  });

  router.get("/register", (req, res) => {
    res.render("register", {
      title: "Register | PWA App",
    });
  });

  router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, role || "user"]
      );

      res.redirect("/login");
    } catch (err) {
      console.error("Error registering:", err);
      res.status(500).send("Internal server error");
    }
  });

  router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error logging out:", err);
        return res.status(500).send("Internal server error");
      }

      res.redirect("/login");
    });
  });

  return router;
};

module.exports = authRouter;
