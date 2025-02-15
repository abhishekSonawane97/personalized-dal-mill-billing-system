const express  = require("express");
const { getBills, getBill, addBill, editBill, deleteBill } = require("../controller/billsController");

const router = express.Router();

// get all dal bills --->
router.route("/").get(getBills);

// Add New Bill --->
router.route("/").post(addBill);

// get partucular bill using bill_Id --->
router.route("/:bill_Id").get(getBill);

// edit old bill --->
router.route("/:bill_Id").put(editBill);

// delete bill 
router.route("/:bill_Id").delete(deleteBill);

module.exports = router;