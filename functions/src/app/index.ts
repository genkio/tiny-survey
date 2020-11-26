import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import { errorHandler } from "./middleware";

interface IController {
  router: express.Router;
  intializeRoutes: () => void;
}

export default class App {
  public app: express.Application;

  constructor(controllers: IController[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandler();
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(compression());
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeErrorHandler() {
    this.app.use(errorHandler);
  }
}
