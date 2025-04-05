const asyncHandler = require("express-async-handler");
const User = require("../model/userModel.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// @desc get all users --->
// @route GET /api/user
// @access public
const getUsers = asyncHandler(async (req, res) =>{

    try{
        const { user } = req.user;
        if(!user) return res.status(400).json( "User is not authorized." );
        
        console.log('verified user : ', user);
        res.status(200).json( user );
    }
    catch(err){
        res.status(400).json( "User is not authorized." );
    }
});

// @desc get particular users --->
// @route GET /api/user
// @access public
const getUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(400).json({ error: "User not found." });
    }
    res.status(200).json(req.user);
});

// @desc check existing users --->
// @route POST /api/user
// @access public
const checkUser = asyncHandler(async (req, res) =>{
    try{
        const { name, email, password } = req.body;
        console.log('req : ', name, email, password );

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Please fill in all fields.' });
        }

        // find user in db and authenticate using jsonwebtoken --->
        const userExists = await User.findOne({ email });

        // compare password with hashedPassword 
        if(userExists && bcrypt.compare(password, userExists.password )){
            console.log('userExists : ', userExists );

            const accessToken = jwt.sign({
                user : {
                    name : userExists.name,
                    email : userExists.email,
                    id : userExists._id, 
                },
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn : "8h" });

            return res.status(200).json({ "message" : "User Login Successfully!", accessToken });
        }
        else{
            return res.status(400).json({ "message" : "User is not registered." })
        }
    }catch(err){
        res.status(400).json({ "message" : "Authentication failed." });
    }
});

// @desc add new users --->
// @route POST /api/user
// @access public
const addNewUser = asyncHandler(async (req, res) =>{
    try{
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Please fill in all fields.' }); 
        }

        // find if user already exists in DB --->
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({ error: 'User is already registerd.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);        
        const newUser = await User.create({name, email, password: hashedPassword });

        if(newUser){ 
            return res.status(200).json({ "message" : "User created Successfully!", user : {
                id : newUser.id,
                name : newUser.name,
                email : newUser.email
            },
         });
        }
        else{
            return res.status(500).json({ error: 'Internal Server Error.' });
        }
    }catch(err){
        res.status(400).json({ "message" : "Authentication failed." });
    }
});


// @desc EDIT user --->
// @route PUTT /api/user
// @access public
const editUsers = asyncHandler(async (req, res) =>{

    const id = req.params.id;
    console.log('id : ', id)
    
    res.status(200).json({ "message" : "User Edited Successfully!", "user" :"send actual edited user info ." });
});

// @desc DELETE user --->
// @route DELETE /api/user
// @access public
const deleteUsers = asyncHandler(async (req, res) =>{

    const id = req.params.id;
    console.log('id : ', id)
    
    res.status(200).json({ "message" : "User Deleted Successfully!", "user" :"send actual deleted user info ." });
});

module.exports = { getUsers, getUser, checkUser, editUsers, deleteUsers, addNewUser }