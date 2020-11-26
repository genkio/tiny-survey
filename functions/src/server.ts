import App from "./app";
import { ResponseController, SurveyController } from "./app/controllers";
import Firestore from "./database/firestore";

const database = new Firestore();

const { app } = new App([
  new ResponseController(database),
  new SurveyController(database),
]);

export default app;
