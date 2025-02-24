const express  = require("express");
const { getBills, getBill, addBill, editBill, deleteBill } = require("../controller/billsController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// get all dal bills --->
router.get("/", validateToken , getBills );

// Add New Bill --->
router.post("/", validateToken, addBill);

// get partucular bill using bill_Id --->
router.get("/:bill_Id", validateToken, getBill );

// edit old bill --->
router.put("/:bill_Id", validateToken, editBill );

// delete bill 
router.delete("/:bill_Id", validateToken, deleteBill );

module.exports = router;