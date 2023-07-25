const { Router } = require("express");
const { postOrder } = require("../controllers/shopping");

const router = Router();

router.post("/user/:userId", postOrder);

module.exports = router;
