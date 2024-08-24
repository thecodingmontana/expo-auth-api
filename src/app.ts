import express, { Express } from "express";
import router from "./routes";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("tiny"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
