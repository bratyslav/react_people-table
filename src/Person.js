import React from 'react';

const Person = ({ person, selectRow, isSelected }) => {
  let trBaseStyle = {};
  trBaseStyle.border = person.age > 65 ? '2px solid green' : '';

  let trNameStyle = {};
  trNameStyle.fontWeight = person.born > 1800 ? 'bold' : '';
  trNameStyle.textDecoration = person.born < 1650 ? 'line-through' : '';

  let trSelectedStyle = { ...trBaseStyle, border: '3px solid blue' };

  let trClassName = [];
  trClassName.push(person.sex === 'm' ? 'person--male' : 'person--female');
  trClassName.push(person.children.length !== 0 ?
    person.sex === 'm' ? 'person--father' : 'person--mother'
    : ''
  );
  trClassName = trClassName.join(' ');

  return (
    <tr
      className={trClassName}
      style={isSelected ? trSelectedStyle : trBaseStyle}
      onClick={() => selectRow(person.id)}
    >
      <td>{person.id}</td>
      <td
        style={trNameStyle}
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

export default Person;