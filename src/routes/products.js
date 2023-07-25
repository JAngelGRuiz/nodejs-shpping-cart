const { Router } = require("express");
const {
  postProduct,
  getProducts,
  patchProducts,
  deleteProduct,
} = require("../controllers/products");

const router = Router();

router.get("/", getProducts);
router.post("/", postProduct);
router.patch("/:productId", patchProducts);
router.delete("/:productId", deleteProduct);

module.exports = router;
