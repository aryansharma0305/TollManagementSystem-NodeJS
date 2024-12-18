const Toll = require("../models/tolls");
const  io  = require("../app");

exports.updateAdminDashSocket = async () => {
    try {
        const Last5Entries = await Toll.find().sort({ dateTime: -1 }).limit(5);
        const AllEntries = await Toll.find().sort({ dateTime: -1 });
        const cars = (await Toll.find({ carType: "car" })).length;
        const motorcycles = (await Toll.find({ carType: "motorcycle" })).length;
        const buses = (await Toll.find({ carType: "bus" })).length;
        const trucks = (await Toll.find({ carType: "truck" })).length;

        let revenue = 0;
        AllEntries.forEach((element) => {
            revenue += element.tollAmt;
        });


        const DataToSend = {
            carsCount: cars,
            trucksCount: trucks,
            busesCount: buses,
            motorcyclesCount: motorcycles,
            last5: Last5Entries,
            totalRevenue: revenue,
        };

        // Emit data to all connected clients
        // console.log(io);
        io.io.emit("newData", DataToSend);
    } catch (error) {
        console.error("Error updating admin dashboard:", error);
    }
};
