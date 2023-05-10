import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const isNameOrNumberEmpty = name.trim() === '' || number.trim() === '';
    const isIncorrectNumber = !/\d{3}[-]\d{2}[-]\d{2}/g.test(number);

    if (isNameOrNumberEmpty) {
      alert("Enter the contact's name and number phone!");
    } else if (isIncorrectNumber) {
      alert('Enter the correct number phone!');
    } else {
      this.props.onSubmit(this.state);
      this.setState({ name: '', number: '' });
    }
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <label className={s.label}>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            placeholder="Evgen Vlasov"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={s.label}>
          Number
          <input
            className={s.input}
            type="text"
            name="number"
            value={number}
            onChange={this.handleChange}
            placeholder="111-11-11"
          />
        </label>
        <button className={s.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;

// Этот код определяет компонент ContactForm, который представляет собой форму
// для ввода имени и номера телефона.Компонент принимает функцию обратного вызова onSubmit
// в качестве свойства и вызывает ее при отправке формы с текущим состоянием имени
// и номера телефона в качестве аргумента.Когда пользователь вводит имя или номер телефона,
//   событие onChange вызывает метод handleChange, который обновляет состояние компонента
// с помощью setState.
