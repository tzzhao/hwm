export const REWARD_TIME = 20;

const TIMEZONES: number[] = [];
for (let i: number = -11; i<=12; i++) {
  TIMEZONES.push(i);
}

export function getTimeRowData(currentTime: number) {
  return TIMEZONES.map((timeDiff) => {
    const localTime = currentTime + timeDiff * 60 * 60 * 1000;
    const localDate = new Date(localTime);
    const hours = localDate.getUTCHours();
    const minutes = localDate.getUTCMinutes();
    const seconds = localDate.getUTCSeconds();
    const time = `${padZeros(hours)}:${padZeros(minutes)}:${padZeros(seconds)}`;
    return {
      minutesLeft: getMinutesLeft(hours, minutes),
      time,
      label: getLabel(timeDiff)
    }
  }).sort((a,b) => a.minutesLeft - b.minutesLeft)
}

function padZeros(time: number) {
  let res = `${time}`;
  if (time < 10) {
    res = '0' + res;
  }
  return res;
}

function getMinutesLeft(hours: number, minutes: number) {
  return ((REWARD_TIME - hours + 24) * 60 - minutes - 1) % (24*60);
}

function getLabel(timeDiff: number) {
  if (timeDiff <= -10) {
    return `GMT${timeDiff}/+${timeDiff + 24}`;
  }
  return `GMT${timeDiff < 0? timeDiff : `+${timeDiff}`}`;
}
