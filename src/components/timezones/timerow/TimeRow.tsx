import './TimeRow.css'

export interface TimeRowProps {
    time: string,
    label: string,
    minutesLeft: number
}

export const TimeRow = (props: TimeRowProps) => {
    const color = getHslColor(props.minutesLeft);
    return <div className="row">
        <div className="label" style={{backgroundColor: color}}>{props.label}</div>
        <div className='time' style={{backgroundColor: color}}>{props.time}</div>
    </div>
}

const MAX_MINUTES_LEFT = 4 * 60;
const red = 0;
const green = 120;

function getHslColor(minutesLeft: number, start:number = red, end: number = green) {
    const left = Math.min(MAX_MINUTES_LEFT, minutesLeft);
    const percent = left / MAX_MINUTES_LEFT;
    return `hsl(${Math.round(percent * (end - start))}deg 100% 50% / 70%)`
}