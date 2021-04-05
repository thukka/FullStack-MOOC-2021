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
      if (window.confirm(`${newName} is already on the list, replace the old number with a new one?`)) {
        const user = persons.find(n => n.name === newName)
        const changedUser = { ...user, number: newNumber }
        personsService.updateInfo(changedUser.id, changedUser)
          .then(changedInfo => {
            setPersons(persons.map(person => person.id !== changedUser.id ? person : changedInfo))
          })
      }
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

  const RemoveContact = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      personsService.removeUser(id)
        .then(personsService
          .getAll()
          .then(allPersons => setPersons(allPersons)))
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
        <GetNames persons={persons} filterName={filterName} RemoveContact={RemoveContact} />
      </div>
    </div>
  );
}

export default App;
