import express from "express";
import errorHandlerMiddleware from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;

app.use(errorHandlerMiddleware);
