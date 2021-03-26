import React from 'react'

const Filter = ({ filterName, inputHandleFilter }) => {
    return (
        <div>
            filter shown with <input value={filterName} onChange={inputHandleFilter} />
        </div>
    )
}

export default Filter