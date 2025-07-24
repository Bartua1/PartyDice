import React, { useState, useEffect } from 'react';
import { Settings, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

const PartyDiceApp = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [isRolling, setIsRolling] = useState(false);
  const [currentSide, setCurrentSide] = useState(1);
  const [diceSides, setDiceSides] = useState([
    'Shot', 'Insta', 'Telef', 'Kiss', 'Hug', 'Punch'
  ]);

  // Load dice configuration from memory (simulating JSON file)
  useEffect(() => {
    const saved = localStorage.getItem('diceSides');
    if (saved) {
      try {
        setDiceSides(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading dice configuration');
      }
    }
  }, []);

  // Save dice configuration to memory
  const saveDiceConfig = (newSides) => {
    setDiceSides(newSides);
    localStorage.setItem('diceSides', JSON.stringify(newSides));
  };

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Animate rolling for 2 seconds
    const rollInterval = setInterval(() => {
      setCurrentSide(Math.floor(Math.random() * 6) + 1);
    }, 100);
    
    setTimeout(() => {
      clearInterval(rollInterval);
      const finalSide = Math.floor(Math.random() * 6) + 1;
      setCurrentSide(finalSide);
      setIsRolling(false);
    }, 2000);
  };

  const getDiceIcon = (side) => {
    const iconProps = { size: 120, className: "text-purple-600" };
    switch (side) {
      case 1: return <Dice1 {...iconProps} />;
      case 2: return <Dice2 {...iconProps} />;
      case 3: return <Dice3 {...iconProps} />;
      case 4: return <Dice4 {...iconProps} />;
      case 5: return <Dice5 {...iconProps} />;
      case 6: return <Dice6 {...iconProps} />;
      default: return <Dice1 {...iconProps} />;
    }
  };

  const AdminPanel = () => {
    const [tempSides, setTempSides] = useState([...diceSides]);

    const updateSide = (index, value) => {
      const newSides = [...tempSides];
      newSides[index] = value;
      setTempSides(newSides);
    };

    const saveChanges = () => {
      saveDiceConfig(tempSides);
      alert('Configuration saved!');
    };

    const resetToDefault = () => {
      const defaultSides = ['Shot', 'Insta', 'Telef', 'Kiss', 'Hug', 'Punch'];
      setTempSides(defaultSides);
      saveDiceConfig(defaultSides);
      alert('Reset to default configuration!');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
              <button
                onClick={() => setCurrentPath('/')}
                className="bg-gray-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              {tempSides.map((side, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={side}
                    onChange={(e) => updateSide(index, e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                    placeholder={`Side ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <button
                onClick={saveChanges}
                className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={resetToDefault}
                className="w-full bg-red-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition-colors"
              >
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MainApp = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex flex-col items-center justify-center p-4 relative">
      {/* Admin Button */}
      <button
        onClick={() => setCurrentPath('/admin')}
        className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-full hover:bg-opacity-30 transition-all"
      >
        <Settings size={24} className="text-white" />
      </button>

      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🎲 PartyDice
          </h1>
          <p className="text-gray-600 text-lg">Let the fun decide!</p>
        </div>

        {/* Dice Display */}
        <div className={`mb-8 transition-transform duration-100 ${isRolling ? 'animate-spin' : ''}`}>
          {getDiceIcon(currentSide)}
        </div>

        {/* Current Result */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isRolling ? 'Rolling...' : diceSides[currentSide - 1]}
            </h2>
            {!isRolling && (
              <p className="text-gray-600">Side {currentSide}</p>
            )}
          </div>
        </div>

        {/* Play Button */}
        <button
          onClick={rollDice}
          disabled={isRolling}
          className={`w-full py-4 rounded-xl font-bold text-xl transition-all transform ${
            isRolling
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 active:scale-95'
          }`}
        >
          {isRolling ? 'Rolling...' : '🎲 Roll the Dice!'}
        </button>
      </div>
    </div>
  );

  // Simple routing
  if (currentPath === '/admin') {
    return <AdminPanel />;
  }

  return <MainApp />;
};

export default PartyDiceApp;
