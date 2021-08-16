import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        const value = event.target.value
        dispatch(setFilter(value))

    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter: <input onChange={(event) => handleChange(event)} />
        </div>
    )
}

export default Filter