import express from "express";
import helmet from "helmet";
import apiRoutes from "./routes";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('combined'));

app.use('/api', apiRoutes);

export default app;
