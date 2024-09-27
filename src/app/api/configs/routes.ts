// src/app/api/users/route.ts
import { AppDataSource } from '@/index'
import { Config } from '@/services/configs/domain/model'
import { NextResponse } from 'next/server'

export async function GET() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
    }

    const userRepository = AppDataSource.getRepository(Config)
    const users = await userRepository.find()

    return NextResponse.json(users)
}

export async function POST(request: Request) {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
    }

    const userRepository = AppDataSource.getRepository(Config)
    const body = await request.json()
    const user = userRepository.create(body)
    await userRepository.save(user)

    return NextResponse.json(user, { status: 201 })
}