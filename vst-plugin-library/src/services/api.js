const API_URL = import.meta.env.VITE_API_URL;

// ── PLUGINS ──────────────────────────────────────────
export async function getAllPlugins() {
  const response = await fetch(`${API_URL}/plugins`);
  if (!response.ok) throw new Error("Plugins konnten nicht geladen werden");
  return response.json();
}

export async function getPluginById(id) {
  const response = await fetch(`${API_URL}/plugins/${id}`);
  if (!response.ok) throw new Error("Plugin nicht gefunden");
  return response.json();
}

export async function getPluginsByCategory(categoryId) {
  const response = await fetch(`${API_URL}/plugins?categoryId=${categoryId}`);
  if (!response.ok) throw new Error("Plugins konnten nicht geladen werden");
  return response.json();
}

export async function createPlugin(plugin) {
  const response = await fetch(`${API_URL}/plugins`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plugin),
  });
  if (!response.ok) throw new Error("Plugin konnte nicht erstellt werden");
  return response.json();
}

export async function updatePlugin(id, plugin) {
  const response = await fetch(`${API_URL}/plugins/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plugin),
  });
  if (!response.ok) throw new Error("Plugin konnte nicht aktualisiert werden");
  return response.json();
}

export async function deletePlugin(id) {
  const response = await fetch(`${API_URL}/plugins/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Plugin konnte nicht gelöscht werden");
  return response.json();
}

// ── CATEGORIES ────────────────────────────────────────
export async function getAllCategories() {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) throw new Error("Kategorien konnten nicht geladen werden");
  return response.json();
}