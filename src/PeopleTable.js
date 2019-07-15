import React from 'react';
import Person from './Person';

class PeopleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      pointers: []
    };
  };


  componentWillReceiveProps(nextProps, nextContent) {
    if (this.props.people !== nextProps.people) {
      this.setState({
        people: nextProps.people.map((person, index) => ({
          ...person,
          father: person.father ? person.father : '',
          mother: person.mother ? person.mother : '',
          id: index + 1,
          age: person.died - person.born,
          century: Math.floor(person.died / 100) + 1,
          // формула для расчета столетия, которая указана в описании задачи,
          // не совсем верна, так как Math.ceil(person.died / 100) при, например,
          // 2000 (1900, 1800...) году даст 20 столетие, а не 21е, как ожидается
          children: nextProps.people
            .filter(man => (
              man.father === person.name || man.mother === person.name
            ))
            .map(man => man.name)
            .join(', ')
        })),
    
        pointers: nextProps.people.map((person, index) => ({
          pointer: index,
          isVisible: true,
          isSelected: false
        }))
      });
    };
  };

  sortByName = () => {
    this.setState({
      pointers: this.state.pointers.sort(
        (a, b) => (
          this.state.people[a.pointer].name.localeCompare(
              this.state.people[b.pointer].name
            )
        )
      )});
  };

  sortById = () => {
    this.setState({
      pointers: this.state.pointers.sort(
        (a, b) => (
          this.state.people[a.pointer].id -
            this.state.people[b.pointer].id
        )
      )});
  };

  sortByBorn = () => {
    this.setState({
      pointers: this.state.pointers.sort(
        (a, b) => (
          this.state.people[a.pointer].born -
            this.state.people[b.pointer].born
        )
      )});
  };

  sortByDied = () => {
    this.setState({
      pointers: this.state.pointers.sort(
        (a, b) => (
          this.state.people[a.pointer].died -
            this.state.people[b.pointer].died
        )
      )});
  };

  sortByAge = () => {
    this.setState({
      pointers: this.state.pointers.sort(
        (a, b) => (
          this.state.people[a.pointer].age-
            this.state.people[b.pointer].age
        )
      )});
  };

  filter = (event) => {
    this.setState({
      pointers: this.state.pointers.map(pointer => {
        const person = this.state.people[pointer.pointer];

        const filterText = event.target.value.toLowerCase();

        return person.name.toLowerCase().indexOf(filterText) !== -1
          || person.mother.toLowerCase().indexOf(filterText) !== -1
          || person.father.toLowerCase().indexOf(filterText) !== -1
          || person.children.toLowerCase().indexOf(filterText) !== -1
        ? { ...pointer, isVisible: true }
        : { ...pointer, isVisible: false }
      })
    });

  };

  selectRow = (personId) => {
    this.setState({
      pointers: this.state.pointers.map(pointer => (
        pointer.pointer + 1 === personId
        ? { ...pointer, isSelected: true }
        : { ...pointer, isSelected: false }
      ))
    });
  }

  render() {
    const { people, pointers } = this.state;

    return (
      <table className="people-table">
        <thead className="people-table__head">
          <tr>
            <td onClick={this.sortById} className="sort-btn">Id</td>
            <td onClick={this.sortByName} className="sort-btn">Name</td>
            <td>Sex</td>
            <td onClick={this.sortByBorn} className="sort-btn">Born</td>
            <td onClick={this.sortByDied} className="sort-btn">Died</td>
            <td>Mother</td>
            <td>Father</td>
            <td onClick={this.sortByAge} className="sort-btn">Age</td>
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
            pointers
              .filter(pointer => {
                return pointer.isVisible;
              })
              .map(pointer => (
                <Person
                  person={people[pointer.pointer]}
                  selectRow={this.selectRow}
                  isSelected={pointer.isSelected}
                />
              ))
          }
        </tbody>
      </table>
    );
  };
};

export default PeopleTable;