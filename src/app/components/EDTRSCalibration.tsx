import React from "react";
import { TestState } from "@/app/api/test/route";

const BASE_HEIGHT_MM = 7.27;

interface ETDRSComponentProps {
  scale: number; 
  testState: TestState;
  symbolType: string; 
}

export default function ETDRSComponent({ scale, testState, symbolType }: ETDRSComponentProps) {
  const { currentLogMar, currentSymbols } = testState;

  const symbolHeightPx = (BASE_HEIGHT_MM * Math.pow(10, currentLogMar)) / scale;

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="font-bold text-xl text-center text-black">ETDRS Chart</h2>
      <p className="text-gray-700">
        Current logMAR: <strong>{currentLogMar.toFixed(2)}</strong>
      </p>
      <div className="flex justify-center items-center space-x-4">
        {currentSymbols.map((symbol, idx) => (
          <img
            key={idx}
            src={`/e/${symbol}.svg`}
            alt={`${symbol}`}
            width={symbolHeightPx}
            height={symbolHeightPx}
          />
        ))}
      </div>
    </div>
  );
}