import './Button.css'

export default function Button({ className, func, text }) {

    return (
        <button className={className} type="button" onClick={func}>{text}</button>
    )
}