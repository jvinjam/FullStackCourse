import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const Filter = ({ searchStr, handleMethod }) => <div>filter shown with <input value={searchStr} onChange={handleMethod} /></div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(initialData => setPersons(initialData))
      .catch(error => alert('error: ', error))
  }, [])

  const handleNewPerson = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)

  const filteredPersons = filter.length > 0 ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    if (newName.length > 0 && newNumber.length > 0) {
      const newObj = {
        name: newName,
        number: newNumber
      }

      personService.create(newObj)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
        .catch(error => alert('error: ', error))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchStr={filter} handleMethod={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNewPerson={handleNewPerson} newNumber={newNumber}
        handleNewNumber={handleNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
