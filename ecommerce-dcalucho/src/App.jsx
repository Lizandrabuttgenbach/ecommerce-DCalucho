import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './views/Home' 
import Login from './views/Login'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const [cantidadCarrito, setCantidadCarrito] = useState(0)

  return (
    
    <div className="bg-bg-primary min-h-screen flex flex-col justify-between font-inter">
      <Header cantidad={cantidadCarrito} />

      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-grow">
        <Routes>
          <Route path="/" element={<Home setCantidad={setCantidadCarrito} />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/producto/:id" element={<DetalleProducto />} /> */}
        </Routes>
      </main>

      <Footer />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  )
}

export default App