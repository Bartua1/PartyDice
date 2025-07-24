
import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState('');

  useEffect(() => {
    const savedOptions = localStorage.getItem('options');
    if (savedOptions) {
      setOptions(JSON.parse(savedOptions));
    }
  }, []);

  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      const updatedOptions = [...options, { option: newOption, id: Date.now(), style: { backgroundColor: 'black', textColor: 'white' } }];
      setOptions(updatedOptions);
      localStorage.setItem('options', JSON.stringify(updatedOptions));
      setNewOption('');
    }
  };

  const handleDeleteOption = (id) => {
    const updatedOptions = options.filter(option => option.id !== id);
    setOptions(updatedOptions);
    localStorage.setItem('options', JSON.stringify(updatedOptions));
  };

  return (
    <div>
      <h1>Admin - Roulette Options</h1>
      <div>
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Add new option"
        />
        <button onClick={handleAddOption}>Add</button>
      </div>
      <ul>
        {options.map((option) => (
          <li key={option.id}>
            {option.option}
            <button onClick={() => handleDeleteOption(option.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
