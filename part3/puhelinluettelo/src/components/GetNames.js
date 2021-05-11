import React from 'react'

const Contact = ( props ) => {
    return <>{props.name} {props.number} <button onClick={() => props.RemoveContact(props.personId, props.name)}>delete</button> <br /></>
}

const GetNames = ({ persons, filterName, RemoveContact }) => {
    if (filterName.length === 0) {
        return persons.map(i => <Contact personId={i.id} name={i.name} number={i.number} key={i.name} RemoveContact={RemoveContact} />)
    }
    else {
        let filtered = persons.filter(i => i.name.toLowerCase().includes(filterName.toLowerCase()))
        return filtered.map(i => <Contact personId={i.id} name={i.name} number={i.number} key={i.name} RemoveContact={RemoveContact} />)
    }
}

export default GetNames