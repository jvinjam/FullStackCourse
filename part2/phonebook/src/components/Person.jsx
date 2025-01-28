const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name}  {person.number} <button onClick={deletePerson}>Delete</button>
    </div>
  )
}

export default Person