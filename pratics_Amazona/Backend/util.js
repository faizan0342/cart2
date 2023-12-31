
import jwt from "jsonwebtoken"
import config from "./config"

const getToken = (user) => {

    return jwt.sign({
        _id : user._id ,
        name : user.name,
        email : user.email,
        isAdmin : user._id

    } , config.JWT_SECRET , {
        expiresIn : "48h"
    })
    
}


const isAuth = (req , res ,next) => {
    var token = req.headers.authorization;
    console.log("token Auth" , token)
    if(token){
        const onlyToken = token.slice(7 , token.length);

        console.log("onlyToken  Auth" , onlyToken)
        jwt.verify(onlyToken ,  config.JWT_SECRET , (err , decode) => {

            console.log('decode ==>' , decode)
            if(err){
                return res.status(401).send({msg : "invalid Token"});
            }
            req.user = decode ;
            next();
            return
        })
    }else{
        return res.status(401).send({msg : " Token is not supplid"})
    }
    
} 



const isAdmin = (req , res , next) => {
    if(req.user && req.user.isAdmin){
        return next();
    }
    return res.status(401).send({msg : "Admin Token is not valid"})
}



export {
    getToken , isAuth , isAdmin
}