import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TicketList from './components/TicketList';
import Filter from './components/Filter';
import { setCurrency, setTransfers } from './store/slice';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

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
  const { t } = useTranslation(); // Изменение здесь
  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state: { app: { selectedCurrency: string } }) => state.app.selectedCurrency);
  const selectedTransfers = useSelector((state: { app: { selectedTransfers: number[] } }) => state.app.selectedTransfers);
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = React.useState<Ticket[]>([]);
  const [error, setError] = React.useState<string | null>(null);

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
      setFilteredTickets(filtered);
    }
  }, [selectedTransfers, tickets]);

  const sortedTickets = useMemo(() => {
    return [...filteredTickets].sort((a, b) => a.price - b.price);
  }, [filteredTickets]);

  const handleCurrencyChange = (currency: string) => {
    dispatch(setCurrency(currency));
  };

  const handleFilterChange = (transfers: number[]) => {
    dispatch(setTransfers(transfers));
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).catch((error) => {
      console.error('Ошибка смены языка:', error);
    });
  };

  return (
    <div className="app">
      <h1 className="app__title">{t('React Tickets')}</h1>
      {error && <p className="app__error" style={{ color: 'red' }}>{error}</p>}
      <div className="content">
        <div className="filters-container">
          <div className="currency-selector">
            <button onClick={() => handleCurrencyChange('RUB')} className={`currency-selector__button currency-selector__button--left ${selectedCurrency === 'RUB' ? 'active' : ''}`}>
              RUB
            </button>
            <button onClick={() => handleCurrencyChange('USD')} className={`currency-selector__button currency-selector__button--middle ${selectedCurrency === 'USD' ? 'active' : ''}`}>
              USD
            </button>
            <button onClick={() => handleCurrencyChange('EUR')} className={`currency-selector__button currency-selector__button--right ${selectedCurrency === 'EUR' ? 'active' : ''}`}>
              EUR
            </button>
          </div>
          <div className="language-selector">
            <span>{t('language')}:</span> 
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('ru')}>RU</button>
          </div>
          <Filter onFilterChange={handleFilterChange} />
        </div>
        <div className="ticket-container">
          <TicketList tickets={sortedTickets} selectedCurrency={selectedCurrency} />
        </div>
      </div>
    </div>
  );
};

export default App;
