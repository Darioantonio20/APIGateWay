import express from "express";

const app = express();
app.use(express.json());

// Define rutas de ejemplo
app.get("/", (req, res) => {
  res.status(200).send("Service is working!");
});

app.get("/example", (req, res) => {
  res.status(200).json({ message: "Hello from Service" });
});

// Define el puerto
const PORT = process.env.PORT || 3001; // Cambiar a 3002 para productos

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Service running on http://localhost:${PORT}`);
});

export default app;
