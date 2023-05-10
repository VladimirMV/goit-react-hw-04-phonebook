import { Component } from 'react';
import shortid from 'shortid';
import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const { contacts } = this.state;

    const nameExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const numberExist = contacts.find(contact => contact.number === number);

    if (nameExist) {
      alert(`${name} is already in contacts.`);
    } else if (numberExist) {
      alert(`${number} is already in contacts.`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();
    const isContactsNotEmpty = contacts.length > 0;

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        {contacts.length > 1 && (
          <Filter value={filter} onChange={this.changeFilter} />
        )}
        {isContactsNotEmpty ? (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <p>Your phonebook is empty. Please add contact.</p>
        )}
      </Container>
    );
  }
}

export default App;

// This code is a React component called "App" that represents a simple phonebook application.
// It imports necessary components from respective files and libraries,
// that are then used to render contacts in a container with a filter feature.

// The initial state of "App" component includes an array of contacts with their respective IDs,
// names and phone numbers, and an empty filter property.

// The component has several functions such as addContact, deleteContact, changeFilter,
// and getVisibleContacts that manipulate state based on user input or data changes.

// The render function uses the state and variables with their respective values
// to conditionally render UI elements.This includes a few headings, a contact form,
// a filtered search bar, and a  contact list that display contacts added by users.

// The rendered UI elements allow users to view, add, filter, and delete contacts
// in the application.
