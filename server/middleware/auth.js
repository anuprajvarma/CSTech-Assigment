const jwt = require("jsonwebtoken");
const secret = "anuprajvarma";

const setUser = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      password: user.name,
    },
    secret,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const getUser = (token) => {
  if (!token) return null;
  try {
    const user = jwt.verify(token, secret);
    if (!user) return null;
    return user;
  } catch (error) {
    console.log("error getting user");
  }
};

module.exports = { setUser, getUser };
