import express from "express";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/v1", userRoutes);

app.use(errorHandlerMiddleware);

export default app;
