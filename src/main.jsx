import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/index.jsx"
import Lua from "./pages/lua/lua.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/SPACED/" element={<Home />} />
        <Route path="/Lua/" element={<Lua />} />
      </Routes>
    </Router>
  </StrictMode>
)
