import React from 'react';
import CurrencyConverter from './CurrencyConverter';
import { useTranslation } from 'react-i18next';

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

function getTransferText(count: number, t: (key: string) => string) {
  if (count === 0) return t('noStops');

  if (count === 1) {
    return `${t('oneStop')}`; 
  }

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits > 10 && lastTwoDigits < 20) {
    return `${t('stops')}`; 
  }

  if (lastDigit === 1) {
    return ` ${t('oneStop')}`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return ` ${t('twoStops')}`;
  }

  return `${t('threeStops')}`;
}


function formatDate(dateString: string, months: string[], weekDays: string[]) {
  const [day, month, year] = dateString.split('.'); 
  const fullYear = `20${year}`;
  const monthName = months[parseInt(month, 10) - 1];
  const date = new Date(`${fullYear}-${month}-${day}`);
  const weekDay = weekDays[date.getDay()]; 
  return `${day} ${monthName} ${fullYear}, ${weekDay}`;
}

const TicketList: React.FC<{ tickets: Ticket[], selectedCurrency: string }> = ({ tickets, selectedCurrency }) => {
  const { t } = useTranslation();
  
  const months: string[] = t('months', { returnObjects: true }) as string[];
  const weekDays: string[] = t('weekDays', { returnObjects: true }) as string[];

  return (
    <div className="ticket-list">
      {tickets.length > 0 ? (
        tickets.map(ticket => (
          <div
            className="ticket"
            key={`${ticket.origin}-${ticket.destination}-${ticket.departure_time}-${ticket.carrier}`}
          >
            <div className="ticket__left">
              <div className="ticket__logo">
                <img src={`https://1000logos.net/wp-content/uploads/2020/04/Turkish_Airlines_logo-800x450.png`} alt={ticket.carrier} />
              </div>
              <button className="ticket__buy-button">
                {t('buyFor')} <CurrencyConverter priceInRUB={ticket.price} selectedCurrency={selectedCurrency} />
              </button>
            </div>
            <div className="ticket__right">
              <div className="ticket__details">
                <p className="ticket__departure-time">{ticket.departure_time}</p>
                <p className="ticket__location">{ticket.origin}, {ticket.origin_name}</p>
                <p className="ticket__date">{formatDate(ticket.departure_date, months, weekDays)}</p>
              </div>
              <div className="ticket__transfers">
                <p className="ticket__transfer-info">{getTransferText(ticket.stops, t)}</p>
              </div>
              <div className="ticket__details">
                <p className="ticket__arrival-time">{ticket.arrival_time}</p>
                <p className="ticket__location">{ticket.destination}, {ticket.destination_name}</p>
                <p className="ticket__date">{formatDate(ticket.arrival_date, months, weekDays)}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="ticket-list__empty">{t('noTickets')}</p>
      )}
    </div>
  );
};

export default TicketList;
