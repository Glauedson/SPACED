import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/index.jsx";
import Lua from "./pages/lua/lua.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router basename="/SPACED/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LUA" element={<Lua />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </StrictMode>
);
