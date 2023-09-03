import React from "react";

const CountriesTable = ({ countries }) => {
  return (
    <div>
      <h2>Countries List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Population</th>
            <th>Region</th>
            <th>Capital</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => (
            <tr key={index}>
              <td>{country.name.common}</td>
              <td>{country.population}</td>
              <td>{country.region}</td>
              <td>{country.capital}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountriesTable;
