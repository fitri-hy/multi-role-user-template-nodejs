const express = require("express");

const errorRouter = () => {
  const router = express.Router();

  router.use((req, res, next) => {
    res.status(404).render("error/404", {
      title: "404 - Page Not Found | PWA App",
    });
  });

  router.use((err, req, res, next) => {
    if (err.status === 504) {
      res.status(504).render("error/504", {
        title: "504 - Gateway Timeout | PWA App",
      });
    } else {
      next(err);
    }
  });

  router.use((err, req, res, next) => {
    res.status(err.status || 500).render("error/500", {
      title: "500 - Internal Server Error | PWA App",
    });
  });

  return router;
};

module.exports = errorRouter;