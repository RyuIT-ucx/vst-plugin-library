import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      background: "#1a1a2e",
      padding: "1rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <Link to="/" style={{ color: "#7ec8e3", fontSize: "1.3rem", fontWeight: "bold", textDecoration: "none" }}>
        🎛️ VST Plugin Library
      </Link>
      <Link to="/plugins/new" style={{
        background: "#7ec8e3",
        color: "#1a1a2e",
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: "bold"
      }}>
        + Neues Plugin
      </Link>
    </nav>
  );
}

export default Navbar;