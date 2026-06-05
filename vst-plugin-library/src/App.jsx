import { Routes, Route } from "react-router-dom";
import PluginList from "./pages/PluginList";
import PluginDetail from "./pages/PluginDetail";
import PluginForm from "./pages/PluginForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<PluginList />} />
          <Route path="/plugins/new" element={<PluginForm />} />
          <Route path="/plugins/:id" element={<PluginDetail />} />
          <Route path="/plugins/:id/edit" element={<PluginForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;