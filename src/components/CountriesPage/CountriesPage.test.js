import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CountriesPage from "./CountriesPage"; // adjust the import according to your folder structure
const axios = require("axios");

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe("CountriesPage", () => {
  // Mock data for the countries
  const mockCountries = [
    { name: { common: "United States" }, population: 331000000 },
    { name: { common: "India" }, population: 1380000000 },
    { name: { common: "United Kingdom" }, population: 68100000 },
  ];

  // Test filter by name
  it("filters countries by name", async () => {
    axios.get.mockResolvedValue({ data: mockCountries });

    render(<CountriesPage />);

    await waitFor(() => {
      expect(screen.getByText(/United States/)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Country Name:"), {
      target: { value: "India" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("India")).toBeInTheDocument();
    });
  });

  // Test filter by population
  it("filters countries by population", async () => {
    axios.get.mockResolvedValue({ data: mockCountries });

    render(<CountriesPage />);

    await waitFor(() => {
      expect(screen.queryByText("United Kingdom")).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByLabelText("Population less than (in millions):"),
      {
        target: { value: "10" },
      }
    );
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.queryByText("United Kingdom")).toBeNull();
    });
  });

  // Test sorting
  it("sorts countries by name", async () => {
    axios.get.mockResolvedValue({ data: mockCountries });

    render(<CountriesPage />);

    await waitFor(() => {
      expect(screen.getAllByText(/United/).length).toBe(2);
    });

    fireEvent.change(screen.getByLabelText("Sort Order (ascend or descend):"), {
      target: { value: "ascend" },
    });
    fireEvent.click(screen.getByText("Submit"));

    // Implement logic to verify the sorting order
  });

  // Test pagination
  // This is a bit trickier because your current code does not have pagination implemented.
  // Assume you paginate by 2 for demonstration purposes.
  it("paginates countries", async () => {
    axios.get.mockResolvedValue({ data: mockCountries });

    render(<CountriesPage />);

    await waitFor(() => {
      expect(screen.getByText("United States")).toBeInTheDocument();
    });

    // Logic to simulate pagination goes here
  });
});
