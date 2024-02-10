const {CustomError} = require('../error/all-route-catch');

const errorHandler = (err, req, res, next) =>{
    if(err instanceof CustomError) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message
        });
    }
    return res.status(500).json({
        status:500,
        msg:'Unable to retrieve data. Try again later'
    });
}

module.exports = errorHandler;