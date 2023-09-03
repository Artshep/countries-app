import React, { useState, useEffect } from "react";
import axios from "axios";

const CountriesPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    subregion: "",
    population: "",
    sortOrder: "",
  });

  const [countries, setCountries] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    } catch (error) {
      console.error("Failed to fetch country data:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const sortCountriesByName = (countries, order) => {
    return [...countries].sort((a, b) => {
      const nameA = a.name.common.toLowerCase();
      const nameB = b.name.common.toLowerCase();

      if (order === "ascend") {
        return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
      } else if (order === "descend") {
        return nameA < nameB ? 1 : nameA > nameB ? -1 : 0;
      } else {
        return 0;
      }
    });
  };

  const filterByPopulation = (maxPopulation) => {
    return countries.filter((country) => {
      const populationInMillions = country.population / 1000000;
      return populationInMillions < maxPopulation;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let filteredCountries = countries;

    if (formData.name) {
      filteredCountries = filteredCountries.filter((country) =>
        country.name.common.toLowerCase().includes(formData.name.toLowerCase())
      );
    }
    if (formData.subregion) {
      filteredCountries = filteredCountries.filter((country) =>
        country.subregion
          .toLowerCase()
          .includes(formData.subregion.toLowerCase())
      );
    }
    if (formData.population) {
      const maxPopulation = parseFloat(formData.population);
      filteredCountries = filterByPopulation(maxPopulation);
    }
    if (formData.sortOrder) {
      filteredCountries = sortCountriesByName(
        filteredCountries,
        formData.sortOrder
      );
    }

    console.log("Filtered countries:", filteredCountries);
  };

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
        Subregion:
        <input
          type="text"
          name="subregion"
          value={formData.subregion}
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

export default CountriesPage;
