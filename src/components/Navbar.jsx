import famulusLogo from "../assets/famus-logo.png"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav>
            <div className="nav__container">
                <img className="famlogo" src={famulusLogo} alt="Famulus Logo" />
                <ul className="nav__links">
                    <li><Link to="/" className="nav__link highlight">Home</Link></li>
                    <li><Link to="" className="nav__link nav__link--primary">Contact</Link></li>
                </ul>
            </div>
           </nav>
    );
}

export default Navbar;