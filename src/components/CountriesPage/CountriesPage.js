import React, { useState, useEffect } from "react";
import axios from "axios";

const CountriesPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    capital: "",
    subregion: "",
    population: "",
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

  const filterByPopulation = (maxPopulation) => {
    const filteredCountries = countries.filter((country) => {
      const populationInMillions = country.population / 1000000;
      return populationInMillions < maxPopulation;
    });
    return filteredCountries;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let filteredCountries = countries;

    if (formData.name) {
      filteredCountries = filteredCountries.filter((country) =>
        country.name.common.toLowerCase().includes(formData.name.toLowerCase())
      );
    }
    if (formData.capital) {
      filteredCountries = filteredCountries.filter((country) =>
        country.capital[0]
          .toLowerCase()
          .includes(formData.capital.toLowerCase())
      );
    }
    if (formData.subregion) {
      filteredCountries = filteredCountries.filter((country) =>
        country.subregion.toLowerCase().includes(formData.subregion.toLowerCase())
      );
    }
    if (formData.population) {
      const maxPopulation = parseFloat(formData.population);
      filteredCountries = filterByPopulation(maxPopulation);
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
        Capital:
        <input
          type="text"
          name="capital"
          value={formData.capital}
          onChange={handleChange}
        />
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
