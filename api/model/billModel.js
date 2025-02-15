const mongoose = require("mongoose");


const billSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please enter name'],
    },
    village : {
        type : String,
        required : [true, 'Please enter village'],
    },
    phone : {
        type : String,
        required : [true, 'Please add phone number'],
    },
    date : {
        type : String,
        required : [true],
        // default : Date.now,
    },
    type : {
        type : String,
        required : [ true, 'please enter grain type' ],
    },
    weight : {
        type : String,
        required : [ true, 'Please enter weight.' ],
    },
    // do calculations in backend and the value should came automatically.
    dal : {
        type : String,
        required :  [ true, 'Please enter dal wt.' ],
    },
    // do calculations in backend and the value should came automatically.
    bhusa : {
        type : String,
        required : [ true, 'Please enter bhusa wt.' ],
    },
    // do calculations in backend and the value should came automatically.
    ghat : {
        type : String,
        required :[ true, 'Please enter ghat wt.' ],
    },
    // enter val to reduce from bill
    reduceBill : {
        type : String
    },
    // calculate and get auto, also reduce from reduce bill
    bill : {
        type : String,
        required : [ true, 'Please enter bill amt.' ],
    },
    rate : {
        type : String,
        required : [ true, 'Please enter a rate.' ],
    },
},{
    Timestamp : true,
});

module.exports = mongoose.model("Bills", billSchema);