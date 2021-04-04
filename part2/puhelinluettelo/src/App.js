import React, { useState, useEffect } from 'react'
import GetNames from './components/GetNames'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const inputHandle = (event) => setNewName(event.target.value)
  const inputHandlePhone = (event) => setNewNumber(event.target.value)
  const inputHandleFilter = (event) => setFilterName(event.target.value)

  useEffect(() => {
    personsService.getAll()
      .then(allPersons => setPersons(allPersons))
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
      personsService
        .create(getNewName)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        }
        )
    }
  }

  const RemoveContact = (id) => {
    console.log('hello', id)
    return personsService.removeUser(id)
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
        <GetNames persons={persons} filterName={filterName} RemoveContact={RemoveContact} />
      </div>
    </div>
  );
}

export default App;
