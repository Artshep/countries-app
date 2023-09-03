import React, { useState, useEffect } from "react";
import axios from "axios";

const CountriesPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    capital: "",
    subregion: "",
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter countries based on form data
    const filteredCountries = countries.filter((country) => {
      const nameCondition = formData.name
        ? country.name.common
            .toLowerCase()
            .includes(formData.name.toLowerCase())
        : true;
      const regionCondition = formData.region
        ? country.region.toLowerCase().includes(formData.region.toLowerCase())
        : true;
      const capitalCondition = formData.capital
        ? country.capital[0]
            .toLowerCase()
            .includes(formData.capital.toLowerCase())
        : true;
      const subregionCondition = formData.subregion
        ? country.subregion
            .toLowerCase()
            .includes(formData.subregion.toLowerCase())
        : true;

      return (
        nameCondition &&
        regionCondition &&
        capitalCondition &&
        subregionCondition
      );
    });

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
        Region:
        <input
          type="text"
          name="region"
          value={formData.region}
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default CountriesPage;
