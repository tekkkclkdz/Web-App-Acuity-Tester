import React, { useState } from "react";

const ScaleSelector = () => {
  const [showModal, setShowModal] = useState(false);
  const [chosenScale, setChosenScale] = useState(null);

  const scales = ["LogMar", "Option 2", "Option 3", "Option 4"];

  const handleSelectScale = (scale) => {
    setChosenScale(scale);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <h1
        onClick={() => !chosenScale && setShowModal(true)}
        className={`text-xl font-bold mb-4 transition-all duration-500 cursor-pointer ${
          chosenScale ? "text-green-400" : "text-white hover:text-slate-400"
        }`}
      >
        {chosenScale ? `Chosen scale: ${chosenScale}` : "Choose scale"}
      </h1>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 w-80">
            <h2 className="text-lg font-semibold text-white text-center">
              Select a Scale
            </h2>
            <ul className="space-y-3">
              {scales.map((scale) => (
                <li key={scale}>
                  <button
                    onClick={() => handleSelectScale(scale)}
                    className="w-full px-4 py-2 text-left text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-lg focus:ring-2 focus:ring-blue-300"
                  >
                    {scale}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 px-4 py-2 text-center bg-red-500 text-white rounded-lg hover:bg-red-600"
            >Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScaleSelector;