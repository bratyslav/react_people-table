import React from 'react';
import PropTypes from 'prop-types';

const NewPerson = ({ isVisible, close }) => (
  <form
    className="new-person-form"
    style={isVisible ? {} : { display: 'none' }}
  >
    <div
      className="new-person-form__close-button-container"
     
    >
      <span
        onClick={close}
        className="new-person-form__close-button"
      >
      ×
      </span>
    </div>

    <h2 className="new-person-form__header">Add new person</h2>

    <label>
      <div>
        Name:
      </div>
      <input
        name="name"
        type="text"
        pattern="[A-Za-z _]*"
        required
      ></input> 
    </label>       

    <div className="new-person-form__sex-input">
      <label>
        Male
        <input
          type="radio"
          name="sex"
          id="male"
          required
        ></input>
      </label>

      <label>
        Female
        <input
          type="radio"
          name="sex"
          id="female"
          required
        ></input> 
      </label>
    </div>

    <label>
      Born:
      <input
        type="text"
        name="born"
        required
      ></input>
    </label>

    <label>
      Died:
      <input
      type="text"
      name="died"
      required
      ></input>
    </label>

    <label>
      Father:
      <input
      type="text"
      name="father"
      required
      ></input>
    </label>

    <label>
      Mother:
      <input
        type="text"
        name="mother"
        required
      ></input>
    </label>

    <div className="new-person-form__input">
    <input
      type="submit"
      value="Add person"
    ></input>
    </div>
  </form>
);

NewPerson.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default NewPerson;