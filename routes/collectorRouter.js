const express = require("express");
const { restrictToCollector } = require("../middlewares/restrictToCollector");
const {handleCollectorLogin}=require("../controllers/collectorLoginController")
const {getCollectorDashboard,handleToll}=require("../controllers/collectorDashboardController")
const {verifyCookie} =require("../service/auth.js")


const router=express.Router()

router.get('/login',async(req,res)=>{
    const cookieGet=req.cookies.authToken
    
    if(cookieGet) 
    {
        
        const ParsedCookie= await verifyCookie(cookieGet)
        if(ParsedCookie){
            if (ParsedCookie.role=='collector')
            res.redirect("/collector/dashboard"); 
            
            else
            res.render("collectorLoginPage.ejs");
        }
        
    else
    res.render("collectorLoginPage.ejs");
    }
    else
    res.render("collectorLoginPage.ejs");
});

router.post('/login',handleCollectorLogin);







// MiddleWare
router.use('/dashboard',restrictToCollector);
router.use('/toll',restrictToCollector);




router.get('/dashboard',getCollectorDashboard)




router.post('/toll',handleToll);

module.exports=router;