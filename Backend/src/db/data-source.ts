import "reflect-metadata";
import { DataSource } from "typeorm";
// import { Usuario, Arquivo } from "../models/index.js";
import 'dotenv/config';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    entities: ["src/models/*.ts"],
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: process.env.DB_LOGGING === "true",
});