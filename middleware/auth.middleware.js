module.exports = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
