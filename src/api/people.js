export const dataPeople = async() => {
  const url = `https://mate-academy.github.io/react_people-table/api/people.json`;
  const response = await fetch(url);
  const people = await response.json();
  return people;
};