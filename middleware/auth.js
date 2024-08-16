function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect("/login");
}

function ensureRole(role) {
  return function (req, res, next) {
    if (req.session && req.session.userRole === role) {
      return next();
    }
    res.status(403).send("Access Denied");
  };
}

module.exports = {
  ensureAuthenticated,
  ensureRole,
};
