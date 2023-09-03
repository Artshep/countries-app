import React, { useState, useEffect } from "react";
import axios from "axios";

const CountriesPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    limit: "",
    population: "",
    sortOrder: "",
  });

  const [countries, setCountries] = useState([]);
  console.log(countries, "countries");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchCountries = async (limit = null) => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      let data = response.data;

      if (limit) {
        data = data.slice(0, limit);
      }

      return data;
    } catch (error) {
      console.error("Failed to fetch country data:", error);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      const initialCountries = await fetchCountries();
      setCountries(initialCountries);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fetchedCountries = await fetchCountries(
      formData.limit ? parseInt(formData.limit, 10) : null
    );

    if (formData.name) {
      fetchedCountries = fetchedCountries.filter((country) =>
        country.name.common.toLowerCase().includes(formData.name.toLowerCase())
      );
    }

    if (formData.population) {
      const maxPopulation = parseFloat(formData.population);
      fetchedCountries = fetchedCountries.filter((country) => {
        const populationInMillions = country.population / 1000000;
        return populationInMillions < maxPopulation;
      });
    }

    if (formData.sortOrder) {
      fetchedCountries.sort((a, b) => {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();

        if (formData.sortOrder === "ascend") {
          return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
        } else {
          return nameA < nameB ? 1 : nameA > nameB ? -1 : 0;
        }
      });
    }

    setCountries(fetchedCountries);
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
        Limit Number of Records:
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

export default CountriesPage;
