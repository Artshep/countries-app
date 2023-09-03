import React from "react";

const CountriesFilterForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Country Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Sort Order (ascend or descend):
        <select
          name="sortOrder"
          value={formData.sortOrder}
          onChange={handleChange}
        >
          <option value="">None</option>
          <option value="ascend">Ascend</option>
          <option value="descend">Descend</option>
        </select>
      </label>
      <br />
      <label>
        Limit Number of First Records:
        <input
          type="number"
          name="limit"
          value={formData.limit}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Population less than (in millions):
        <input
          type="number"
          name="population"
          value={formData.population}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CountriesFilterForm;
