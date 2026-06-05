import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPluginById, getAllCategories, deletePlugin } from "../services/api";

function PluginDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plugin, setPlugin] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPluginById(id), getAllCategories()])
      .then(([pluginData, categoryData]) => {
        setPlugin(pluginData);
        setCategories(categoryData);
      })
      .catch(() => setError("Plugin nicht gefunden (404)"))
      .finally(() => setLoading(false));
  }, [id]);

  function getCategoryName(categoryId) {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : "Unbekannt";
  }

  async function handleDelete() {
    if (!window.confirm(`Plugin "${plugin.name}" wirklich löschen?`)) return;
    try {
      await deletePlugin(id);
      navigate("/");
    } catch {
      setError("Plugin konnte nicht gelöscht werden");
    }
  }

  if (loading) return <p>Laden...</p>;
  if (error) return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2 style={{ color: "red" }}>{error}</h2>
      <Link to="/" style={{ color: "#7ec8e3" }}>← Zurück zur Übersicht</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Link to="/" style={{ color: "#7ec8e3", textDecoration: "none" }}>← Zurück</Link>

      <div style={{
        background: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "2rem",
        marginTop: "1rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ margin: "0 0 0.3rem 0" }}>
              {plugin.name} {plugin.isFavorite && "⭐"}
            </h1>
            <p style={{ color: "#666", margin: 0 }}>{plugin.developer}</p>
          </div>
          <span style={{
            background: "#1a1a2e",
            color: "#7ec8e3",
            padding: "0.3rem 0.8rem",
            borderRadius: "6px",
            fontSize: "0.9rem"
          }}>
            {plugin.type}
          </span>
        </div>

        <hr style={{ margin: "1.5rem 0", borderColor: "#f0f0f0" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <p style={{ color: "#999", fontSize: "0.85rem", margin: "0 0 0.2rem 0" }}>KATEGORIE</p>
            <p style={{ margin: 0, fontWeight: "bold" }}>{getCategoryName(plugin.categoryId)}</p>
          </div>
          <div>
            <p style={{ color: "#999", fontSize: "0.85rem", margin: "0 0 0.2rem 0" }}>BEWERTUNG</p>
            <p style={{ margin: 0 }}>{"⭐".repeat(plugin.rating || 0)} ({plugin.rating}/5)</p>
          </div>
        </div>

        {plugin.notes && (
          <div style={{ background: "#f8f8f8", borderRadius: "8px", padding: "1rem", marginBottom: "1.5rem" }}>
            <p style={{ color: "#999", fontSize: "0.85rem", margin: "0 0 0.4rem 0" }}>NOTIZEN</p>
            <p style={{ margin: 0 }}>{plugin.notes}</p>
          </div>
        )}

        <div style={{ display: "flex", gap: "0.8rem" }}>
          <Link to={`/plugins/${id}/edit`} style={{
            background: "#1a1a2e",
            color: "#7ec8e3",
            padding: "0.6rem 1.2rem",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold"
          }}>
            ✏️ Bearbeiten
          </Link>
          <button onClick={handleDelete} style={{
            background: "#ff4d4d",
            color: "#fff",
            padding: "0.6rem 1.2rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold"
          }}>
            🗑️ Löschen
          </button>
        </div>
      </div>
    </div>
  );
}

export default PluginDetail;