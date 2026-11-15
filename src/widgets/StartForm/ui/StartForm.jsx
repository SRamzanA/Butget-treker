import { useState } from 'react'
import Input from '../../../shared/Input/ui/Input'
import './StartForm.css'
import Button from '../../../shared/Button/ui/Button'
import Calendar from '../../../entities/Calendar/ui/Calendar'
import BudgetType from '../../../features/BudgetType/ui/BudgetType'

export default function StartForm({ setData }) {
    const [budget, setBudget] = useState('')
    const [days, setDays] = useState('')

    const [budgetType, setBudgetType] = useState('month')


    function startFormSubmit() {
        if (!budget || budget <= 0) {
            alert("Введите корректную сумму")
            return
        }

        if (!days || days <= 0) {
            alert("Введите корректное колличество дней")
            return
        }

        let finalMonthlyBudget = Number(budget)
        let dailyBudget = (budget / days).toFixed(2)

        if (budgetType === 'day') {
            finalMonthlyBudget = Number(budget) * Number(days)
            dailyBudget = Number(budget).toFixed(2)
        }



        setData({
            startDate: new Date().toISOString(), // Начальная дата
            expenseCategories: {     // Расходы
                supermarket: 0,      // Супермаркеты
                cafe: 0,             // Кафе, рестораны, фастфуд
                transport: 0,        // Транспорт
                household: 0,        // Товары для дома
                personal: 0,         // Личное
                other: 0             // Другое
            },

            incomeCategories: {      // Доходы
                scholarship: 0,      // Стипендия
                salary: 0,           // З/П
                transfer: 0,         // Перевод
                refund: 0,           // Возврат
                other: 0             // Другое
            },

            budget: finalMonthlyBudget, // Бюджет
            days: Number(days), // Кол-во дней
            dailyBudget: Number(dailyBudget), // Бюджет на день
            currentDay: 1, // Какой щас день

            cardBalance: finalMonthlyBudget, // Сколько на карте
            available: Number(dailyBudget), // Доступно

            spentToday: 0, // Потрачено сегодня
            remainingToday: Number(dailyBudget), // Осталось на день

            active: true
        })
    }

    return (
        <form
            className="start-ctr__form"
        >

            <BudgetType
                budgetType={budgetType}
                setBudgetType={setBudgetType}
            />

            <div className="form__field">
                <label>
                    {
                        budgetType == 'month' ? 'Сумма на месяц:'
                            :
                            budgetType == 'day' && 'Сумма на день:'
                    }
                </label>
                <Input
                    value={budget}
                    placeholder={'15000'}
                    setValue={setBudget}
                />
            </div>

            <div className="form__field">
                <label>Количество дней:</label>
                <Calendar
                    setDays={setDays}
                />
            </div>


            <Button
                className={'form__button'}
                func={startFormSubmit}
                text={'Начать месяц'}
            />


        </form>
    )
}