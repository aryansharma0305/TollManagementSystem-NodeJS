const express = require("express");
const {handleAdminLogin}=require("../controllers/adminLoginController")
const {getAdminDashboard}=require("../controllers/adminDashboardController")
const {restrictToAdmin}=require("../middlewares/restrictToAdmin")
const {verifyCookie} =require("../service/auth.js")




const router=express.Router()



router.get('/login',async(req,res)=>{
    const cookieGet=req.cookies.authToken
    
    if(cookieGet) 
    {
        
        const ParsedCookie= await verifyCookie(cookieGet)
        if(ParsedCookie){
            if (ParsedCookie.role=='admin')
            res.redirect("/admin/dashboard"); 
            else 
            res.render("adminLoginPage.ejs");
        }
        else 
        res.render("adminLoginPage.ejs");
    }
    else
    res.render("adminLoginPage.ejs");
});

router.post('/login',handleAdminLogin);



// sooo client requests "/dashboard" --> comes to server --> goes thorough middleware (for checks and all , ki only if you are logged in then only forward , else go back) so basically ye secrutiy guard hai , isko bolte hai ki koi request aaegi toh ye ye sab karo pehle usks saath , maybe check his bag , check his ID card etc etc , metal detector and all.
// --> uske baad finally it goes to real server to get processed.


// MiddleWare
router.use('/dashboard',restrictToAdmin); //this is middleware (middleman samajhlo) // this is secruity CHECK
 
router.get('/dashboard',getAdminDashboard) // this is what to do when /dashboard is requested from frontend  //this is real processing



// getAdminDashboard   these are called controllers
// so they are in controllers folder





module.exports=router;