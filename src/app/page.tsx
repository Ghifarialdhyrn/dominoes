"use client";

import { useState } from "react";

const initialDominoes = [
  [2, 5],
  [6, 6],
  [1, 4],
  [3, 3],
  [0, 2],
  [5, 6],
  [4, 4],
  [0, 5],
  [1, 6],
  [2, 3],
];

export default function Home() {
  const [dominoes, setDominoes] = useState(initialDominoes);
  const [inputNumber, setInputNumber] = useState("");

  const countDoubleNumber = () => {
    return dominoes.filter(([a, b]) => a === b).length;
  };

  const handleSortAsc = () => {
    setDominoes(
      [...dominoes].sort((a, b) => {
        const sumA = a[0] + a[1];
        const sumB = b[0] + b[1];
        return sumA - sumB || a[0] - b[0] || a[1] - b[1];
      })
    );
  };

  const handleSortDesc = () => {
    setDominoes(
      [...dominoes].sort((a, b) => {
        const sumA = a[0] + a[1];
        const sumB = b[0] + b[1];
        return sumB - sumA || b[0] - a[0] || b[1] - a[1];
      })
    );
  };

  const handleFlip = () => {
    setDominoes(dominoes.map(([a, b]) => [b, a]));
  };

  const handleRemoveDup = () => {
    setDominoes((prevDominoes) => {
      const countMap = new Map();

      // Hitung jumlah kemunculan berdasarkan kombinasi dan total sum
      prevDominoes.forEach(([a, b]) => {
        const sortedKey = `${Math.min(a, b)},${Math.max(a, b)}`;
        const sumKey = a + b;

        countMap.set(sortedKey, (countMap.get(sortedKey) || 0) + 1);
        countMap.set(sumKey, (countMap.get(sumKey) || 0) + 1);
      });

      return prevDominoes.filter(([a, b]) => {
        const sortedKey = `${Math.min(a, b)},${Math.max(a, b)}`;
        const sumKey = a + b;

        if (countMap.get(sortedKey) > 1 || countMap.get(sumKey) > 1) {
          return false; // Hapus jika ada duplikat
        }

        return true;
      });
    });
  };

  const handleReset = () => {
    setDominoes(initialDominoes);
    setInputNumber("");
  };

  const handleRemoveNumber = () => {
    const num = parseInt(inputNumber);
    if (!isNaN(num)) {
      setDominoes(dominoes.filter(([a, b]) => a + b !== num));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[50%] bg-white shadow-lg p-6 rounded-md flex flex-col gap-2">
        <h1 className="text-3xl font-bold mb-2">Dominoes</h1>

        <div className="bg-gray-200 p-3 rounded-md mb-2 flex flex-col gap-4">
          <h2 className="font-semibold">Source</h2>
          <p>{JSON.stringify(initialDominoes)}</p>
        </div>

        <div className="bg-gray-200 p-3 rounded-md mb-2 flex flex-col gap-4">
          <h2 className="font-semibold">Double Numbers</h2>
          <p>{countDoubleNumber()}</p>
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {dominoes.map(([a, b], index) => (
            <div
              key={index}
              className="border-2 border-black p-2 text-center w-10 h-20 flex flex-col justify-center items-center gap-1"
            >
              <span>{a}</span>
              <hr className="w-full border-black my-1" />
              <span>{b}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSortAsc}
          >
            Sort (ASC)
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSortDesc}
          >
            Sort (DESC)
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleFlip}
          >
            Flip
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleRemoveDup}
          >
            Remove Dup
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="number"
            className="border px-3 py-2 rounded w-full"
            placeholder="Enter a number"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleRemoveNumber}
          >
            Remove
          </button>
        </div>

        <div className="text-center mt-4 text-gray-500 text-sm">
          © 2025 Ghifarialdhy Rahmansyah Nitikusumah
        </div>
      </div>
    </div>
  );
}
