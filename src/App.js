import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
  const [isRolling, setIsRolling] = useState(true);
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

  const handleDiceClick = () => {
    if (isRolling) {
      const finalSide = Math.floor(Math.random() * 6) + 1;
      setCurrentSide(finalSide);
      setIsRolling(false);
    } else {
      setIsRolling(true);
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 font-sans">
        <div className="max-w-lg mx-auto">
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
              <Link to="/" className="bg-gray-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-600 transition-colors">Back</Link>
            </div>
            
            <div className="space-y-6 mb-8">
              {tempSides.map((side, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={side}
                    onChange={(e) => updateSide(index, e.target.value)}
                    className="w-full px-5 py-4 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none text-white text-xl"
                    placeholder={`Side ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={saveChanges}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
              >
                Save Changes
              </button>
              <button
                onClick={resetToDefault}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-lg font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105"
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
      <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border border-gray-700">
        <div className="mb-8">
          <img src="/party_dice.png" alt="Party Dice Logo" className="mx-auto" />
        </div>

        <div className="mb-8 perspective" onClick={handleDiceClick}>
          <Dice side={currentSide} isRolling={isRolling} diceSides={diceSides} />
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default PartyDiceApp;
