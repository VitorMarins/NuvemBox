import { App } from "./app.js";
import "reflect-metadata";
import "dotenv/config";

const app = new App();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.Start(PORT);
