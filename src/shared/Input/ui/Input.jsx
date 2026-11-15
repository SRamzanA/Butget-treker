import './Input.css'

export default function Input({ value, placeholder, setValue }) {
    return (
        <input
            className='Input'
            type="number"
            inputMode='numeric'
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

