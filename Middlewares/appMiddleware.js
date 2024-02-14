const appMiddleware =(req,res,next)=>{
    console.log("inside the application middleware");
    next()
}

module.exports = appMiddleware