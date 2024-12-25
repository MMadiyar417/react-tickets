import React, { useState, useEffect } from 'react';

interface CurrencyConverterProps {
  priceInRUB: number;
  selectedCurrency: string;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ priceInRUB, selectedCurrency }) => {
  const [conversionRate, setConversionRate] = useState<number>(1);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/RUB`);
        const data = await response.json();
        const rate = data.rates[selectedCurrency];
        setConversionRate(rate);
      } catch (error) {
        console.error("Ошибка получения курса валют:", error);
      }
    };

    fetchConversionRate();
  }, [selectedCurrency]);

  const convertedPrice = (priceInRUB * conversionRate).toFixed(2);

  return <span>{convertedPrice} {selectedCurrency}</span>;
};

export default CurrencyConverter;
