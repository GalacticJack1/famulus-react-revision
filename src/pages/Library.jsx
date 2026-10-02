import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import React from "react";
import Spellcard from "../components/Spellcard";
import Searchbar from "../components/SearchBar";
import loadingFire from "../assets/loadingfire.gif";
import noResults from "../assets/oops.png"

function Library() {

    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") || "";

    const [spells, setSpells] = useState([]);

    const [classSpells, setClassSpells] = useState([]);

    const [searchInput, setSearchInput] = useState(search);

    const [sortOption, setSortOption] = useState("A_TO_Z");

    const [loading, setLoading] = useState(true);

    const [selectedSpell, setSelectedSpell] = useState(null);

    const [spellBookClasses, setSpellBookClasses] = useState({});

    useEffect(function () {

        document.body.classList.add("library");
       
        return function () {
            document.body.classList.remove("library");
        };

    }, []);
useEffect(function () {

        async function getSpells() {

            const response = await fetch(
                "https://www.dnd5eapi.co/api/2014/spells"
            );

            const data = await response.json();

            setSpells(data.results);  
            
                await new Promise(function (resolve) {
        setTimeout(resolve, 1000);
    })
            
            setLoading(false);
          }

          getSpells();

    }, []);
    useEffect(function () {

const bookClassesByClass = {
    wizard: "wizard-book",
    sorcerer: "sorcerer-book",
    warlock: "warlock-book",
    cleric: "cleric-book",
    druid: "druid-book",
    bard: "bard-book",
    paladin: "paladin-book",
    ranger: "ranger-book"
};

 async function buildBookClasses() {

    const classes = [
        "wizard",
        "sorcerer",
        "warlock",
        "cleric",
        "druid",
        "bard",
        "paladin",
        "ranger"
    ];

    const bookClasses = {};

    for (const className of classes) {

        const response = await fetch(
            `https://www.dnd5eapi.co/api/2014/classes/${className}/spells`
        );

        const data = await response.json();

        data.results.forEach(function (spell) {

            if (!bookClasses[spell.index]) {
                bookClasses[spell.index] =
                    bookClassesByClass[className];
            }

        });
    }

    setSpellBookClasses(bookClasses);
}

    buildBookClasses();

}, []);

    function handleSearchChange(event) {
        setSearchInput(event.target.value);
    }

   function handleSearchSubmit(event) {
    event.preventDefault();

    const cleanedSearch = searchInput.trim();

    setSearchParams({
        search: cleanedSearch
    });
}   
    
    const classOptions = [
        "WIZARD",
        "SORCERER",
        "WARLOCK",
        "CLERIC",
        "DRUID",
        "BARD",
        "PALADIN",
        "RANGER"
    ];



    function handleSortChange(event) {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    if (classOptions.includes(selectedOption)) {
        getClassSpells(selectedOption.toLowerCase());
    }
}

async function getClassSpells(className) {

    setLoading(true);

    const response = await fetch(
        `https://www.dnd5eapi.co/api/2014/classes/${className}/spells`
    );

    const data = await response.json();

    setClassSpells(data.results);

        await new Promise(function (resolve) {
        setTimeout(resolve, 1000);
    })

    setLoading(false);
}

async function handleSpellClick(spell) {
    const response = await fetch(
        `https://www.dnd5eapi.co${spell.url}`
    );
    const data = await response.json();

    setSelectedSpell(data);
}


let spellsToDisplay = spells;

if (classOptions.includes(sortOption)) {
    spellsToDisplay = classSpells;
}


    const filteredSpells = spellsToDisplay.filter(function (spell) {

        return spell.name 
        .toLowerCase()
        .includes(search.toLowerCase());

    });


    const sortedSpells = [...filteredSpells];
    if (sortOption === "A_TO_Z") {

    sortedSpells.sort(function (a, b) {
        return a.name.localeCompare(b.name);
});

} else if (sortOption === "Z_TO_A") {

    sortedSpells.sort(function (a, b) {
        return b.name.localeCompare(a.name);
    });

}   else if (sortOption === "LEVEL") {

    sortedSpells.sort(function (a, b) {
        return a.level - b.level;
    });

} 

    return (
        <div className="spell__library">
<div className="library__controls">
            <Searchbar
            search={searchInput}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
            />

<div className="spells__header">

    <h1 className="gold medieval">Spells</h1>
            <select
            value={sortOption}
            onChange={handleSortChange}
            >
                <option value="A_TO_Z">A - Z</option>
                <option value="Z_TO_A">Z - A</option>
                <option value="LEVEL">Level</option>
                <option value="WIZARD">Wizard</option>
                <option value="SORCERER">Sorcerer</option>
                <option value="WARLOCK">Warlock</option>
                <option value="CLERIC">Cleric</option>
                <option value="DRUID">Druid</option>
                <option value="BARD">Bard</option>
                <option value="PALADIN">Paladin</option>
                <option value="RANGER">Ranger</option>
            </select>
            </div>
            </div>


{loading && (
    <div className="spells__loading">
        <img
        className="spells__loading--fire"
        src={loadingFire}
        alt="Loading spells"
        />
        </div>
)}

{!loading && sortedSpells.length === 0 && (
    <div className="no-results">
        <img
        className="no-results__image"
        src={noResults}
        alt="Emmy couldn't find any spells"
        />
        <p>Oops! Emmy couldn't find anything...search again?</p>
        </div>
)}

{selectedSpell && (
    <div className="modal-backdrop">
    <dialog 
    className="pop-up-book"
    id ="spell-details"
    open>
    <button 
     className="close-book"
     onClick={function () {
        setSelectedSpell(null);
    }}
    >
        X
        </button>
        <div className="spell-details">

            <h2>{selectedSpell.name}</h2>

            <p>
                Level {selectedSpell.level}
            </p>

            <p>
                School: {selectedSpell.school.name}
            </p>

            <p>
        Classes: {selectedSpell.classes
            .map(function (classItem) {
                return classItem.name;
            })
            .join(", ")}
    </p>

            <p>
                Range: {selectedSpell.range}
            </p>
            <p>
                 {selectedSpell.desc}
            </p>
           
        </div>
    </dialog>
    </div>
)}
   {!loading && (
    <div id="spell-list">

        {sortedSpells.map(function (spell) {
            return (
                <Spellcard
                    key={spell.index}
                    spell={spell}
                    selectedClass={sortOption}
                    handleSpellClick={handleSpellClick}
                    bookClass={spellBookClasses[spell.index]}
                />
            );
        })}

    </div>
)}
        </div>
    );
}

export default Library

       