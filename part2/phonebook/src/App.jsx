import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Person from './components/Person'
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
      .catch(error => console.log('error : ', error.response.statusText))
  }, [])

  const handleNewPerson = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)

  const filteredPersons = filter.length > 0 ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    const pObj = persons.find(p => p.name === newName)
    if (pObj != undefined && pObj.number == newNumber) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    } else if (pObj != undefined && pObj.number != newNumber) {
      if (newNumber.length == 0) {
        alert('Please enter the number.')
        return
      }
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedObj = { ...pObj, number: newNumber }
        updatePerson(pObj.id, updatedObj)
      }
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
        .catch(error => console.log('error : ', error.response.statusText))
    }
    setNewName('')
    setNewNumber('')
  }

  const updatePerson = (id, personObj) => {
    personService.update(id, personObj)
      .then(returnedPerson => setPersons(persons.map(p => p.id == returnedPerson.id ? returnedPerson : p)))
      .catch(error => console.log('error : ', error.response.statusText))
  }

  const deletePerson = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      personService.deleteById(person.id)
        .then(deletedPerson => setPersons(persons.filter(p => p.id != deletedPerson.id)))
        .catch(error => console.log('error : ', error.response.statusText))
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
      <div>
        {filteredPersons.map(person => <Person key={person.name} person={person}
          deletePerson={() => deletePerson(person)} />)}
      </div>
    </div>
  )
}

export default App
