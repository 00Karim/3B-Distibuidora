
const rutas = require("./routes/index.js");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./server.js");

dotenv.config()

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigin = process.env.CORS_ORIGIN;

    if (process.env.NODE_ENV === "development") {
      // En dev permitimos todo
      callback(null, true);
    } else {
      // En prod solo permitimos EL FRONTEND REAL
      if (!origin || origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  credentials: true,
};


connectDB()


const app = express()

// middleware de CORS:
// desarrollo: permite cualquier origen (localhost, Postman, etc.)
// prod: solo permite el origen que definimos en CORS_ORIGIN
// de esta forma nos aseguramos que el back solo pueda ser consumido por el origen legitimo que definimos nosotros.
app.use(cors(corsOptions)); 

app.use(express.json()) // parsea el json para que sea legible y lo convierte en el objeto req.body

app.use("/api", rutas);

const PORT = process.env.PORT || 4000;

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
});
// Users
// app.use("/users/api/products", cors({ origin: "http://localhost:3000", methods: ["GET"] }));

// Employees
// app.use("/employees/api/products", cors({ origin: "http://localhost:3000", methods: ["GET"] }));

// Admins
// app.use("/admins/api/products", cors({ origin: "http://localhost:3000", methods: ["GET", "POST", "DELETE", "PUT"] }));