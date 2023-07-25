const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isEmpty } = require("lodash");

exports.loginEmail = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (isEmpty(user)) {
      res.status(204).send("No user registered");
    }

    const doMatch = await bcrypt.compare(password, user.hash);

    if (doMatch) {
      const { hash, ...secureUser } = user._doc;

      const token = jwt.sign(secureUser, process.env.KEY_SECRET_JWT, {
        expiresIn: "1h",
      });

      req.session.user = user;
      req.session.isLoggin = true;
      req.session.authToken = token;

      res.status(200).send({ ...secureUser, authToken: token });
    } else {
      res.status(403).send({
        error: "Not allowed",
        message: "User or password are incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};
