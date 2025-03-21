import { useState, useEffect } from "react";

import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import personService from "./services/persons";

import "./App.css";

//component for search
const Filter = ({ searchStr, handleMethod }) => (
  <div>
    filter shown with <input value={searchStr} onChange={handleMethod} />
  </div>
);

const Notification = ({ isError, message }) => (
  <div className={isError ? "error" : "notification"}>{message}</div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    isError: false,
    message: "",
  });

  //fetch initial data
  useEffect(() => {
    //debugger;
    personService.getAll().then((initialData) => setPersons(initialData));
    // .catch((error) => {
    //   console.log("Error fetching initial data: ", error.response.statusText);
    //   setErrorMessage({ isError: true, message: error.response.statusText });
    //   clearMessage();
    // });
  }, []);

  const handleNewPerson = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleFilter = (event) => setFilter(event.target.value);

  //filter data using search string
  const filteredPersons =
    filter.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
      : persons;

  //Set timeout and clear error/notification message state
  const clearMessage = () =>
    setTimeout(() => setErrorMessage({ isError: false, message: null }), 3000);

  //add button function
  const addPerson = (event) => {
    event.preventDefault();
    //check if person name exists on the server
    const pObj = persons.find((p) => p.name === newName);
    if (pObj !== undefined) {
      updatePerson(pObj);
    } else {
      //create a new entry if a new name and number entered
      const newObj = {
        name: newName,
        number: newNumber,
      };

      //add the new entry to the server and rerender
      personService
        .create(newObj)
        .then((returnedPerson) => {
          setErrorMessage({
            isError: false,
            message: `Added ${returnedPerson.name}`,
          });
          clearMessage();
          setPersons(persons.concat(returnedPerson)); //re-render with new data
        })
        .catch((error) => {
          console.log("Error adding new person : ", error.response.data.error);
          setErrorMessage({
            isError: true,
            message: error.response.data.error,
          });
          clearMessage();
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const updatePerson = (personObj) => {
    //if name exists and newNumber is same as current number, alert the user and return
    if (personObj.number === newNumber) {
      alert(`${newName} with ${newNumber} is already added to phonebook`);
      return;
    }

    //if name exists and a newNumber is entered, ask the user for confirmation to change the entry on the server
    if (
      confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      //update if user confirms, if not clear the fields and return
      const updatedObj = { ...personObj, number: newNumber };
      personService
        .update(personObj.id, updatedObj)
        .then((returnedPerson) => {
          setErrorMessage({
            isError: false,
            message: `Phone number updated for ${returnedPerson.name}`,
          });
          clearMessage();
          setPersons(
            persons.map((p) =>
              p.id === returnedPerson.id ? returnedPerson : p
            )
          );
        })
        .catch((error) => {
          console.log(
            "Error updating ",
            updatedObj.name,
            ": ",
            error.response.data.error
          );
          setErrorMessage({
            isError: true,
            message: error.response.data.error,
          });
          clearMessage();
          //setPersons(persons.filter((p) => p.id !== personObj.id));
        });
    }
  };

  const deletePerson = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      personService
        .deleteById(person.id)
        .then(() => {
          setErrorMessage({
            isError: false,
            message: `Deleted ${person.name}`,
          });
        })
        .catch(() => {
          setErrorMessage({
            isError: true,
            message: `Information of ${person.name} has already been removed from server`,
          });
        });
      clearMessage();
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage.message !== null && errorMessage.message.length > 0 && (
        <Notification
          isError={errorMessage.isError}
          message={errorMessage.message}
        />
      )}
      <Filter searchStr={filter} handleMethod={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewPerson={handleNewPerson}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h3>Numbers</h3>
      <div>
        {filteredPersons.map((person) => (
          <Person
            key={person.name}
            person={person}
            deletePerson={() => deletePerson(person)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
