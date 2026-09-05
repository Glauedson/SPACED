import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@pages/home';
import Lua from '@pages/lua';
import Apod from '@pages/apod'
import ISS from '@pages/iss';

export default function RoutesPages() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/lua' element={<Lua />} />
        <Route path='/APOD' element={<Apod />} />
        <Route path='/ISS' element={<ISS />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
