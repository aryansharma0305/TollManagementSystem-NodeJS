//IMPORTS
const express = require('express')
const path = require('path');
const mongoose =require('mongoose');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Toll=require("./models/tolls");
const updateAdminDashSocket=require("./sockets/updateAdminDashSocket")
// ==========================================================================================================

// Config Variables
const app = express()
const port = 3000


// ==========================================================================================================

//MONGO DB
mongoose.connect('mongodb://localhost:27017/toll_management_system').then(async () => {
    console.log('Connected to MongoDB');
});



// ==========================================================================================================

//Some Settings
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');



// ==========================================================================================================


//Using MiddleWares
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For JSON data
app.use(cookieParser());




// ==========================================================================================================


//Importing Routes
const collectorRouter=require("./routes/collectorRouter")
const adminRouter=require("./routes/adminRouter")



//Using Routes
app.use("/admin",adminRouter);
app.use("/collector",collectorRouter)




// ==========================================================================================================


// SOME PLAIN SIMPLE ROUTES
app.post("/logout",(req,res)=>{

  res.clearCookie('authToken'); 
  res.redirect('/');

});

app.get('/', (req, res) => {
  res.render("home.ejs")
})






// ==========================================================================================================

// MAIN-SERVER
const httpServer = createServer(app);





// IO-SERVER
var io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:3000",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

module.exports.io=io;


io.on('connection', async(socket) => {
  console.log('New client connected:', socket.id);
  console.log(`Total clients connected: ${io.engine.clientsCount}`);
  updateAdminDashSocket.updateAdminDashSocket();


});






// Start HTTP Server
httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

