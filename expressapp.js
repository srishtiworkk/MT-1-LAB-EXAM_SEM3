const express = require('express');

const app = express();

// Middleware
app.use(express.json());

// Vehicle Records
let vehicles = [
{
id: 1,
vehicleName: "Hyundai Creta",
vehicleNumber: "HR26AB1234",
type: "SUV",
price: 1500000
},
{
id: 2,
vehicleName: "Honda City",
vehicleNumber: "UP14CD5678",
type: "Sedan",
price: 1200000
},
{
id: 3,
vehicleName: "Maruti Swift",
vehicleNumber: "DL8CAF5030",
type: "Hatchback",
price: 750000
}
];

// GET - All Vehicles
app.get('/vehicles', (req, res) => {
res.json(vehicles);
})

// GET - Vehicle By ID
app.get('/vehicles/:id', (req, res) => {

const id = Number(req.params.id);

const vehicle = vehicles.find(v => v.id === id);

if (!vehicle) {
return res.status(404).json({
message: "Vehicle not found"
});
}

res.json(vehicle);
});

// POST - Add Vehicle
app.post('/vehicles', (req, res) => {

const { id, vehicleName, vehicleNumber, type, price } = req.body;

if (
id == null ||
!vehicleName ||
!vehicleNumber ||
!type ||
price == null ||
price === "" ||
!Number.isFinite(Number(price)) ||
Number(price) <= 0
) {
return res.status(400).json({
message: "Invalid vehicle details"
});
}

const vehicle = {
id: Number(id),
vehicleName,
vehicleNumber,
type,
price: Number(price)
};

vehicles.push(vehicle);

res.status(201).json({
message: "Vehicle added successfully",
vehicle: vehicle
});
});

// PUT - Update Vehicle
app.put('/vehicles/:id', (req, res) => {

const id = Number(req.params.id);

const vehicle = vehicles.find(v => v.id === id);

if (!vehicle) {
return res.status(404).json({
message: "Vehicle not found"
});
}

const { vehicleName, vehicleNumber, type, price } = req.body;

if (
!vehicleName ||
!vehicleNumber ||
!type ||
price == null ||
price === "" ||
!Number.isFinite(Number(price)) ||
Number(price) <= 0
) {
return res.status(400).json({
message: "Invalid vehicle details"
});
}

vehicle.vehicleName = vehicleName;
vehicle.vehicleNumber = vehicleNumber;
vehicle.type = type;
vehicle.price = Number(price);

res.json({
message: "Vehicle updated successfully",
vehicle: vehicle
});
});

// DELETE - Delete Vehicle
app.delete('/vehicles/:id', (req, res) => {

const id = Number(req.params.id);

const index = vehicles.findIndex(v => v.id === id);

if (index === -1) {
return res.status(404).json({
message: "Vehicle not found"
});
}

vehicles.splice(index, 1);

res.json({
message: "Vehicle deleted successfully"
});
});

// Start Server
app.listen(4000, () => {
console.log("Express Server running at http://localhost:4000");
});
