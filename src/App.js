import React from 'react';
import { people } from './api/people';
import PeopleTable from './PeopleTable';
import NewPerson from './NewPerson';

class App extends React.Component {
  state = {
    people: [...people],
    newPersonFormIsVisible: false
  }

  getFormVisible = () => {
    this.setState({ newPersonFormIsVisible: true });
  };

  closeForm = () => {
    this.setState({
      newPersonFormIsVisible: false
    });
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
            onClick={this.getFormVisible}
          >
            Add person
          </button>
        </div>

        <PeopleTable people={people} />

        <NewPerson
          isVisible={newPersonFormIsVisible}
          close={this.closeForm}
        />
      </div>
    );
  }

};

export default App;