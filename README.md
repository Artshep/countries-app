# CountriesPage Application

## Application Description

The CountriesPage application is a React-based frontend app designed to interactively filter and sort a list of countries. Built upon RESTful API calls to `restcountries.com`, the app allows users to refine country information based on criteria like the name, population, and sort order. A form above the table allows users to specify their preferences, which then dynamically updates the list below.

The application is modular and consists of multiple components, including `CountriesFilterForm` for the filter form, and `CountriesTable` for displaying the country data. Utilizing React hooks (`useState` and `useEffect`) and employing `axios` for HTTP requests, the application is both robust and maintainable.

## How to Run the Application Locally

1. **Clone the repository**
    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project folder**
    ```bash
    cd <project-folder>
    ```

3. **Install dependencies**
    ```bash
    npm install
    ```

4. **Start the development server**
    ```bash
    npm start
    ```

5. **Access the App**
    Open your web browser and go to `http://localhost:3000` to view the app.

## Example Usage of Developed Endpoint

1. **Fetch All Countries**
    ```javascript
    fetchCountries();
    ```

2. **Fetch First 10 Countries**
    ```javascript
    fetchCountries(10);
    ```

3. **Filter Countries by Name ("United")**
    ```javascript
    fetchCountries().filter(country => country.name.common.includes("United"));
    ```

4. **Filter Countries by Max Population (10 Million)**
    ```javascript
    fetchCountries().filter(country => country.population / 1000000 < 10);
    ```

5. **Sort Countries in Ascending Order**
    ```javascript
    fetchCountries().sort((a, b) => a.name.common.localeCompare(b.name.common));
    ```

6. **Sort Countries in Descending Order**
    ```javascript
    fetchCountries().sort((a, b) => b.name.common.localeCompare(a.name.common));
    ```

7. **Fetch First 5 Countries and Sort in Ascending Order**
    ```javascript
    fetchCountries(5).sort((a, b) => a.name.common.localeCompare(b.name.common));
    ```

8. **Fetch Countries and Filter by Name and Population**
    ```javascript
    fetchCountries().filter(country => country.name.common.includes("United") && country.population / 1000000 < 100);
    ```

9. **Fetch First 10 Countries, Filter by Name ("United") and Sort in Descending Order**
    ```javascript
    fetchCountries(10).filter(country => country.name.common.includes("United")).sort((a, b) => b.name.common.localeCompare(a.name.common));
    ```

10. **Fetch All Countries and Show Only European Countries**
    ```javascript
    fetchCountries().filter(country => country.region === "Europe");
    ```

