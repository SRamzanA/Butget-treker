import { useState } from 'react'
import './DashboardPage.css'
import DaysCounter from '../../../entities/DaysCounter/ui/DaysCounter'
import BudgetStats from '../../../entities/BudgetStats/ui/BudgetStats'
import TransactionPanel from '../../../widgets/TransactionPanel/ui/TransactionPanel'
import StatsMenu from '../../../widgets/StatsMenu/ui/StatsMenu'

export default function DashboardPage({ data, setData }) {
    const [isStatsOpen, setIsStatsOpen] = useState(false)

    return (
        <>
            <div className="card">
                <div className="card__header">
                    <h1 className="card__title" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
                        Мой бюджет
                    </h1>
                    <button className="menu-btn" onClick={() => setIsStatsOpen(true)}>
                        ☰
                    </button>
                </div>
                
                <div style={{ borderBottom: '2px solid var(--border-color)', marginBottom: '1.5rem', marginTop: '1rem' }}></div>

                <DaysCounter
                    day={data.currentDay}
                    days={data.days}
                />

                <BudgetStats
                    data={data}
                />

                <TransactionPanel
                    data={data}
                    setData={setData}
                />
            </div>

            {isStatsOpen && (
                <StatsMenu 
                    data={data} 
                    onClose={() => setIsStatsOpen(false)} 
                />
            )}
        </>
    )
}