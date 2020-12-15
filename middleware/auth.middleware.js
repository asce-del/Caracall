module.exports = (req, res, next) => {
  try {
    if (req.session.isAuth) {
      next();
    }
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
