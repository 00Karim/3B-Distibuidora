const express = require("express");
const cors = require("cors");
const connectDB = require("./server.js");
const rutas = require("./routes/index.js");

connectDB()


const app = express()

app.use(express.json()) // parsea el json para que sea legible y lo convierte en el objeto req.body

app.use("/api", rutas);

const PORT = process.env.PORT || 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
});
// Users
// app.use("/users/api/products", cors({ origin: "http://localhost:3000", methods: ["GET"] }));

// Employees
// app.use("/employees/api/products", cors({ origin: "http://localhost:3000", methods: ["GET"] }));

// Admins
// app.use("/admins/api/products", cors({ origin: "http://localhost:3000", methods: ["GET", "POST", "DELETE", "PUT"] }));