"use client";

import { useEffect, useState } from "react";
import { TestState } from "@/app/api/test/route";
import ScaleSelector from "../components/ScaleSelector";
import SymbolSelector from "../components/SymbolSelector";

export default function DoctorPage() {
  const [testState, setTestState] = useState<TestState | null>(null);
  const [markedSymbols, setMarkedSymbols] = useState<number[]>([]);
  const [symbolSet, setSymbolSet] = useState<string[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch("/api/test")
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setTestState(data);
          } else {
            setTestState(null);
          }
        });
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const initializeTest = async () => {
    if (symbolSet.length === 0) {
      alert("Please select a symbol set first!");
      return;
    }

    const newRow = getRandomRow(symbolSet, 5);
    const newState: TestState = {
      symbolSet: symbolSet,
      currentLogMar: 1.0,
      currentSymbols: newRow,
      correctCount: 0,
      isTestComplete: false,
    };
    await postTestState(newState);
    setTestState(newState);
    setMarkedSymbols([]);
  };

  const markSymbol = async (symbolIndex: number, isCorrect: boolean) => {
    if (!testState) return;

    const updatedCount = isCorrect
      ? testState.correctCount + 1
      : testState.correctCount;

    const updatedState: TestState = {
      ...testState,
      correctCount: updatedCount,
    };
    await postTestState(updatedState);
    setTestState(updatedState);
    setMarkedSymbols((prev) => [...prev, symbolIndex]);
  };

  const nextRow = async () => {
    if (!testState) return;

    if (testState.correctCount >= 3) {
      const newLogMar = testState.currentLogMar - 0.1;
      const newRow = getRandomRow(testState.symbolSet, 5);
      const updatedState: TestState = {
        ...testState,
        currentLogMar: newLogMar,
        currentSymbols: newRow,
        correctCount: 0,
      };
      await postTestState(updatedState);
      setTestState(updatedState);
      setMarkedSymbols([]);
    } else {
      const finalLogMar =
        testState.currentLogMar -
        testState.correctCount / 50;

      const updatedState: TestState = {
        ...testState,
        isTestComplete: true,
        finalLogMar,
      };
      await postTestState(updatedState);
      setTestState(updatedState);
    }
  };

  const postTestState = async (newState: TestState) => {
    await fetch("/api/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newState),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black w-screen h-screen">
      <ScaleSelector />
      <SymbolSelector onSymbolSetChange={setSymbolSet} />
      <button
        className="text-xl font-bold hover:text-slate-400 active:text-green-600 transition-all duration-300"
        onClick={initializeTest}
      >
        {testState ? "Restart Test" : "Initialize Test"}
      </button>

      {!testState && (
        <div className="text-blue-400 italic mt-20">No test is currently running.</div>
      )}

      {testState && (
        <div className="justify-center text-center items-center w-full max-w-2xl bg-black rounded-lg p-6 shadow-md">
          <p className="mb-4">
            <strong>Current logMAR:</strong>{" "}
            <span className="text-teal-400">{testState.currentLogMar.toFixed(2)}</span>
          </p>
          <p className="mb-4">
            <strong>Correct Count:</strong>{" "}
            <span className="text-teal-400">{testState.correctCount}</span>
          </p>
          <p className="mb-4">
            <strong>Is Test Complete?</strong>{" "}
            <span className={testState.isTestComplete ? "text-green-500" : "text-red-500"}>
              {testState.isTestComplete ? "YES" : "NO"}
            </span>
          </p>

          {testState.isTestComplete && testState.finalLogMar !== undefined && (
            <p className="mb-4">
              <strong>Final logMAR:</strong>{" "}
              <span className="text-teal-400">{testState.finalLogMar.toFixed(2)}</span>
            </p>
          )}

          <div className="mt-4">
            <strong>Current Symbols:</strong>
            <div className="flex justify-center gap-4 mt-2">
              {testState.currentSymbols.map((symbol, idx) => (
                <span
                  key={idx}
                  className={`py-1 px-3 rounded shadow ${
                    markedSymbols.includes(idx) ? "bg-green-600 text-white" : "bg-gray-700 text-white"
                  }`}
                >
                  {symbol}
                </span>
              ))}
            </div>
          </div>

          {!testState.isTestComplete && (
            <div className="mt-6 space-y-3">
              <div className="flex gap-2 flex-wrap justify-center">
                {testState.currentSymbols.map((symbol, idx) => (
                  <button
                    key={idx}
                    className={`py-2 px-4 rounded-md shadow transition ${
                      markedSymbols.includes(idx)
                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-500 text-white"
                    }`}
                    onClick={() => markSymbol(idx, true)}
                    disabled={markedSymbols.includes(idx)}
                  >
                    Mark {symbol} as Correct
                  </button>
                ))}
              </div>

              <button
                className="bg-orange-500 hover:bg-orange-400 text-white py-2 px-6 rounded-md shadow-lg transition mt-4"
                onClick={nextRow}
              >
                Next Row
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function getRandomRow(symbolSet: string[], count: number): string[] {
  const shuffled = [...symbolSet].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}