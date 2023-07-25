const express = require("express");
const {
  getUsers,
  postUsers,
  patchUsers,
  deleteUsers,
} = require("../controllers/users");
const { patchCart, getUserCart } = require("../controllers/shopping");

const router = express.Router();

router.post("/", postUsers);
router.get("/", getUsers);
router.patch("/:userId", patchUsers);
router.delete("/:userId", deleteUsers);
router.patch("/:userId/cart/:productId", patchCart);
router.get("/:userId/cart", getUserCart);

module.exports = router;
