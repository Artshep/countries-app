import React, { useState, useEffect } from "react";
import axios from "axios";
import CountriesFilterForm from "../CountriesFilterForm";
import CountriesTable from "../CountriesTable";

const CountriesPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    limit: "",
    population: "",
    sortOrder: "",
  });

  const [countries, setCountries] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
    <>
      <CountriesFilterForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <CountriesTable countries={countries} />
    </>
  );
};

export default CountriesPage;
