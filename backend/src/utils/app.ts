import express from "express";
import cors from "cors";

// Initialize the express-server and apply middlewares.
const app = express();

app.use(express.static("build"));
app.use(cors());

export default app;