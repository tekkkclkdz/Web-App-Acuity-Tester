import { NextRequest, NextResponse } from "next/server";

export interface TestState {
    symbolSet: string[];
    currentLogMar: number;
    currentSymbols: string[];
    correctCount: number;
    isTestComplete: boolean;
    finalLogMar?: number; 
  }

let testState: TestState | null = null

export async function GET() {
    if (!testState) {
        return NextResponse.json({ error: "No test atm"}, { status: 404 })
    }
    return NextResponse.json(testState)
}

export async function POST(request: NextRequest) {
    const newState = (await request.json()) as TestState
    testState = newState
    return NextResponse.json({ success: true })
  }
