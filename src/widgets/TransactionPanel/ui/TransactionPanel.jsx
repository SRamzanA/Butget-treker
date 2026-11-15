import { useState } from 'react'
import Button from '../../../shared/Button/ui/Button'
import './TransactionPanel.css'
import CategorySelector from '../../../features/CategorySelector/ui/CategorySelector'

export default function TransactionPanel({ data, setData }) {
    const [amount, setAmount] = useState('')

    const [showExpense, setShowExpense] = useState(false)
    const [showIncome, setShowIncome] = useState(false)

    const expenseCats = [
        { value: 'supermarket', label: 'Супермаркеты' },
        { value: 'cafe', label: 'Кафе и рестораны' },
        { value: 'transport', label: 'Транспорт' },
        { value: 'household', label: 'Товары для дома' },
        { value: 'personal', label: 'Личное' },
        { value: 'other', label: 'Другое' }
    ]

    const incomeCats = [
        { value: 'scholarship', label: 'Стипендия' },
        { value: 'salary', label: 'З/П' },
        { value: 'transfer', label: 'Перевод' },
        { value: 'refund', label: 'Возврат' },
        { value: 'other', label: 'Другое' }
    ]

    function handleExpenseClick() {
        const num = Number(amount)
        if (!num || num <= 0) return alert('Введите сумму больше 0')
        setShowExpense(true)
        setShowIncome(false)
    }

    function handleIncomeClick() {
        const num = Number(amount)
        if (!num || num <= 0) return alert('Введите сумму больше 0')
        setShowIncome(true)
        setShowExpense(false)
    }

    function executeExpense(category) {
        const numAmount = Number(amount)
        setData(prevData => ({
            ...prevData,
            cardBalance: prevData.cardBalance - numAmount,
            spentToday: prevData.spentToday + numAmount,
            available: prevData.available - numAmount,
            remainingToday: prevData.dailyBudget - (prevData.spentToday + numAmount),
            expenseCategories: {
                ...prevData.expenseCategories,
                [category]: (prevData.expenseCategories[category] || 0) + numAmount
            }
        }))
        setAmount('')
        setShowExpense(false)
    }

    function executeIncome(category) {
        const numAmount = Number(amount)
        setData(prevData => ({
            ...prevData,
            cardBalance: prevData.cardBalance + numAmount,
            available: prevData.available + numAmount,
            incomeCategories: {
                ...prevData.incomeCategories,
                [category]: (prevData.incomeCategories[category] || 0) + numAmount
            }
        }))
        setAmount('')
        setShowIncome(false)
    }

    function endDay() {
        if (confirm("Вы уверены, что хотите закончить день?")) {
            setData(prevData => {
                return {
                    ...prevData,

                    available: prevData.available + prevData.dailyBudget,

                    spentToday: 0,
                    remainingToday: prevData.dailyBudget,

                    currentDay: prevData.currentDay + 1,
                }
            })
        }
    }

    function endMonth() {
        if (confirm("Вы точно хотите завершить месяц?")) {
            if (confirm("Уверены?")) {
                setData(null)
            }
        }
    }
    return (
        <>
            <div className="actions">
                <input
                    type="number"
                    className="actions__input"
                    value={amount}
                    placeholder="Сумма"
                    onChange={(e) => setAmount(e.target.value)}
                />
                <div className="actions__buttons">
                    <Button className="actions__btn actions__btn--expense" func={handleExpenseClick} text="Расход" />
                    <Button className="actions__btn actions__btn--income" func={handleIncomeClick} text="Доход" />
                </div>
            </div>

            {showExpense && (
                <CategorySelector
                    title="Выберите категорию расхода"
                    categories={expenseCats}
                    onSelect={executeExpense}
                    onCancel={() => setShowExpense(false)}
                />
            )}
            {showIncome && (
                <CategorySelector
                    title="Выберите категорию дохода"
                    categories={incomeCats}
                    onSelect={executeIncome}
                    onCancel={() => setShowIncome(false)}
                />
            )}

            <div className="controls">
                <Button
                    className={"controls__btn"}
                    func={endDay}
                    text={'Завершить день'}
                />
                <Button
                    className={"controls__btn controls__btn--danger"}
                    func={endMonth}
                    text={'Завершить месяц'}
                />
            </div>
        </>
    )
}