import React, { useState, useEffect } from 'react'; // Import useEffect

import { Wheel } from 'react-custom-roulette';

const casinoData = [
  { option: 'Pico', style: { backgroundColor: '#000000', textColor: '#FFFFFF' } },
  { option: 'Hostia', style: { backgroundColor: '#DC143C', textColor: '#FFFFFF' } },
  { option: 'IG', style: { backgroundColor: '#000000', textColor: '#FFFFFF' } },
  { option: 'Verdad', style: { backgroundColor: '#DC143C', textColor: '#FFFFFF' } },
  { option: 'Baile loco', style: { backgroundColor: '#000000', textColor: '#FFFFFF' } },
  { option: 'Flexión', style: { backgroundColor: '#DC143C', textColor: '#FFFFFF' } },
  { option: 'Imitación', style: { backgroundColor: '#000000', textColor: '#FFFFFF' } },
  { option: 'Abrazo', style: { backgroundColor: '#DC143C', textColor: '#FFFFFF' } },
  { option: 'Reto', style: { backgroundColor: '#000000', textColor: '#FFFFFF' } },
  { option: 'Selfie', style: { backgroundColor: '#DC143C', textColor: '#FFFFFF' } },
  { option: 'Teléfono', style: { backgroundColor: '#000000', textColor: '#FFFFFF' } },
  { option: 'Chupito', style: { backgroundColor: '#105015FF', textColor: '#FFFFFF' } },
];

const CasinoRoulette = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [wheelSize, setWheelSize] = useState(0); // New state for dynamic size

  // useEffect to calculate wheel size based on window width
  useEffect(() => {
    const calculateWheelSize = () => {
      // Calculate 90% of the viewport width
      let size = window.innerWidth * 0.9;

      // Optional: Add a maximum size for desktop screens
      // This prevents the wheel from becoming too big on very wide monitors.
      const MAX_WHEEL_SIZE = 550; // Max width in pixels (adjust as needed)
      if (size > MAX_WHEEL_SIZE) {
        size = MAX_WHEEL_SIZE;
      }
      setWheelSize(size);
    };

    calculateWheelSize(); // Set initial size on component mount

    // Add event listener for window resize to update the size
    window.addEventListener('resize', calculateWheelSize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', calculateWheelSize);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const handleWheelClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * casinoData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  // Optionally, you can render a loading state until wheelSize is calculated
  if (wheelSize === 0) {
    return (
      <div className="min-h-screen bg-green-800 flex items-center justify-center text-white">
        Loading roulette...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-800 flex flex-col items-center justify-center p-4"> {/* Added p-4 for general padding */}
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Party Roulette</h1> {/* Added text-center for good measure */}
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
          width={wheelSize}
          height={wheelSize}
        />
      </div>
    </div>
  );
};

export default CasinoRoulette;