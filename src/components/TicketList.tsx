import React from 'react';

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

const TicketList: React.FC<{ tickets: Ticket[] }> = ({ tickets }) => {
  return (
    <div>
      {tickets.length > 0 ? (
        tickets.map(ticket => (
          <div key={`${ticket.origin}-${ticket.destination}-${ticket.departure_time}-${ticket.price}`}>
            <p>Из: {ticket.origin_name} ({ticket.origin})</p>
            <p>В: {ticket.destination_name} ({ticket.destination})</p>
            <p>Дата отправления: {ticket.departure_date} {ticket.departure_time}</p>
            <p>Время отправления: {ticket.departure_time} </p>
            <p>Дата прибытия: {ticket.arrival_date} </p>
            <p>Время прибытия: {ticket.arrival_time}</p>
            <p>Авиакомпания: {ticket.carrier}</p>
            <p>Пересадки: {ticket.stops}</p>
            <p>Цена: {ticket.price}₽</p>
          </div>
        ))
      ) : (
        <p>Нет билетов, удовлетворяющих фильтрам.</p>
      )}
    </div>
  );
};

export default TicketList;
