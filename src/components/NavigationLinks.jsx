import { Link } from "react-router-dom";

function NavigationLinks() {
  return (
    <ul className="menu menu-horizontal p-0 text-white ">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  );
}

export default NavigationLinks;