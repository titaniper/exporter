import { Config } from "@/services/configs/domain/model";
import { initializeDataSource } from "..";

export default async function Home() {
    const dataSource = await initializeDataSource();
    const configRepository = dataSource.getRepository(Config);
    const configs = await configRepository.find();

    return (
        <main>
            <h1>Configs</h1>
            <ul>
                {configs.map(config => (
                    <li key={config.id}>{config.name}</li>
                ))}
            </ul>
        </main>
    );
}