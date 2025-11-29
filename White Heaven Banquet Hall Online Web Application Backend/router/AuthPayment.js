const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controller/PaymentController");

router.post("/create-order", createOrder);
router.post("/verify-order", verifyPayment);

module.exports = router;
