const { getUser } = require("./auth");

const authenticateUser = (req, res, next) => {
  console.log("authenticate " + process.env.NODE_ENV);
  const user = getUser(req.cookies.uid);

  if (!user) return res.json({ redirect: "/login" });
  next();
};

module.exports = authenticateUser;
