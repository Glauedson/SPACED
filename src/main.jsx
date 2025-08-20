import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/P-home/index.jsx";
import Lua from "./pages/P-lua/lua.jsx";
import APOD from "./pages/P-APOD/APOD.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LUA" element={<Lua />} />
        <Route path="/APOD" element={<APOD />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </StrictMode>
);
