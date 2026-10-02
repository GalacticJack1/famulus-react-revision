
function Spellcard(props) {

    let bookClass = "";

if (props.selectedClass === "WIZARD") {
    bookClass = "wizard-book";
}
else if (props.selectedClass === "SORCERER") {
    bookClass = "sorcerer-book";
}
else if (props.selectedClass === "WARLOCK") {
    bookClass = "warlock-book";
}
else if (props.selectedClass === "CLERIC") {
    bookClass = "cleric-book";
}
else if (props.selectedClass === "DRUID") {
    bookClass = "druid-book";
}
else if (props.selectedClass === "BARD") {
    bookClass = "bard-book";
}
else if (props.selectedClass === "PALADIN") {
    bookClass = "paladin-book";
}
else if (props.selectedClass === "RANGER") {
    bookClass = "ranger-book";
}
if (props.bookClass) {
    bookClass = props.bookClass;
}

    return (
        <button className={`spell-button ${bookClass}`}
        onClick ={function () {
            props.handleSpellClick(props.spell);
        }}
        >
            {props.spell.name}
            <br />
            - Level {props.spell.level} -
        </button>
    );
}


export default Spellcard