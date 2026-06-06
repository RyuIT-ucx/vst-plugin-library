# 🎛️ VST Plugin Library

Eine Web-Applikation für Musikproduzenten zum Verwalten ihrer VST-Plugin-Sammlung.
Plugins können erfasst, kategorisiert, bewertet und mit Notizen versehen werden.

Gebaut mit **React**, **React Router** und **json-server**.

---

## Voraussetzungen

Folgende Software muss installiert sein:

| Software | Version  | Download |
|----------|----------|----------|
| Node.js  | ≥ 18     | https://nodejs.org |
| npm      | ≥ 9      | (enthalten in Node.js) |
| Git      | aktuell  | https://git-scm.com |

---

## Installation & Starten

### 1. Repository klonen

```bash
git clone https://github.com/RyuIT-ucx/vst-plugin-library
cd vst-plugin-library
```

### 2. Dependencies installieren

```bash
npm install
```

### 3. JSON-Server starten (Terminal 1)

Der JSON-Server stellt die REST-API auf Port 3001 bereit.

```bash
npx json-server --watch db.json --port 3001
```

✅ API läuft auf: `http://localhost:3001`

### 4. React App starten (Terminal 2)

```bash
npm run dev
```

✅ App läuft auf: `http://localhost:5173`

---

## Funktionen

- 📋 Alle Plugins in einer Übersicht anzeigen
- 🔍 Plugins nach Kategorie filtern
- ➕ Neues Plugin erfassen (mit Validierung)
- ✏️ Bestehendes Plugin bearbeiten
- 🗑️ Plugin löschen (mit Bestätigung)
- ⭐ Plugins als Favorit markieren

---

## Projekt-Struktur
vst-plugin-library/
├── src/
│   ├── components/     # Wiederverwendbare Komponenten (Navbar)
│   ├── pages/          # Seiten (PluginList, PluginDetail, PluginForm, NotFound)
│   ├── services/       # API-Funktionen (api.js)
│   ├── tests/          # Unit-Tests
│   └── main.jsx        # Einstiegspunkt
├── db.json             # Datenbank für json-server
├── .env                # Umgebungsvariablen (API-URL)
└── package.json

---

## Tests ausführen

```bash
npx vitest run
```

---

## Technologien

- [React](https://react.dev)
- [React Router v7](https://reactrouter.com)
- [json-server](https://github.com/typicode/json-server)
- [Vite](https://vite.dev)
- [Vitest](https://vitest.dev)
