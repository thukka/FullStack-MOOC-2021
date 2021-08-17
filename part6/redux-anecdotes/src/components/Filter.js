import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
    const handleChange = (event) => {
        event.preventDefault()
        const value = event.target.value
        props.setFilter(value)
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

const ConnectedFilter = connect(null, { setFilter })(Filter)
export default ConnectedFilter