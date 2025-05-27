import {Link} from "react-router-dom";
import "../css/Navbar.css"

function Navbar() {
    return <nav className="navbar">
        <div>
            <img src="/mich_off_logo.png" className="logo"/>
        </div>
        <div className="navbar-title">
            SSC Bot Status Page
        </div>
    </nav>
}

export default Navbar