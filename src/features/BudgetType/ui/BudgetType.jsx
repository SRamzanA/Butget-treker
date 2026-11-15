import { useState } from 'react';
import Button from "../../../shared/Button/ui/Button";
import './BudgetType.css';

export default function BudgetType({ setBudgetType, budgetType }) {
    // для открытия/закрытия меню
    const [isOpen, setIsOpen] = useState(false)

    const handleSelect = (type) => {
        setBudgetType(type)
        setIsOpen(false); // Закрываем меню
    };

    return (
        <div className="budgetType__container">
            <Button
                className="budgetType__trigger"
                text={budgetType === 'month' ? "Знаю сумму на месяц ▼" : "Знаю сумму на день ▼"}
                func={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
                <div className="budgetType__dropdown">
                    <Button
                        text="Знаю сумму на месяц"
                        func={() => handleSelect('month')}
                        className={`controls__btn ${budgetType === 'month' ? 'active' : ''}`}
                    />
                    <Button
                        text="Знаю сумму на день"
                        func={() => handleSelect('day')}
                        className={`controls__btn ${budgetType === 'day' ? 'active' : ''}`}
                    />
                </div>
            )}
        </div>
    );
}