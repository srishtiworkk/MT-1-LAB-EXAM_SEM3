const http = require('http');
const fs = require('fs');

// Vehicle records
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
}
];

// Create HTTP Server
const server = http.createServer((req, res) => {

// Home Route
if (req.url === "/" && req.method === "GET") {
res.writeHead(200, {
"Content-Type": "text/html"
});
res.end("<h1>Welcome to Vehicle Management System</h1>");
}

// Get All Vehicles
else if (req.url === "/vehicles" && req.method === "GET") {
res.writeHead(200, {
"Content-Type": "application/json"
});
res.end(JSON.stringify(vehicles));
}

// About Route
else if (req.url === "/about" && req.method === "GET") {
res.writeHead(200, {
"Content-Type": "text/plain"
});
res.end("This is a Vehicle Management Application");
}

// Read HTML File
else if (req.url === "/info" && req.method === "GET") {

fs.readFile("public/info.html", (err, data) => {

if (err) {
res.writeHead(500, {
"Content-Type": "text/plain"
});
res.end("Error reading file");
}

else {
res.writeHead(200, {
"Content-Type": "text/html"
});
res.end(data);
}

});
}

// Add Vehicle
else if (req.url === "/add-vehicle" && req.method === "POST") {

let body = "";

req.on("data", chunk => {
body += chunk;
});

req.on("end", () => {

try {
const vehicle = JSON.parse(body);

if (
vehicle.id == null ||
!vehicle.vehicleName ||
!vehicle.vehicleNumber ||
!vehicle.type ||
vehicle.price == null ||
vehicle.price === ""
) {
res.writeHead(400);
res.end("All fields are required");
return;
}

vehicles.push(vehicle);

res.writeHead(201, {
"Content-Type": "application/json"
});

res.end(JSON.stringify({
message: "Vehicle added successfully",
vehicle: vehicle
}));

}

catch (error) {
res.writeHead(400);
res.end("Invalid JSON");
}

});
}

// Invalid Route
else {
res.writeHead(404, {
"Content-Type": "text/plain"
});
res.end("Page not found");
}

});

// Start Server
server.listen(3000, () => {
console.log("HTTP Server running at http://localhost:3000");
});
