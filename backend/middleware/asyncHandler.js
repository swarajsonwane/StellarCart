// This is to have a global error handler for all the async functions..like for try catch blocks

const asyncHandler = (fn) => (req, res, next) =>{
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;
