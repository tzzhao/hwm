import { useEffect, useState } from 'react';
import { TimeRow } from './timerow/TimeRow';
import './TimeZone.css'
import { getTimeRowData } from './timeDataUtils';

export function TimeZone() {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now())
    }, 100);
    return () => {
      clearInterval(intervalId)
    }
  }, []);

  return (
    <div className="section">
      <header className="title">
        HWM Time to rewards
      </header>
      <div className="time-zone-container">
        {getTimeRowData(currentTime).map((item => {
          return <TimeRow key={item.label} time={item.time} label={item.label} minutesLeft={item.minutesLeft} />
        }))}
      </div>
    </div>
  );
}

