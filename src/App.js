import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';

const Dice = ({ side, isRolling, diceSides }) => {
  const getRotation = (side) => {
    switch (side) {
      case 1: return 'rotateX(0deg) rotateY(0deg)';
      case 2: return 'rotateX(-90deg) rotateY(0deg)';
      case 3: return 'rotateX(0deg) rotateY(90deg)';
      case 4: return 'rotateX(0deg) rotateY(-90deg)';
      case 5: return 'rotateX(90deg) rotateY(0deg)';
      case 6: return 'rotateX(180deg) rotateY(0deg)';
      default: return '';
    }
  };

  return (
    <div className={`dice ${isRolling ? 'rolling' : ''}`} style={{ transform: getRotation(side) }}>
      <div className="face front">{diceSides[0]}</div>
      <div className="face back">{diceSides[5]}</div>
      <div className="face top">{diceSides[4]}</div>
      <div className="face bottom">{diceSides[1]}</div>
      <div className="face left">{diceSides[3]}</div>
      <div className="face right">{diceSides[2]}</div>
    </div>
  );
};

const PartyDiceApp = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [isRolling, setIsRolling] = useState(false);
  const [currentSide, setCurrentSide] = useState(1);
  const [diceSides, setDiceSides] = useState([
    'Shot', 'Insta', 'Telef', 'Kiss', 'Hug', 'Punch'
  ]);

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

  const saveDiceConfig = (newSides) => {
    setDiceSides(newSides);
    localStorage.setItem('diceSides', JSON.stringify(newSides));
  };

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    setTimeout(() => {
      const finalSide = Math.floor(Math.random() * 6) + 1;
      setCurrentSide(finalSide);
      setIsRolling(false);
    }, 2000);
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
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4 font-sans">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800 rounded-3xl shadow-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
              <button
                onClick={() => setCurrentPath('/')}
                className="bg-gray-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              {tempSides.map((side, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={side}
                    onChange={(e) => updateSide(index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none text-white text-lg"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col items-center justify-center p-4 relative font-sans">
      <button
        onClick={() => setCurrentPath('/admin')}
        className="absolute top-4 right-4 bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-full hover:bg-opacity-20 transition-all"
      >
        <Settings size={24} className="text-white" />
      </button>

      <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border border-gray-700">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            🎲 PartyDice
          </h1>
          <p className="text-gray-400 text-lg">Let the fun decide!</p>
        </div>

        <div className="mb-8 perspective">
          <Dice side={currentSide} isRolling={isRolling} diceSides={diceSides} />
        </div>

        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isRolling ? 'Rolling...' : diceSides[currentSide - 1]}
            </h2>
            {!isRolling && (
              <p className="text-gray-400">Side {currentSide}</p>
            )}
          </div>
        </div>

        <button
          onClick={rollDice}
          disabled={isRolling}
          className={`w-full py-4 rounded-xl font-bold text-xl transition-all transform ${
            isRolling
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 active:scale-95'
          }`}
        >
          {isRolling ? 'Rolling...' : '🎲 Roll the Dice!'}
        </button>
      </div>
    </div>
  );

  if (currentPath === '/admin') {
    return <AdminPanel />;
  }

  return <MainApp />;
};

export default PartyDiceApp;
