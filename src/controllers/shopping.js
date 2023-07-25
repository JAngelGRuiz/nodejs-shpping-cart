const User = require("../models/users");
const Order = require("../models/orders");

exports.patchCart = async (req, res, next) => {
  const {
    params: { productId, userId },
  } = req;

  try {
    const currentUser = await User.findOne({ _id: userId });
    const cart = currentUser.addToCart(productId);
    res.status(201).send(cart);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

exports.getUserCart = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    const user = await User.findOne({ _id: userId })
      .populate("cart.items.productId")
      .exec()
      .then((user) => user.cart.items);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

exports.postOrder = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    const { preOrder, user } = await User.findOne({ _id: userId })
      .populate("cart.items.productId")
      .exec()
      .then((user) => ({
        preOrder: user.cart.items.map((item) => ({
          quantity: item.quantity,
          product: { ...item.productId._doc },
        })),
        user: user,
      }));

    const { cart, ...userCloneToOrder } = user._doc;

    const order = await new Order({
      products: preOrder,
      user: { ...userCloneToOrder },
    }).save();

    await user.clearAllCart();

    res.status(201).send(order);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};
