import { useState } from 'react';
import useLocalStorage from './components/Hooks/useLocalStorage';
import shortid from 'shortid';
import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', '[]');
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    const isNameExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    const isNumberExist = contacts.find(contact => contact.number === number);

    if (isNameExist) {
      alert(`${name} is already in contacts.`);
    } else if (isNumberExist) {
      alert(`${number} is already in contacts.`);
    } else {
      setContacts(prevContacts => [newContact, ...prevContacts]);
    }
  };

  // Remove contact from the list
  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  // Update filter
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  // Filter contacts
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Check if contacts exist and get contacts length
  const isContactsExist = contacts.length > 0;

  return (
    <>
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        {isContactsExist && <Filter value={filter} onChange={changeFilter} />}
        {isContactsExist ? (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
          />
        ) : (
          <p>Your phonebook is empty. Please add contact. </p>
        )}
      </Container>
    </>
  );
}

export default App;
