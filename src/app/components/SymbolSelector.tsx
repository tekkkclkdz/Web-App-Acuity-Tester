import React, { useState } from "react";

const LETTERS = ["D", "H", "K", "N", "O", "R", "S", "V", "Z"];
const E = ["E", "EL", "EU", "ED", "EU"];

type SymbolSelectorProps = {
  onSymbolSetChange: (symbols: string[]) => void;
};

const SymbolSelector: React.FC<SymbolSelectorProps> = ({ onSymbolSetChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [chosenSet, setChosenSet] = useState<string | null>(null);

  const symbolSets = [
    { name: "Default Symbols", value: LETTERS },
    { name: "E Symbols", value: E },
  ];

  const handleSelectSet = (set: { name: string; value: string[] }) => {
    setChosenSet(set.name);
    onSymbolSetChange(set.value);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Dynamic Heading */}
      <h1
        onClick={() => !chosenSet && setShowModal(true)}
        className={`text-xl font-bold mb-4 transition-all duration-500 cursor-pointer ${
          chosenSet ? "text-green-400" : "text-white hover:text-slate-400"
        }`}
      >
        {chosenSet ? `Chosen symbols: ${chosenSet}` : "Choose symbols"}
      </h1>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 w-80">
            <h2 className="text-lg font-semibold text-white text-center">
              Select a Symbol Set
            </h2>
            <ul className="space-y-3">
              {symbolSets.map((set) => (
                <li key={set.name}>
                  <button
                    onClick={() => handleSelectSet(set)}
                    className="w-full px-4 py-2 text-left text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-lg focus:ring-2 focus:ring-blue-300"
                  >
                    {set.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 px-4 py-2 text-center bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymbolSelector;