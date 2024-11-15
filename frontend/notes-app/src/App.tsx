import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import { Toaster } from 'sonner'

const routes = (
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>
      {routes}
      <Toaster richColors position="bottom-left"/>
    </div>
  )
}

export default App