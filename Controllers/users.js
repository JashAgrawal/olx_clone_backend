const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../Models");
const saltRounds = 10;
const cookieAge = 1000 * 60 * 60 * 24 * 3;
const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    // console.log(passwordHash.toString());
    const user = new userModel({
      name,
      email,
      password: passwordHash.toString(),
    });
    const savedUser = await user.save();
    const Token = jwt.sign({ id: "" + savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.cookie("userToken", Token, {
      httpOnly: false,
      maxAge: cookieAge,
    });
    res.status(200).json({
      message: "User saved succesfully",
      data: {
        email: savedUser.email,
        name: savedUser.name,
        userId: savedUser._id,
        userToken: Token,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: err, error: true });
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const Token = jwt.sign({ id: "" + user._id }, process.env.JWT_SECRET, {
          expiresIn: "3d",
        });
        res.cookie("userToken", Token, {
          httpOnly: false,
          maxAge: cookieAge,
        });
        res.status(200).json({
          message: "User Found succesfully",
          data: {
            email: user.email,
            name: user.name,
            userId: user._id,
            userToken: Token,
          },
        });
      } else {
        res.status(400).json({ message: "Incorrect Password" });
      }
    } else {
      res.status(400).json({ message: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err, error: true });
  }
};
const forgotPassword = (req, res, next) => {
  res.status(200).json({ message: "Not Implemented" });
  //requires otp validation
};

module.exports = { login, signup, forgotPassword };
