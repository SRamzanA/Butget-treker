import './DaysCounter.css'

export default function DaysCounter({ day, days }) {
    return (
        <div className="DaysCounter">День {day} из {days}</div>
    )
}