import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const casinoData = [
  { option: '0', style: { backgroundColor: '#000000', textColor: '#FFFFFF' } },
  { option: '1', style: { backgroundColor: '#DC143C', textColor: '#FFFFFF' } },
  { option: '2', style: { backgroundColor: '#000000', textColor: '#FFFFFF' } },
  { option: '3', style: { backgroundColor: '#DC143C', textColor: '#FFFFFF' } },
  { option: '4', style: { backgroundColor: '#000000', textColor: '#FFFFFF' } },
  { option: '5', style: { backgroundColor: '#DC143C', textColor: '#FFFFFF' } },
  { option: '6', style: { backgroundColor: '#000000', textColor: '#FFFFFF' } },
  { option: '7', style: { backgroundColor: '#DC143C', textColor: '#FFFFFF' } },
  { option: '8', style: { backgroundColor: '#000000', textColor: '#FFFFFF' } },
  { option: '9', style: { backgroundColor: '#DC143C', textColor: '#FFFFFF' } },
  { option: '10', style: { backgroundColor: '#000000', textColor: '#FFFFFF' } },
  { option: '11', style: { backgroundColor: '#105015FF', textColor: '#FFFFFF' } },
];

const CasinoRoulette = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleWheelClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * casinoData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <div className="min-h-screen bg-green-800 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Party Roulette</h1>

      <div
        className="cursor-pointer"
        onClick={handleWheelClick}
      >
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={casinoData}
          onStopSpinning={() => setMustSpin(false)}
          backgroundColors={casinoData.map(item => item.style.backgroundColor)}
          textColors={casinoData.map(item => item.style.textColor)}
          fontSize={18}
          outerBorderColor="#DAA520"
          outerBorderWidth={10}
          innerRadius={15}
          innerBorderColor="#DAA520"
          innerBorderWidth={5}
          radiusLineColor="#DAA520"
          radiusLineWidth={3}
          textDistance={60}
          spinDuration={1.2}
        />
      </div>
    </div>
  );
};

export default CasinoRoulette;