import express from "express"
import bodyParser from "body-parser"
import headersMiddleware from "./middleware/headers"
import { createConnection } from './db/connection'

const app = express();

await createConnection()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(headersMiddleware);

app.disable("x-powered-by");

app.use(require("./routes"));

app.listen(8000, () => console.log("Listening on port 8000"));
