import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import CountriesPage from "./CountriesPage"; // Change this to your actual import

jest.mock("axios");

describe("CountriesPage component", () => {
  it("renders correctly", () => {
    render(<CountriesPage />);
    expect(screen.getByLabelText("Country Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Region:")).toBeInTheDocument();
    expect(screen.getByLabelText("Capital:")).toBeInTheDocument();
    expect(screen.getByLabelText("Subregion:")).toBeInTheDocument();
  });

  it("handles form input", () => {
    render(<CountriesPage />);
    const input = screen.getByLabelText("Country Name:");
    fireEvent.change(input, { target: { value: "USA" } });
    expect(input.value).toBe("USA");
  });

  it("submits the form", async () => {
    const mockData = [
      {
        name: { common: "United States" },
        region: "Americas",
        capital: ["Washington D.C."],
        subregion: "North America",
      },
    ];

    axios.get.mockResolvedValue({ data: mockData });

    render(<CountriesPage />);

    fireEvent.change(screen.getByLabelText("Country Name:"), {
      target: { value: "United" },
    });
    fireEvent.change(screen.getByLabelText("Region:"), {
      target: { value: "Americas" },
    });
    fireEvent.change(screen.getByLabelText("Capital:"), {
      target: { value: "Washington" },
    });
    fireEvent.change(screen.getByLabelText("Subregion:"), {
      target: { value: "North" },
    });

    const button = screen.getByText("Submit");
    fireEvent.click(button);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(axios.get).toHaveBeenCalledWith(
      "https://restcountries.com/v3.1/all"
    );
  });
});
