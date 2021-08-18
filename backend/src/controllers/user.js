const User = require("../models/user");

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
