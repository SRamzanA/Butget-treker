import './StartPage.css'
import StartForm from '../../../widgets/StartForm/ui/StartForm'

export default function StartPage({ setData }) {
    return (
        <div className="card" id="startView">

            <h1 className="card__title">Начало месяца</h1>

            <StartForm
                setData={setData}
            />
            
        </div>
    )
}