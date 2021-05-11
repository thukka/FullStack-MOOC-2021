import React from 'react'

const PersonForm = ({ SubmitFormAction, newName, newNumber, inputHandle, inputHandlePhone }) => {
    return (
        <form onSubmit={SubmitFormAction}>
            <div>
                name: <input value={newName} onChange={inputHandle} />
            </div>
            <div>
                number: <input value={newNumber} onChange={inputHandlePhone} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm