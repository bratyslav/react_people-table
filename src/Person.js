import React from 'react';
import PropTypes from 'prop-types';

const Person = ({ person, selectRow, isSelected }) => {
  let trClassName = [];

  trClassName.push(person.age > 65 ? 'more-than-65-age' : '');
  trClassName.push(isSelected ? 'is-selected' : '');
  trClassName.push(person.sex === 'm' ? 'person--male' : 'person--female');
  trClassName.push(person.children !== '-' ?
    person.sex === 'm' ? 'person--father' : 'person--mother'
    : ''
  );
  trClassName = trClassName.join(' ');

  let personNameClassName = [];

  personNameClassName.push(person.born > 1800 ? 'born-after-1800' : '');
  personNameClassName.push(person.born < 1650 ? 'born-before-1650' : '');
  personNameClassName = personNameClassName.join(' ');

  return (
    <tr
      className={trClassName}
      onClick={() => selectRow(person.id)}
    >
      <td>{person.id}</td>
      <td
        className={personNameClassName}
      >
        {person.name}
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.mother}</td>
      <td>{person.father}</td>
      <td>{person.age}</td>
      <td className={'person--lived-in-' + person.century}>{person.century}</td>
      <td>{person.children}</td>
    </tr>
  );
};

Person.propTypes = {
  person: PropTypes.object.isRequired,
  selectRow: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
};

export default Person;