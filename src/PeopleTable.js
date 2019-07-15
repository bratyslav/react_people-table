import React from 'react';
import Person from './Person';

class PeopleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      pointers: [],
      sortedBy: { attribute: '', wasSorted: false }
    };
  };


  componentWillReceiveProps(nextProps, nextContent) {
    const { people } = this.props;
    if (people !== nextProps.people) {
      this.setState({
        people: nextProps.people.map((person, index) => ({
          ...person,
          father: person.father ? person.father : 'unknown',
          mother: person.mother ? person.mother : 'unknown',
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
            .join(', ') || '-'
        })),
    
        pointers: nextProps.people.map((person, index) => ({
          pointer: index,
          isVisible: true,
          isSelected: false
        }))
      });
    };
  };

  sortFunc = (attribute) => {
    const { people, pointers, sortedBy } = this.state;
    const sortedByNamePointers = () => pointers.sort(
      (a, b) => (
        people[a.pointer].name.localeCompare(
            people[b.pointer].name
          )
      ));
    const sortedByNumberPointers = () => pointers.sort(
      (a, b) => (
        people[a.pointer][attribute] - people[b.pointer][attribute]
    ))  


    if (!sortedBy.attribute) {
      this.setState({
        sortedBy: { attribute: attribute, wasSorted: false }
      });
    };

    // дальше проверка нужна, чтобы сортировка сначала шла
    // в направлении сверху вниз, каждый раз, когда пользователь
    // изменяет атрибут сортировки
    if (sortedBy.attribute !== attribute) {
      this.setState({
        sortedBy: { attribute: attribute, wasSorted: false }
      });
      // тут не меняется значение wasSorted
      // из-за асинхронного обновления состояния (как я думаю),
      // из-за чего функция дальше работает не совсем корректно
      // функциональный setState тоже не помогает:
      //
      // if (sortedBy.attribute !== attribute) {
      //   this.setState(() => ({
      //     sortedBy: { attribute: attribute, wasSorted: false }
      //   }));
      // };
      //
      // так что тут я застрял, помогите, пжлста :)
    };

    switch (attribute) {
      case 'name':
        if (!sortedBy.wasSorted) {
          this.setState({
            pointers: sortedByNamePointers(),
            sortedBy: { attribute: attribute, wasSorted: !sortedBy.wasSorted }  
          });
          break;
        };

        this.setState({
          pointers: sortedByNamePointers().reverse(),
          sortedBy: { attribute: attribute, wasSorted: !sortedBy.wasSorted }  
        });
        break;

      case 'id':  
      case 'born':
      case 'died':
      case 'age':
        if (!sortedBy.wasSorted) {
          this.setState({
            pointers: sortedByNumberPointers(),
            sortedBy: { attribute: attribute, wasSorted: !sortedBy.wasSorted }  
          });
          break;
        };

        this.setState({
          pointers: sortedByNumberPointers().reverse(),
          sortedBy: { attribute: attribute, wasSorted: !sortedBy.wasSorted }  
        });
        break;

      default:
        break;        
    };


  };


  filter = (event) => {
    const { people, pointers } = this.state;

    this.setState({
      pointers: pointers.map(pointer => {
        const person = people[pointer.pointer];

        const filterText = event.target.value.toLowerCase();
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