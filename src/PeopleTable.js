import React from 'react';
import Person from './Person';
import PropTypes from 'prop-types';

class PeopleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      peoplePointers: [],
      sortedByAttribute: ''
    };
  };


  componentDidUpdate(prevProps, prevState) {
    const { people } = this.props;

    if (people !== prevProps.people) {
      this.setState({
        people: people.map((person, index) => ({
          ...person,
          father: person.father ? person.father : 'unknown',
          mother: person.mother ? person.mother : 'unknown',
          id: index + 1,
          age: person.died - person.born,
          century: Math.ceil(person.died / 100),
          children: people
            .filter(man => (
              man.father === person.name || man.mother === person.name
            ))
            .map(man => man.name)
            .join(', ') || '-'
        })),
    
        peoplePointers: people.map((person, index) => ({
          pointer: index,
          isVisible: true,
          isSelected: false
        }))
      });
    };
  };

  sortFunc = (attribute) => {
    this.setState(prevState => {
      const { people, peoplePointers, sortedByAttribute } = prevState;

      if (sortedByAttribute !== attribute) { // атрибута нет или он изменен
        switch (attribute) {
          case 'name':
            return { 
              peoplePointers: peoplePointers.sort(
                (a, b) => (
                  people[a.pointer].name.localeCompare(people[b.pointer].name)
                )
              ),
              sortedByAttribute: attribute
            };
  
          case 'id':  
          case 'born':
          case 'died':
          case 'age':
            return {
              peoplePointers: peoplePointers.sort(
                (a, b) => (
                  people[a.pointer][attribute] - people[b.pointer][attribute]
                )
              ),
              sortedByAttribute: attribute
            };
  
          default:
            break;
        }    
      } else { // реверс
        return { peoplePointers: peoplePointers.reverse() }
      }
    })
  }  

  filter = (event) => {
    const { people, peoplePointers } = this.state;
    const { value } = event.target;

    this.setState({
      peoplePointers: peoplePointers.map(pointer => {
        const person = people[pointer.pointer];

        const filterText = value.toLowerCase();
        const stringToFilter = (
          person.name + person.mother + person.father + person.children
        ).toLowerCase();  

        return stringToFilter.indexOf(filterText) !== -1
          ? { ...pointer, isVisible: true }
          : { ...pointer, isVisible: false }
      })
    });

  };

  selectRow = (personId) => {
    this.setState({
      peoplePointers: this.state.peoplePointers.map(pointer => (
        pointer.pointer + 1 === personId
        ? { ...pointer, isSelected: true }
        : { ...pointer, isSelected: false }
      ))
    });
  }

  render() {
    const { people, peoplePointers } = this.state;

    return (
      <table className="people-table">
        <thead className="people-table__head">
          <tr>
            <td onClick={() => this.sortFunc('id')} className="sort-btn">Id</td>
            <td onClick={() => this.sortFunc('name')} className="sort-btn">Name</td>
            <td>Sex</td>
            <td onClick={() => this.sortFunc('born')} className="sort-btn">Born</td>
            <td onClick={() => this.sortFunc('died')} className="sort-btn">Died</td>
            <td>Mother</td>
            <td>Father</td>
            <td onClick={() => this.sortFunc('age')} className="sort-btn">Age</td>
            <td>Century</td>
            <td>
              <div className="people-table__search-container">
                <div>
                  Children
                </div>

                <input
                  className="people-table__search"
                  type="text"
                  placeholder="Search..."
                  onChange={this.filter}
                >
                </input>
              </div>
            </td>
          </tr>  
        </thead>
        <tbody>
          {
            peoplePointers
              .filter(pointer => {
                return pointer.isVisible;
              })
              .map(pointer => (
                <Person
                  person={people[pointer.pointer]}
                  selectRow={this.selectRow}
                  isSelected={pointer.isSelected}
                  key={pointer.pointer}
                />
              ))
          }
        </tbody>
      </table>
    );
  };
};

PeopleTable.propTypes = {
  people: PropTypes.array.isRequired
};

export default PeopleTable;