import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPlugins, getAllCategories, getPluginsByCategory } from "../services/api";

function PluginList() {
  const [plugins, setPlugins] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch(() => setError("Kategorien konnten nicht geladen werden"));
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetch = selectedCategory
      ? getPluginsByCategory(selectedCategory)
      : getAllPlugins();

    fetch
      .then(setPlugins)
      .catch(() => setError("Plugins konnten nicht geladen werden"))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (loading) return <p>Laden...</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0 }}>Meine Plugin-Sammlung</h1>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem" }}
        >
          <option value="">Alle Kategorien</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {plugins.length === 0 ? (
        <p style={{ color: "#666", textAlign: "center", marginTop: "3rem" }}>
          Keine Plugins in dieser Kategorie gefunden.
        </p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {plugins.map((plugin) => (
            <Link key={plugin.id} to={`/plugins/${plugin.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                padding: "1.2rem",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                transition: "transform 0.1s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ margin: "0 0 0.3rem 0" }}>{plugin.name}</h3>
                  {plugin.isFavorite && <span title="Favorit">⭐</span>}
                </div>
                <p style={{ margin: "0 0 0.5rem 0", color: "#666", fontSize: "0.9rem" }}>{plugin.developer}</p>
                <span style={{
                  background: "#1a1a2e",
                  color: "#7ec8e3",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "4px",
                  fontSize: "0.8rem"
                }}>
                  {plugin.type}
                </span>
                {"⭐".repeat(plugin.rating || 0)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default PluginList;