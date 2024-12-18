const { verifyCookie } = require("../service/auth");


exports.restrictToAdmin=async(req,res,next)=>{
    if(!req.cookies.authToken){
        console.log("authToken Wasnt there");
        res.redirect("/")
    }
    else{

        const verify = await verifyCookie(req.cookies.authToken);
        
        if(!verify) {
            console.log("Verify Was Null");
            res.redirect("/")
        }
        else if(verify.role!="admin"){
            
            console.log("Role wasnt admin");
            res.redirect("/")

        }
        else{ 
        res.username=verify.username;
        next();
        }
    }
}