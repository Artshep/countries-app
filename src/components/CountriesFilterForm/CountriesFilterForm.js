import React from "react";

const CountriesFilterForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Country Name:
        <input
          aria-label="Country Name:"
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
          aria-label="Sort Order (ascend or descend):"
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
          aria-label="Limit Number of First Records:"
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
          aria-label="Population less than (in millions):"
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
