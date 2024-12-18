const { verifyCookie } = require("../service/auth");


exports.restrictToCollector=async(req,res,next)=>{
    // console.log(req.cookies.authToken);
    if(!req.cookies.authToken){
        console.log("authToken Wasnt there");
        res.redirect("/")
    }
    else{

        const verify = await verifyCookie(req.cookies.authToken);
        // console.log(verify);
        
        if(!verify) {
            console.log("Verify Was Null");
            res.redirect("/")
        }
        else if(verify.role!="collector"){
            
            console.log("Role wasnt collector");
            res.redirect("/")

        }
        else{ 
            
        req.username=verify.username;
        next();
        }
    }
}