import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTransfers } from '../store/slice';
import { useTranslation } from 'react-i18next';

interface FilterProps {
  onFilterChange: (transfers: number[]) => void;
}

const Filter: React.FC<FilterProps> = () => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state: { app: { selectedTransfers: number[] } }) => state.app.selectedTransfers);
  const { t } = useTranslation();

  const filterOptions = [
    { value: 0, label: t('noStops') },
    { value: 1, label: t('oneStop') },
    { value: 2, label: t('twoStops') },
    { value: 3, label: t('threeStops') },
  ];

  useEffect(() => {
    if (selectedFilters.length > 0) {
      dispatch(setTransfers(selectedFilters)); 
    }
  }, [selectedFilters, dispatch]);

  const handleCheckboxChange = (value: number, isChecked: boolean) => {
    const updatedFilters = isChecked
      ? [...selectedFilters, value]
      : selectedFilters.filter((filter) => filter !== value);

    dispatch(setTransfers(updatedFilters));
  };

  return (
    <div className="filter">
      <p className="filter__title">{t('stops')}:</p>
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
