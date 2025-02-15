const asyncHandler = require("express-async-handler");
const Bill = require("../model/billModel.js")

// @desc get all bills --->
// @route GET /api/bills
// @access public
const getBills = asyncHandler(async(req, res)=>{

    try{

        // authenticate user if login or not 
        const user = true;

        // if not logged in 
        if(!user){
            return res.status(404).json({"MESSAGE" : "WARNING! User Is Not Authenticated." });
        }
        const bills = await Bill.find();
        if(bills) {
            return res.status(200).json({"MESSAGE" : "List of all bills.", bills});
        }
    }
    catch(err){
        return res.status(500).json({"MESSAGE" : "Error while fetching all bill.", "Error" : err });
    }
})

// @desc get particular bills --->
// @route GET /api/bills/:id
// @access public
const getBill = asyncHandler(async(req, res)=>{

    const { bill_Id } = req.params.bill_Id;
    console.log('bill_Id : ',bill_Id );
    res.status(200).json({"message" : "List of all bills."})
})

// @desc Add new bill --->
// @route GET /api/bills
// @access public
const addBill = asyncHandler(async(req, res)=>{

    try{

        const {name, village, phone, date, type, weight, dal, bhusa, ghat, reduceBill, bill, rate } = req.body;
        
        if( !name || !village || !phone || !date || !type || !weight || !dal || !bhusa || !ghat || !bill || !rate ){
            console.log(req.body);
            return res.status(400).json({ error: 'Please fill in all fields.' });
        }
    
        let billData = {
            name, village, phone, date, type, weight, dal:String(dal), bhusa:String(bhusa), ghat : String(ghat), reduceBill, bill : String(bill), rate 
        };
        console.log('billData : ', billData );

        Bill.create(billData).then(data => res.status(200).json({ "message" : "Bill generated successfully", "bill" : data}) ).catch(err => res.status(400).json({ "message" : "Error generating new bill", "error" : err}) );

    }
    catch(err){
        console.log('Error generating new bill');
        res.status(400).json({ "message" : "Error generating new bill", "error" : err});
    }
})


// @desc Edit bill --->
// @route GET /api/bills
// @access public
const editBill = asyncHandler(async(req, res)=>{

    res.status(200).json({"message" : "List of all bills."})
})

// @desc Delete bill --->
// @route GET /api/bills
// @access public
const deleteBill = asyncHandler(async(req, res)=>{

    res.status(200).json({"message" : "List of all bills."})
})



module.exports = { getBills, getBill, deleteBill, editBill, addBill };