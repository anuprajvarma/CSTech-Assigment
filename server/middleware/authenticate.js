const { getUser } = require("./auth");

const authenticateUser = (req, res, next) => {
  console.log(req.cookies.uid);
  const user = getUser(req.cookies.uid);

  if (!user) return res.json({ redirect: "/login" });
  next();
};

module.exports = authenticateUser;
