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
    dal : {
        type : String,
        required :  [ true, 'Please enter dal wt.' ],
    },
    bhusa : {
        type : String,
        required : [ true, 'Please enter bhusa wt.' ],
    },
    ghat : {
        type : String,
        required :[ true, 'Please enter ghat wt.' ],
    },
    reduceBill : {
        type : String 
    },
    bill : {
        type : String,
        required : [ true, 'Please enter bill amt.' ],
    },
    rate : {
        type : String,
        required : [ true, 'Please enter a rate.' ],
    },
    isDelivered : {
        type : Boolean,
        default: false,
    },
},{
    Timestamp : true,
});

module.exports = mongoose.model("Bills", billSchema);