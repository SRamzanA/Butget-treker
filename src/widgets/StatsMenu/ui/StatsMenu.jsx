import { useState, useEffect } from 'react'
import { DateRange } from 'react-date-range'
import { ru } from 'date-fns/locale'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './StatsMenu.css'

function DonutChart({ title, categories, colorMap, labels }) {
    const total = Object.values(categories).reduce((acc, val) => acc + val, 0)

    let currentAngle = 0
    const gradientParts = []

    Object.entries(categories).forEach(([key, value]) => {
        if (value > 0) {
            const angle = (value / total) * 360
            gradientParts.push(`${colorMap[key]} ${currentAngle}deg ${currentAngle + angle}deg`)
            currentAngle += angle
        }
    })

    const background = total === 0
        ? 'conic-gradient(#e5e7eb 0deg 360deg)'
        : `conic-gradient(${gradientParts.join(', ')})`

    return (
        <div className="donut-chart">
            <h3 className="donut-chart__title">{title}</h3>
            <div className="donut-chart__circle" style={{ background }}>
                <div className="donut-chart__inner">
                    <span className="donut-chart__total">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
            </div>

            <div className="donut-chart__legend">
                {Object.entries(categories).map(([key, value]) => {
                    if (value === 0) return null
                    const percent = ((value / total) * 100).toFixed(0)
                    return (
                        <div key={key} className="legend-item">
                            <span className="legend-color" style={{ backgroundColor: colorMap[key] }}></span>
                            <span className="legend-text">
                                {labels[key]}: <strong>{value.toLocaleString('ru-RU')} ₽</strong> ({percent}%)
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default function StatsMenu({ data, onClose }) {
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    useEffect(() => {
        const startDate = data.startDate ? new Date(data.startDate) : new Date()
        
        const endDate = new Date(startDate)
        endDate.setDate(startDate.getDate() + (data.currentDay - 1))

        setRange([
            {
                startDate: startDate,
                endDate: endDate,
                key: 'selection'
            }
        ])
    }, [data.currentDay, data.startDate])

    const expenseLabels = {
        supermarket: 'Супермаркеты',
        cafe: 'Кафе и рестораны',
        transport: 'Транспорт',
        household: 'Товары для дома',
        personal: 'Личное',
        other: 'Другое'
    }

    const incomeLabels = {
        scholarship: 'Стипендия',
        salary: 'З/П',
        transfer: 'Перевод',
        refund: 'Возврат',
        other: 'Другое'
    }

    const expenseColors = {
        supermarket: '#2563eb',
        cafe: '#dc2626',
        transport: '#059669',
        household: '#d97706',
        personal: '#7c3aed',
        other: '#6b7280'
    }

    const incomeColors = {
        scholarship: '#059669',
        salary: '#2563eb',
        transfer: '#7c3aed',
        refund: '#d97706',
        other: '#6b7280'
    }

    return (
        <div className="stats-overlay" onClick={onClose}>
            <div className="stats-menu" onClick={e => e.stopPropagation()}>
                <div className="stats-menu__header">
                    <h2>Статистика</h2>
                    <button className="stats-menu__close" onClick={onClose}>✕</button>
                </div>

                <div className="stats-menu__content">
                    <div className="stats-calendar-preview">
                        <DateRange
                            ranges={range}
                            onChange={() => { }}
                            locale={ru}
                            className="readonly-calendar"
                            months={1} 
                            direction="horizontal"
                        />
                    </div>

                    <div className="stats-charts">
                        <DonutChart
                            title="Расходы"
                            categories={data.expenseCategories}
                            colorMap={expenseColors}
                            labels={expenseLabels}
                        />
                        <DonutChart
                            title="Доходы"
                            categories={data.incomeCategories}
                            colorMap={incomeColors}
                            labels={incomeLabels}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}