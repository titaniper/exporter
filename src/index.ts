import "reflect-metadata"
import { DataSource } from "typeorm"
import { Config } from "./services/configs/domain/model";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3309,
    username: "root",
    password: "1234",
    database: "chaos",
    synchronize: true,
    logging: true,
    entities: [Config],
    // migrations: ["src/migration/**/*.ts"],
    // subscribers: ["src/subscriber/**/*.ts"],
})

export async function initializeDataSource() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource;
}