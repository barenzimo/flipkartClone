const User = require("../models/user");
const jwt = require("jsonwebtoken");

// controller for signup feature
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) return res.status(400).json({ message: "user already exists" });

    const { firstName, lastName, userName, password, email } = req.body;
    const _user = new User({ firstName, lastName, password, email, userName });
    _user.save((err, data) => {
      if (err) return res.status(400).json({ message: "Something went wrong" });
      if (data) return res.status(200).json({ user: data });
    });
  });
};

//singin controller
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) res.status(400).json(error);
    if (user) {
      const isPassword = user.authenticate(req.body.password);
      if (isPassword) {
        const token = jwt.sign(
          { _id: user._id, user: user.role },
          process.env.Secret,
          {
            expiresIn: "1d",
          }
        );
        const { _id, firstName, lastName, fullName, email, role } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role },
        });
      } else {
        res.status(400).json({ message: "Incorrect password" });
      }
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  });
};
exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.Secret);
  req.user = user;
  next();
};
