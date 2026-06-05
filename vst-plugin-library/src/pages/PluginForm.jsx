import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPluginById, getAllCategories, createPlugin, updatePlugin } from "../services/api";

const PLUGIN_TYPES = ["VST2", "VST3", "AU", "AAX"];

const emptyForm = {
  name: "",
  developer: "",
  categoryId: "",
  type: "",
  rating: "",
  notes: "",
  isFavorite: false,
};

function PluginForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
  getAllCategories()
    .then((data) => {
      console.log("Kategorien geladen:", data);
      setCategories(data);
    })
    .catch((err) => {
      console.error("Fehler beim Laden der Kategorien:", err);
    });

  if (isEdit) {
    getPluginById(id)
      .then((data) => {
        setForm(data);
        setLoading(false);
      })
      .catch(() => {
        setApiError("Plugin nicht gefunden (404)");
        setLoading(false);
      });
  }
}, [id]);

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name ist ein Pflichtfeld";
    if (!form.developer.trim()) newErrors.developer = "Entwickler ist ein Pflichtfeld";
    if (!form.categoryId) newErrors.categoryId = "Kategorie ist ein Pflichtfeld";
    if (!form.type) newErrors.type = "Typ ist ein Pflichtfeld";
    return newErrors;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      if (isEdit) {
        await updatePlugin(id, form);
      } else {
        await createPlugin(form);
      }
      navigate("/");
    } catch {
      setApiError("Speichern fehlgeschlagen. Bitte versuche es erneut.");
    }
  }

  const inputStyle = (field) => ({
    width: "100%",
    padding: "0.6rem",
    borderRadius: "6px",
    border: errors[field] ? "1px solid red" : "1px solid #ccc",
    fontSize: "1rem",
    boxSizing: "border-box",
  });

  if (loading) return <p>Laden...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Link to="/" style={{ color: "#7ec8e3", textDecoration: "none" }}>← Zurück</Link>
      <h1 style={{ marginBottom: "1.5rem" }}>
        {isEdit ? "Plugin bearbeiten" : "Neues Plugin erfassen"}
      </h1>

      {apiError && (
        <div style={{ background: "#ffe0e0", color: "red", padding: "0.8rem", borderRadius: "6px", marginBottom: "1rem" }}>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>

        <div>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.3rem" }}>
            Name *
          </label>
          <input name="name" value={form.name} onChange={handleChange} style={inputStyle("name")} placeholder="z.B. Serum" />
          {errors.name && <p style={{ color: "red", margin: "0.2rem 0 0 0", fontSize: "0.85rem" }}>{errors.name}</p>}
        </div>

        <div>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.3rem" }}>
            Entwickler *
          </label>
          <input name="developer" value={form.developer} onChange={handleChange} style={inputStyle("developer")} placeholder="z.B. Xfer Records" />
          {errors.developer && <p style={{ color: "red", margin: "0.2rem 0 0 0", fontSize: "0.85rem" }}>{errors.developer}</p>}
        </div>

        <div>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.3rem" }}>
            Kategorie *
          </label>
          <select name="categoryId" value={form.categoryId} onChange={handleChange} style={inputStyle("categoryId")}>
            <option value="">Kategorie wählen...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.categoryId && <p style={{ color: "red", margin: "0.2rem 0 0 0", fontSize: "0.85rem" }}>{errors.categoryId}</p>}
        </div>

        <div>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.3rem" }}>
            Plugin-Typ *
          </label>
          <select name="type" value={form.type} onChange={handleChange} style={inputStyle("type")}>
            <option value="">Typ wählen...</option>
            {PLUGIN_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.type && <p style={{ color: "red", margin: "0.2rem 0 0 0", fontSize: "0.85rem" }}>{errors.type}</p>}
        </div>

        <div>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.3rem" }}>
            Bewertung (1–5)
          </label>
          <input name="rating" type="number" min="1" max="5" value={form.rating} onChange={handleChange} style={inputStyle("rating")} placeholder="z.B. 4" />
        </div>

        <div>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.3rem" }}>
            Notizen
          </label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} style={{ ...inputStyle("notes"), resize: "vertical" }} placeholder="Persönliche Notizen zum Plugin..." />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input type="checkbox" name="isFavorite" id="isFavorite" checked={form.isFavorite} onChange={handleChange} />
          <label htmlFor="isFavorite">Als Favorit markieren ⭐</label>
        </div>

        <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.5rem" }}>
          <button type="submit" style={{
            background: "#1a1a2e",
            color: "#7ec8e3",
            padding: "0.7rem 1.5rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}>
            💾 Speichern
          </button>
          <Link to="/" style={{
            padding: "0.7rem 1.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            textDecoration: "none",
            color: "#333",
            fontWeight: "bold"
          }}>
            Abbrechen
          </Link>
        </div>
      </form>
    </div>
  );
}

export default PluginForm;