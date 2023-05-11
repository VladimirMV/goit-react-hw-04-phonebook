import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isNameOrNumberEmpty = name.trim() === '' || number.trim() === '';
    const isIncorrectNumber = !/\d{3}[-]\d{2}[-]\d{2}/g.test(number);

    if (isNameOrNumberEmpty) {
      alert("Enter the contact's name and phone number!");
    } else if (isIncorrectNumber) {
      alert('Enter a valid phone number in the format "111-11-11"!');
    } else {
      onSubmit({ name, number });
      setName('');
      setNumber('');
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="John Doe"
          pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, spaces, and the following symbols: ', . -"
          required
        />
      </label>
      <label className={s.label}>
        Phone number
        <input
          className={s.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          placeholder="111-11-11"
          pattern="\d{3}[-]\d{2}[-]\d{2}"
          title='Phone number must be in the format "111-11-11"'
          required
        />
      </label>
      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
