import './InfoRow.css'

export default function InfoRow({ title, amount, style = {}, valueStyle = {} }) {
    return (
        <div
            className="info-block__item"
            style={style}
        >
            <span className="info-block__label">{title}</span>
            <span style={valueStyle}  className="info-block__value">{amount.toLocaleString('ru-RU')} ₽</span>
        </div>
    )
}