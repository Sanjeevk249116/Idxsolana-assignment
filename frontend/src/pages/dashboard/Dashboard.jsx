import React from 'react'
import { useNavigate } from 'react-router-dom'
import ViewAllNote from './components/ViewAllNote'

function Dashboard() {
    const navigate = useNavigate()

    return (
        <div className='mt-1'>
            <div className='valign-wrapper space-between'>
                <h4>Dashboard</h4>
                <button
                    className={`button-style pointer cercle-purple-text font-18px font-cercular-bold`}
                    style={{
                        padding: "5px 28px",
                        border: "1px solid #6f2da8",
                    }}
                    onClick={() => navigate("/add/new-note")}
                >
                    Add new note
                </button>
            </div>
            <ViewAllNote />
        </div>
    )
}

export default Dashboard
