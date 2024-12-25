import React, { useState, useEffect, useMemo } from 'react';
import TicketList from './components/TicketList';
import Filter from './components/Filter';

type Ticket = {
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  carrier: string;
  stops: number;
  price: number;
};

const App: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [selectedTransfers, setSelectedTransfers] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD'); 

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/tickets.json');
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        const data = await response.json();
        setTickets(data.tickets);
        setFilteredTickets(data.tickets);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Неизвестная ошибка');
        }
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    if (selectedTransfers.length === 0) {
      setFilteredTickets(tickets); 
    } else {
      const filtered = tickets.filter(ticket => selectedTransfers.includes(ticket.stops));
      console.log('Выбранные фильтры пересадок:', selectedTransfers); 
      console.log('Отфильтрованные билеты:', filtered); 
      setFilteredTickets(filtered);
    }
  }, [selectedTransfers, tickets]);

  const sortedTickets = useMemo(() => {
    return [...filteredTickets].sort((a, b) => a.price - b.price);
  }, [filteredTickets]);

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  return (
    <div className="app">
    <h1 className="app__title">Выдача билетов</h1>
    {error && <p className="app__error" style={{ color: 'red' }}>{error}</p>}
    <div className="content">
      <div className="filters-container">
        <div className="currency-selector">
          <button 
            onClick={() => handleCurrencyChange('RUB')} 
            className={`currency-selector__button currency-selector__button--left ${selectedCurrency === 'RUB' ? 'active' : ''}`}
          >
            RUB
          </button>
          <button 
            onClick={() => handleCurrencyChange('USD')} 
            className={`currency-selector__button currency-selector__button--middle ${selectedCurrency === 'USD' ? 'active' : ''}`}
          >
            USD
          </button>
          <button 
            onClick={() => handleCurrencyChange('EUR')} 
            className={`currency-selector__button currency-selector__button--right ${selectedCurrency === 'EUR' ? 'active' : ''}`}
          >
            EUR
          </button>
        </div>
        <Filter onFilterChange={setSelectedTransfers} />
      </div>
      <div className="ticket-container">
        <TicketList tickets={sortedTickets} selectedCurrency={selectedCurrency} />
      </div>
    </div>
  </div>
  
  );
};

export default App;
