exports.getAdminDashboard = async (req, res) => {
    try {
        
        res.render('adminDashboard');
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
