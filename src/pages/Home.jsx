import { useEffect, useState } from "react";
import Searchbar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import emmy from "../assets/Famemmy.png"


function Home() {
  const libraryName = "Famulus";
  
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

function handleSearchSubmit(event) {
    event.preventDefault();

    const cleanedSearch = search.trim();

    navigate(`/spells?search=${encodeURIComponent(search)}`);
}

useEffect(function () {

    document.body.classList.add("home");

    return function () {
        document.body.classList.remove("home");
    };

}, []);

 return (
    <main className="search__engine--container">

        <div className="search__description">

            <h1 className="search__description--title fade-in">
                Welcome to <span className="gold medieval">{libraryName}!</span>
            </h1>

            <h2 className="search__description--title2 fade-in">
                Your magical library for all things D&D 5E!
            </h2>

            <p className="fade-in">
                What can our reliable goblin assistant find for you?
            </p>

        </div>

        <Searchbar
            search={search}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
        />

        <img
            src={emmy}
            className="Famulus__mascot"
            alt="Emmy, the Famulus goblin assistant"
        />

    </main>
);
}

export default Home; 