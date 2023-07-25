const { Router } = require("express");
const { loginEmail } = require("../controllers/auth");

const router = Router();

router.post("/email", loginEmail);

module.exports = router;
