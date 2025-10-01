const User = require("../models/user");
const { setUser } = require("../service/auth");

const handleSignout = async (req, res) => {
  res.clearCookie("uid", {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax", // or "none" with secure: true if cross-site
  });
  res.json({ success: true, redirectTo: "/login" });
};

const LoginHandler = async (req, res) => {
  const { email, password } = req.body;
  console.log("email  " + email + "  " + "password  " + password);
  let user = await User.findOne({ email });

  if (!user) {
    if (email === "anupraj1854@gmail.com") {
      user = await User.create({ email, password });
    } else {
      return res.json({ message: "only admin can login" });
    }
  }

  if (user && user.password !== password) {
    return res.json({ message: "password is incorrect" });
  }

  const token = setUser(user);
  res.cookie("uid", token, {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax", // or "none" with secure: true if cross-site
  });
  res.json(user);
};

module.exports = { LoginHandler, handleSignout };
