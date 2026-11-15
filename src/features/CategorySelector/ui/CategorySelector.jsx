import Button from '../../../shared/Button/ui/Button'
import './CategorySelector.css'

export default function CategorySelector({ title, categories, onSelect, onCancel }) {
    return (
        <div className="category-selector">
            <div className="category-selector__header">
                <span className="category-selector__title">{title}</span>
                <button className="category-selector__cancel" onClick={onCancel}>✕</button>
            </div>
            <div className="category-selector__grid">
                {categories.map((cat) => (
                    <Button
                        key={cat.value}
                        text={cat.label}
                        className="category-selector__btn"
                        func={() => onSelect(cat.value)}
                    />
                ))}
            </div>
        </div>
    )
}