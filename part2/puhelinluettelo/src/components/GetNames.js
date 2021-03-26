import React from 'react'

const Contact = (props) => {
    return <>{props.name} {props.number} <br /></>
}

const GetNames = ({ persons, filterName }) => {
    if (filterName.length === 0) {
        return persons.map(i => <Contact name={i.name} number={i.number} key={i.name} />)
    }
    else {
        let filtered = persons.filter(i => i.name.toLowerCase().includes(filterName.toLowerCase()))
        return filtered.map(i => <Contact name={i.name} number={i.number} key={i.name} />)
    }
}

export default GetNames