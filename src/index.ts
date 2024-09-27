import { DataSource } from "typeorm"
import { Config } from "./services/configs/domain/model";
import "reflect-metadata"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "exporter",
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: true,
    entities: [Config],
})

export async function initializeDataSource() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource;
}