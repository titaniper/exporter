import { MetricService } from '@/services/metrics/application/service';
import { NextResponse } from 'next/server'
import Container from 'typedi';
import 'reflect-metadata';

export async function POST(request: Request) {
    const requestBody = await request.json();
    const metricService = Container.get(MetricService); 
    metricService.set(requestBody.value);
    return NextResponse.json({}, { status: 201 })
}

export async function GET() {
    const metricService = Container.get(MetricService);
    const result = await metricService.getMetrics();
    return new Response(result, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}