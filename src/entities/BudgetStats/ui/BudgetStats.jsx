import InfoRow from '../../../shared/InfoRow/ui/InfoRow'
import './BudgetStats.css'

export default function BudgetStats({ data }) {

    return (
        <div className="info-block">

            <InfoRow
                title={"На карте:"}
                amount={data.cardBalance}
            />
            
            <InfoRow
                title={"Бюджет на день:"}
                amount={data.dailyBudget}
            />

            <InfoRow
                style={{color: 'var(--color-green)'}}
                valueStyle={{fontSize: '1.2rem'}}
                title={"Доступно:"}
                amount={data.available}
            />

            <InfoRow
                style={{color: 'var(--color-red)'}}
                title={"Потрачено сегодня:"}
                amount={data.spentToday}
            />

            <InfoRow
                title={"Осталось на день:"}
                amount={data.remainingToday}
            />

        </div>
    )
}