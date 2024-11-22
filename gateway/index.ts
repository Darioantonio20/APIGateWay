import express, { Request, Response } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { gatewayHealthCheck } from "../src/interfaces/api-gateway/health-check";

const app = express();
const PORT = 3000;

app.use(express.json());

// Configuración del proxy para usuarios
app.use(
  "/gatewayUser",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
    pathRewrite: { "^/users": "/users" },
    onError: (err: Error, req: Request, res: Response) => {
      console.error("Error in Users Service Proxy:", err.message);
      res.status(500).send("Users service is unavailable.");
    },
  } as Options)
);

// Configuración del proxy para productos
app.use(
  "/gatewayProducts",
  createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: { "^/products": "/products" },
    onError: (err: Error, req: Request, res: Response) => {
      console.error("Error in Products Service Proxy:", err.message);
      res.status(500).send("Products service is unavailable.");
    },
  } as Options)
);

app.get("/health", gatewayHealthCheck);

app.get("/", (req, res) => {
  res.status(200).send("API Gateway is working!");
});

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});

export default app;