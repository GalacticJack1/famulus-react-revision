function Searchbar (props) {
    return (
        <form 
        className={`search__bar fade-in-up ${props.extraClass || ""}`}
        onSubmit={props.handleSearchSubmit}>
            <input
            type="text"
            className="search__bar--area"
            placeholder="Let's get started!"
            value={props.search}
            onChange={props.handleSearchChange}
            />
            <button
            type="submit"
            className="search__bar--button"
            >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            </button>            
        </form>
    );

}

export default Searchbar;