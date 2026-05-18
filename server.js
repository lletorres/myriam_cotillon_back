const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const pedidosRoutes = require("./src/routes/pedidos.routes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/pedidos", pedidosRoutes);

app.get("/", (req, res) => {
  res.send({ message: "API de Myriam Golosinas funcionando" });
});

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});
