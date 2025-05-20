import {Link} from "react-router-dom";
import "../css/Navbar.css"

function Navbar() {
    return <nav className="navbar">
        <div className="navbar-title">
            <Link to="/">Bot Status Page</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Search</Link>
            <Link to="/starred" className="navlink">Starred</Link>
        </div>
    </nav>
}

export default Navbar