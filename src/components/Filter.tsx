import React from 'react';

interface FilterProps {
  onFilterChange: (transfers: number) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  return (
    <div>
      <label htmlFor="transfers">Количество пересадок: </label>
      <select
        id="transfers"
        onChange={(e) => onFilterChange(Number(e.target.value))}
      >
        <option value={0}>Без пересадок</option>
        <option value={1}>1 пересадка</option>
        <option value={2}>2 пересадки</option>
        <option value={3}>3 пересадки</option>
      </select>
    </div>
  );
};

export default Filter;
