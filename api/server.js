const express = require("express");
const dotenv = require("dotenv").config();
const UserRouter = require("./routes/userRoute.js");
const BillRouter = require("./routes/billsRoute.js");
const cors = require('cors');
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection.js");


connectDb();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", UserRouter);
app.use("/bills", BillRouter);
app.use(errorHandler);


const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('Server is running on port : ', port);
})
