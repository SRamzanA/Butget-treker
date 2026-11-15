import { useState, useEffect } from 'react'
import './App.css'
import DashboardPage from '../pages/DashboardPage/ui/DashboardPage'
import StartPage from '../pages/StartPage/ui/StartPage'
import { loadState, saveState } from '../shared/lib/storage'

export default function App() {
    const [data, setData] = useState(null)

    useEffect(() => {
        const saved = loadState()
        if (saved) {
            setData(saved)
        }
    }, [])

    useEffect(() => {
        saveState(data)
    }, [data])

    return (
        <div className="app">
            {
                data ? (
                    <DashboardPage
                        data={data}
                        setData={setData}
                    />
                ) : (
                    <StartPage
                        setData={setData}
                    />
                )
            }
        </div>
    )
}