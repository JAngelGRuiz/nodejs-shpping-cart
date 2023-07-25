const bcrypt = require("bcrypt");
const User = require("../models/users");

exports.postUsers = async (req, res, next) => {
  const {
    body: { name, phone, email, password },
  } = req;

  const hash = await bcrypt.hash(password, 12);

  try {
    const user = await new User({
      name,
      email,
      phone,
      hash,
    }).save();
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
};

exports.getUsers = async (req, res, next) => {
  const users = await User.find({});

  if (_.isEmpty(users)) {
    res.status(204).send(users);
    return;
  }

  res.status(200).send(users);
};

exports.patchUsers = async (req, res, next) => {
  const {
    params: { userId },
    body: { name, phone, email },
  } = req;

  await User.findByIdAndUpdate(userId, { name, phone, email });
  const user = await User.findById(userId);

  res.status(200).send(user);
};

exports.deleteUsers = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    await User.findByIdAndDelete(userId);
    res.status(204).send();
  } catch (error) {
    res.status(304).send("Hola");
  }
};
