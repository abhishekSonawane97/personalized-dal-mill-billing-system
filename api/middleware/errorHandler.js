const { constants } = require("../constants");


const errorHandler = (err, req, res, next)=>{

    console.log('res,statusCode, res, err, err.message : ', res,statusCode, res, err, err.message);
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR : 
            res.status(statusCode).res.json({ title : "Validation Failed", message : err.message , stackTrace : err.stack });
            break;

        case constants.NOT_FOUND : 
            res.status(statusCode).res.json({ title : "Not Found", message : err.message , stackTrace : err.stack });
            break;

        case constants.UNAUTHORIZED : 
            res.status(statusCode).res.json({ title : "Unauthorized", message : err.message , stackTrace : err.stack });
            break;

        case constants.SERVER_ERROR : 
            res.status(statusCode).res.json({ title : "Server Error", message : err.message , stackTrace : err.stack });

        default:
            console.log('No Error All Good!');
        break;
    }
    // res.status(statusCode).res.json({ title : "Not Found", message : err.message , stackTrace : err.stack }).res.json({ title : "Validation Failed", message : err.message , stackTrace : err.stack });
    
};

module.exports = errorHandler;