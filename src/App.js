import React from 'react';
import PeopleTable from './PeopleTable';
import NewPerson from './NewPerson';
import { getDataPeople } from './api/people';


class App extends React.Component {
  state = {
    people: [],
    newPersonFormIsVisible: false
  }

  async componentDidMount() {
    const people = await getDataPeople();
    this.setState({ people });
  };

  toggleFormVisible = (isVisible) => {
    this.setState({ newPersonFormIsVisible: isVisible });
  };

  render() {
    const { people, newPersonFormIsVisible } = this.state;

    return (
      <div className="App">
        <div className="header">
          <header>
            <h1>
              Table with {people.length} people
            </h1>
          </header>
          <button
            className="header__add-person-button"
            onClick={() => this.toggleFormVisible(true)}
          >
            Add person
          </button>
        </div>

        <PeopleTable people={people} />

        <NewPerson
          isVisible={newPersonFormIsVisible}
          close={() => this.toggleFormVisible(false)}
        />
      </div>
    );
  }

};

export default App;