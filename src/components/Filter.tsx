import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (transfers: number[]) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);

  const filterOptions = [
    { value: 0, label: 'Без пересадок' },
    { value: 1, label: '1 пересадка' },
    { value: 2, label: '2 пересадки' },
    { value: 3, label: '3 пересадки' },
  ];

  const handleCheckboxChange = (value: number, isChecked: boolean) => {
    const updatedFilters = isChecked
      ? [...selectedFilters, value]
      : selectedFilters.filter((filter) => filter !== value);
  
    setSelectedFilters(updatedFilters);
  
    if (typeof onFilterChange === 'function') {
      onFilterChange(updatedFilters);
    } else {
      console.error('onFilterChange не является функцией');
    }
  };
  
  return (
    <div className="filter">
    <p className="filter__title">Количество пересадок:</p>
    {filterOptions.map((option) => (
      <label key={option.value} className="filter__option">
        <input
          type="checkbox"
          value={option.value}
          checked={selectedFilters.includes(option.value)}
          onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
          className="filter__checkbox"
        />
        <span className="filter__label">{option.label}</span>
      </label>
    ))}
  </div>
  );
};

export default Filter;
