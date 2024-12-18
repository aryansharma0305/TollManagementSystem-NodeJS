const admins = require('../models/admins');
const {generateCookieForAdmin}=require("../service/auth.js")


exports.handleAdminLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await admins.findOne({ username, password });
        if (admin) {
            const cookie= await generateCookieForAdmin(admin);
        
            res.cookie('authToken', cookie)
            
            res.redirect("/admin/dashboard");
        } else {
            res.status(401).redirect("/admin/login")
        }
    } catch (error) {
        res.status(500).send(error);
    }
};