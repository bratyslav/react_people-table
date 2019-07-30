import React from 'react';
import PropTypes from 'prop-types';
let classNames = require('classnames');

const Person = ({ person, selectRow, isSelected }) => {
  const trClassName = classNames({
    'more-than-65-age': person.age > 65,
    'is-selected': isSelected,
    'person--male': person.sex === 'm',
    'person--female': person.sex === 'f',
    'person--father': person.children !== '-' && person.sex === 'm',
    'person--mother': person.children !== '-' && person.sex === 'f'
  });

  const personNameClassName = classNames({
    'born-after-1800': person.born > 1800,
    'born-before-1650': person.born < 1650
  });

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