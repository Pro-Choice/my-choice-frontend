
import {Link} from "react-router-dom"
import {useState} from "react"

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
      };

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
      };

    return (
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <h2 className="navbar-brand" href="#">My Choice</h2>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link to ="/dashboard"><a className="nav-link" href="#">Dashboard</a></Link>
      </li>
      <li className="nav-item">
      <Link to ="/browse"><a className="nav-link" href="#">Browse</a></Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={(e) => logout(e)}>Logout</a>
      </li>
      {/* <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li> */}
    </ul>
  </div>
</nav>
    )
}

export default Navbar;