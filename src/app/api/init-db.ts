import { initializeDataSource } from '@/index';
import { Config } from '@/services/configs/domain/model';
import { NextResponse } from 'next/server';

export async function GET() {
    const dataSource = await initializeDataSource();
    const configRepository = dataSource.getRepository(Config);
    const configs = await configRepository.find();
    return NextResponse.json(configs);
}

export async function POST(request: Request) {
    const dataSource = await initializeDataSource();
    const configRepository = dataSource.getRepository(Config);
    const body = await request.json();
    const newConfig = configRepository.create(body);
    await configRepository.save(newConfig);
    return NextResponse.json(newConfig, { status: 201 });
}