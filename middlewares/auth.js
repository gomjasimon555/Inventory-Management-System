const jwt = require('jsonwebtoken');

const verifyTokenUserOrAdmin=(req,res,next)=>{
if(req.headers.authorization)
{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
if(err)
{
    res.status(403).json("Token is invalid")
}

if(decoded.isAdmin || decoded.id=== req.params.userID)
{
    next();
}
else{
    res.status(403).json("You are not authorized");
}
    });

}

else{
    res.status(403).json("You are not authenticated")
}

}

const verifyTokenAdmin=(req,res,next)=>{
    if(req.headers.authorization)
    {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
    
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
    if(err)
    {
        res.status(403).json("Token is invalid")
    }
    
    if(decoded.isAdmin )
    {
        next();
    }
    else{
        res.status(403).json("You are not authorized");
    }
        });
    
    }
    
    else{
        res.status(403).json("You are not authenticated")
    }
    
    }

    module.exports={
    verifyTokenAdmin,
    verifyTokenUserOrAdmin
    }