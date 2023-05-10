import PropTypes from 'prop-types';
import s from './ContactList.module.css';

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={s.item} key={id}>
          <p className={s.info}>
            {name}: {number}
          </p>
          <button
            className={s.btn}
            type="button"
            onClick={() => onDeleteContact(id)}
          />
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;

// Данный код определяет компонент ContactList, импортируя PropTypes из prop - types
// и s из ContactList.module.css.
// Далее, данный компонент принимает два параметра contacts и onDeleteContact.
// Он используется для отображения списка контактов, где каждый контакт имеет имя,
// номер телефона и кнопку для удаления.

// contacts - массив объектов, где каждый элемент имеет id, name и number
// nonDeleteContact - ф - ция, которая удаляет контакт по его id.

// Компонент возвращает список контактов в виде неупорядоченного списка с помощью
// метода map, где каждый контакт отображается в виде элемента списка с помощью
// переменных id, name и number.При клике на кнопку удаления вызывается
// ф - ция onDeleteContact для удаления соответствующего контакта.
// Наконец, определены свойства propTypes для проверки типов contacts(массив объектов)
// и onDeleteContact(функция).Эти проверки помогают предотвратить возможные ошибки
// во время выполнения.
