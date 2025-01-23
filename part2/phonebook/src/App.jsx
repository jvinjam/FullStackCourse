import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const Filter = ({ searchStr, handleMethod }) => <div>filter shown with <input value={searchStr} onChange={handleMethod} /></div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
      setPersons(persons.concat({ name: newName, number: newNumber }))
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
