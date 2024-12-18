const collectors = require('../models/collectors');
const {generateCookieForcollector, verifyCookie}=require("../service/auth.js")



exports.handleCollectorLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log(username);
        console.log(password);
        const collector = await collectors.findOne({ username, password });
        console.log(collector);

        

        if (collector) {
            const cookie= await generateCookieForcollector(collector);
            
            res.cookie('authToken', cookie)
            
            res.redirect("/collector/dashboard");

        } else {
            res.status(401).redirect("/collector/login")
        }

    } catch (error) {
        console.log("I have no fucking IDea");
        res.status(500).send(error);
    }
};