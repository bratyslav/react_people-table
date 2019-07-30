import React from 'react';
import Person from './Person';
import PropTypes from 'prop-types';

class PeopleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      visiblePeople: [],
      sortedByAttribute: ''
    };
  };

  componentDidUpdate(prevProps, prevState) {
    const { people } = this.props;

    if (people !== prevProps.people) {
      this.setState({
        people: [...people],
    
        visiblePeople: people.map((person, index) => ({
          pointer: index,
          isVisible: true,
          isSelected: false
        }))
      });
    };
  };

  sortPeople = (attribute) => {
    this.setState(prevState => {
      const { visiblePeople, sortedByAttribute } = prevState;

      if (sortedByAttribute !== attribute) { // атрибута нет или он изменен
        return {
          visiblePeople: visiblePeople.sort(this.getSortCallback(attribute)),
          sortedByAttribute: attribute
        };
      } else { // реверс
        return { visiblePeople: visiblePeople.reverse() }
      }
    })
  };

  getSortCallback = (attribute) => {
    const { people } = this.state;

    switch (attribute) {
      case 'name':
        return (a, b) => (
          people[a.pointer].name.localeCompare(people[b.pointer].name)
        );

      case 'id':  
      case 'born':
      case 'died':
      case 'age':
        return (a, b) => (
          people[a.pointer][attribute] - people[b.pointer][attribute]
        );

      default:
        break;
    };
  };

  filter = (event) => {
    const { people, visiblePeople } = this.state;
    const filterText = event.target.value.toLowerCase();

    this.setState({
      visiblePeople: visiblePeople.map(man => {
        const person = people[man.pointer];
        const stringToFilter = (
          person.name + person.mother + person.father + person.children
        ).toLowerCase();  

        return { ...man, isVisible: stringToFilter.includes(filterText) };
      })
    });

  };

  selectRow = (personId) => {
    this.setState({
      visiblePeople: this.state.visiblePeople.map(man => (
        { ...man, isSelected: man.pointer + 1 === personId }
      ))
    });
  };

  render() {
    const { people, visiblePeople } = this.state;

    return (
      <table className="people-table">
        <thead className="people-table__head">
          <tr>
            <td onClick={() => this.sortPeople('id')} className="sort-btn">Id</td>
            <td onClick={() => this.sortPeople('name')} className="sort-btn">Name</td>
            <td>Sex</td>
            <td onClick={() => this.sortPeople('born')} className="sort-btn">Born</td>
            <td onClick={() => this.sortPeople('died')} className="sort-btn">Died</td>
            <td>Mother</td>
            <td>Father</td>
            <td onClick={() => this.sortPeople('age')} className="sort-btn">Age</td>
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
            visiblePeople
              .filter(man => {
                return man.isVisible;
              })
              .map(man => (
                <Person
                  person={people[man.pointer]}
                  selectRow={this.selectRow}
                  isSelected={man.isSelected}
                  key={man.pointer}
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