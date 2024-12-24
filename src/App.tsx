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
  const [transfers, setTransfers] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

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
    const filtered = tickets.filter(ticket => ticket.stops === transfers);
    setFilteredTickets(filtered);
  }, [transfers, tickets]);

  const sortedTickets = useMemo(() => {
    return filteredTickets.sort((a, b) => a.price - b.price);
  }, [filteredTickets]);

  return (
    <div>
      <h1>Turkish airlines</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Filter onFilterChange={setTransfers} />
      <TicketList tickets={sortedTickets} />
    </div>
  );
};

export default App;
