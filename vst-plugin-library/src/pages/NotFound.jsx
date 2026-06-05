import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1 style={{ fontSize: "4rem" }}>404</h1>
      <p style={{ fontSize: "1.2rem", color: "#666" }}>Diese Seite existiert nicht.</p>
      <Link to="/" style={{ color: "#7ec8e3" }}>← Zurück zur Übersicht</Link>
    </div>
  );
}

export default NotFound;