import React, { useState } from 'react';

const PartyRoulette = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const wheelData = [
    { option: 'Drink a shot', color: '#ef4444' },
    { option: 'Sing a song', color: '#1f2937' },
    { option: 'Tell a joke', color: '#ef4444' },
    { option: 'Do 10 pushups', color: '#1f2937' },
    { option: 'Dance for 1 minute', color: '#ef4444' },
    { option: 'Give a compliment', color: '#1f2937' },
    { option: 'Speak in an accent', color: '#ef4444' },
    { option: 'Do a magic trick', color: '#1f2937' },
    { option: 'Let someone draw on your face', color: '#ef4444' },
    { option: 'Post an embarrassing photo', color: '#1f2937' },
    { option: 'JACKPOT!', color: '#22c55e' },
  ];

  const segmentAngle = 360 / wheelData.length;

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    // Generate random rotation (multiple full rotations + random final position)
    const minSpins = 5;
    const maxSpins = 8;
    const spins = Math.random() * (maxSpins - minSpins) + minSpins;
    const finalRotation = rotation + (spins * 360);
    
    setRotation(finalRotation);

    // Calculate which segment we land on
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360;
      // Adjust for the fact that we want to know what's at the top (12 o'clock position)
      const adjustedRotation = (360 - normalizedRotation + (segmentAngle / 2)) % 360;
      const segmentIndex = Math.floor(adjustedRotation / segmentAngle);
      
      setSelectedPrize(wheelData[segmentIndex]);
      setIsSpinning(false);
      
      // Show marker for 1 second, then show modal
      setTimeout(() => {
        setShowModal(true);
      }, 1000);
    }, 3000);
  };

  const createWheelSegments = () => {
    return wheelData.map((item, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      
      // Calculate path for each segment
      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;
      
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      
      const x1 = 150 + 140 * Math.cos(startAngleRad);
      const y1 = 150 + 140 * Math.sin(startAngleRad);
      const x2 = 150 + 140 * Math.cos(endAngleRad);
      const y2 = 150 + 140 * Math.sin(endAngleRad);
      
      const pathData = [
        `M 150 150`,
        `L ${x1} ${y1}`,
        `A 140 140 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`
      ].join(' ');

      // Calculate text position
      const textAngle = startAngle + segmentAngle / 2;
      const textAngleRad = (textAngle * Math.PI) / 180;
      const textX = 150 + 80 * Math.cos(textAngleRad);
      const textY = 150 + 80 * Math.sin(textAngleRad);

      return (
        <g key={index}>
          <path
            d={pathData}
            fill={item.color}
            stroke="#4B5563"
            strokeWidth="2"
          />
          <text
            x={textX}
            y={textY}
            fill="white"
            fontSize="11"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${textAngle}, ${textX}, ${textY})`}
            style={{ 
              fontWeight: 'bold',
              textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
            }}
          >
            {item.option.length > 15 ? item.option.substring(0, 12) + '...' : item.option}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-800 text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">🎉 Party Roulette 🎉</h1>
      
      <div 
        className="relative w-4/5 max-w-lg cursor-pointer"
        onClick={handleSpin}
      >
        {/* Wheel */}
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 300 300" 
          className="drop-shadow-2xl"
          style={{ aspectRatio: '1 / 1' }}
        >
          <g 
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: '150px 150px',
              transition: isSpinning ? 'transform 3s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
            }}
          >
            {createWheelSegments()}
          </g>
          
          {/* Center circle */}
          <circle
            cx="150"
            cy="150"
            r="20"
            fill="#1f2937"
            stroke="#4B5563"
            strokeWidth="3"
          />
        </svg>
        
        {/* Top Pointer */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400 z-10 drop-shadow-lg"></div>
        
        {/* Landing Marker - shows after spin */}
        {!isSpinning && selectedPrize && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-red-600 drop-shadow-xl animate-pulse" 
                 style={{ filter: 'drop-shadow(0 0 10px rgba(220, 38, 38, 0.8))' }}></div>
            <div className="bg-red-600 text-white text-sm px-3 py-1 rounded-full mt-1 font-bold shadow-lg animate-bounce border-2 border-white">
              🎯 WINNER!
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedPrize && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full shadow-2xl transform animate-pulse">
            <div className="text-6xl mb-4">
              {selectedPrize.option === 'JACKPOT!' ? '🎊' : '🎯'}
            </div>
            <p className="text-xl text-gray-700 mb-6 font-semibold">
              {selectedPrize.option}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
            >
              ✅
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartyRoulette;