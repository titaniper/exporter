// src/app/api/users/route.ts
import { NextResponse } from 'next/server'
import { AppDataSource } from '../../../database/data-source'
import { User } from '../../../entity/User'

export async function GET() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
    }

    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    return NextResponse.json(users)
}

export async function POST(request: Request) {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
    }

    const userRepository = AppDataSource.getRepository(User)
    const body = await request.json()
    const user = userRepository.create(body)
    await userRepository.save(user)

    return NextResponse.json(user, { status: 201 })
}