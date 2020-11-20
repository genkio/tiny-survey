import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import Routers from "./routers";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use("/health", Routers.HealthRouter());

export default app;
