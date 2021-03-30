import React, { useState, useEffect } from 'react'
import GetNames from './components/GetNames'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '050123456' },
    { name: 'Toni Hukka', number: '123456' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const inputHandle = (event) => setNewName(event.target.value)
  const inputHandlePhone = (event) => setNewNumber(event.target.value)
  const inputHandleFilter = (event) => setFilterName(event.target.value)

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
  }, [])

  const checkForDoubles = (newName) => {
    let matchFound = false
    persons.forEach((item) => {
      if (item.name === newName) {
        matchFound = true
      }
    })
    return matchFound
  }

  const SubmitFormAction = (event) => {
    event.preventDefault()

    if (checkForDoubles(newName)) {
      alert(`${newName} is already on the list`)
    } else {
      const getNewName = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(getNewName))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} inputHandleFilter={inputHandleFilter} />
      <h2>add new</h2>
      <PersonForm
        SubmitFormAction={SubmitFormAction}
        newName={newName}
        newNumber={newNumber}
        inputHandle={inputHandle}
        inputHandlePhone={inputHandlePhone}
      />
      <h2>Numbers</h2>
      <div>
        <GetNames persons={persons} filterName={filterName} />
      </div>
    </div>
  );
}

export default App;
