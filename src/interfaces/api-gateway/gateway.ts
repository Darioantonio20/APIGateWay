import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { gatewayHealthCheck } from "./health-check";

const app = express();
app.use(express.json());

app.use("/users", createProxyMiddleware({
  target: "http://localhost:3001",
  changeOrigin: true,
  pathRewrite: {
    "^/users": "/users",
  },
}));

app.use("/products", createProxyMiddleware({
  target: "http://localhost:3002",
  changeOrigin: true,
  pathRewrite: {
    "^/products": "/products",
  },
}));

app.get("/health", gatewayHealthCheck);

export default app;