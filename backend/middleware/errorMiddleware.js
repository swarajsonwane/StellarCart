const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`); // originalUrl is the url that was requested
    res.status(404);
    next(error);
}

// this is getting called when we have an error in our app ...throwing an error from anyware in our app will call this function
const errorHandler = (err, req, res, next) => {
    // 500 is internal server error
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    

    //Check for mongoose bad object id error
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        message = 'Invalid ID';
        statusCode = 404;
    }
    res.status(statusCode);
    res.json({
        message: err.message, // message is a property of error object
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}

export {notFound, errorHandler};