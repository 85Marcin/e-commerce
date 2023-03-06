import dotenv from "dotenv";
import connectToDatabase from "./database.js";
import express from "express";
//our routes
import productRoutes from "./routes/ProductRoutes.js";

dotenv.config();
connectToDatabase();
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});
