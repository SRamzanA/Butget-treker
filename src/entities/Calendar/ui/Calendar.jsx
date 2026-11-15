import { useState } from 'react'
import { DateRange } from 'react-date-range'
import { differenceInDays } from 'date-fns'
import { ru } from 'date-fns/locale';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './Calendar.css'

export default function Calendar({ setDays }) {
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    const handleSelect = (item) => {
        setRange([item.selection])

        const start = item.selection.startDate
        const end = item.selection.endDate
        const days = differenceInDays(end, start) + 1

        console.log('Дней:', days)

        setDays(days)
    }

    return (
        <div className="calendar-wrapper">
            <DateRange
                editableDateInputs={true}
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                ranges={range}
                months={1}
                direction="vertical"
                minDate={new Date()}
                locale={ru}
            />
        </div>
    )
}