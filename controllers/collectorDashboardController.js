exports.getCollectorDashboard = async (req, res) => {
    try {
        var lastThreeEntries;
        try {
             lastThreeEntries = await Toll.find({ collectorUsername: req.username }).sort({ dateTime: -1 }) .limit(3);
    
            
        } catch (error) {
            console.error('Error retrieving entries:', error);
        }
        
        // console.log(lastThreeEntries);

        res.render('collectorDashboard',{Username:req.username,entries:lastThreeEntries});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const {updateAdminDashSocket}=require("../sockets/updateAdminDashSocket")
const Toll = require('../models/tolls.js')
exports.handleToll=async(req,res)=>{
    // console.log(req.body);
    try {
        const newToll = await Toll.create({
            carNumber: req.body.carNumber,
            tollAmt: req.body.price,
            carType: req.body.carType,
            collectorUsername: req.username,
        });
        updateAdminDashSocket();
        // console.log('New toll entry created:', newToll);
    } catch (error) {
        console.error('Error creating toll entry:', error);
    }
    res.redirect('/collector/dashboard')
};