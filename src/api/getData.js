const getPeople = async () => {
  const url = `https://mate-academy.github.io/react_people-table/api/people.json`;
  const response = await fetch(url);
  const people = await response.json();

  return people;
};

export const getData = async () => {
  const people = await getPeople();

  return people.map((person, index) => ({
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
  }))
};
