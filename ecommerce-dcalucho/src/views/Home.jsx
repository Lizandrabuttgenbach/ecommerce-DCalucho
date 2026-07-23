import React, { useState, useEffect } from 'react'
import Card from '../components/Card'

const Home = ({ setCantidad }) => {
  
  const [productos, setProductos] = useState([]) 
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [cargando, setCargando] = useState(true) 
  const [errorNet, setErrorNet] = useState(null) 
  const [correoBoletin, setCorreoBoletin] = useState('')
  const [usuarioReg, setUsuarioReg] = useState('')
  const [claveReg, setClaveReg] = useState('')

  
  useEffect(() => {

    const obtenerProductosServidor = async () => {
      try {
        setCargando(true)
        
        const urlApi = "https://firestore.googleapis.com/v1/projects/d-calucho/databases/(default)/documents/productos"
        
        const respuesta = await fetch(urlApi)
        
        if (!respuesta.ok) {
          throw new Error("No se pudo obtener la información del servidor")
        }
        
        const datosJson = await respuesta.json()
        
        const productosLimpios = datosJson.documents.map((doc) => {
          return {
            id: Number(doc.fields.id.integerValue || doc.fields.id.doubleValue),
            nombre: doc.fields.nombre.stringValue,
            precio: Number(doc.fields.precio.doubleValue || doc.fields.precio.integerValue),
            precioAntiguo: Number(doc.fields.precioAntiguo.doubleValue || doc.fields.precioAntiguo.integerValue),
            descuento: doc.fields.descuento ? doc.fields.descuento.stringValue : "",
            imagen: doc.fields.imagen.stringValue
          };
        });
        
    
        setProductos(productosLimpios)
      } catch (err) {
        console.error("Error detectado:", err.message)
        setErrorNet(err.message)
      } finally {
        
        setCargando(false)
      }
    }

    obtenerProductosServidor()
  }, []) 

  
  const incrementarCarrito = () => {
    setCantidad(prev => prev + 1)
  }

  const manejarBoletin = (e) => {
    e.preventDefault() 
    alert(`¡Suscripción exitosa! Enviaremos ofertas a: ${correoBoletin}`)
    setCorreoBoletin('') 
  }

  const manejarRegistro = (e) => {
    e.preventDefault()
    alert(`¡Cuenta creada con éxito!\nBienvenido: ${usuarioReg}`)
    setUsuarioReg('')
    setClaveReg('')
  }

  
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  return (
    <div>
      <section className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-sm mb-8 text-left">
        <h2 className="text-2xl font-bold mb-1">Sabores auténticos de la selva central</h2>
        <p className="text-sm text-emerald-100 mb-4">Directo del productor artesanal a tu mesa de manera sostenible.</p>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 px-4 rounded-xl transition-colors shadow-sm">
          Explorar Colección
        </button>
      </section>

      {/* BARRA DE BÚSQUEDA */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos (ej. miel, café, queso)..."
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          disabled={cargando} // Deshabilitar si está cargando
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-xl font-inter text-sm outline-none focus:border-emerald-600 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mb-12">
        
        {/* SECCIÓN CATÁLOGO DINÁMICO */}
        <section className="col-span-1 lg:col-span-3 text-left">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Catálogo en Tiempo Real</h3>
            {!cargando && (
              <span className="text-xs text-gray-500">{productosFiltrados.length} disponibles</span>
            )}
          </div>

          {/* CONTROL DE FLUJO VISUAL INTERFACES ASÍNCRONAS */}
          {cargando && (
            <div className="text-center py-12 col-span-full font-inter text-gray-500 animate-pulse">
              <p className="text-base font-semibold">Conectando con la base de datos en la nube...</p>
              <p className="text-xs mt-1">Por favor espere un momento.</p>
            </div>
          )}

          {errorNet && !cargando && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl font-inter text-sm col-span-full">
              <p className="font-bold">Error de conexión:</p>
              <p className="text-xs">{errorNet}. Intenta recargar la página más tarde.</p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
            {!cargando && !errorNet && (
              productosFiltrados.length === 0 ? (
                <p className="col-span-full text-center text-gray-500 text-sm py-8 w-full">
                  No hay conexiones en la base de datos para "{terminoBusqueda}".
                </p>
              ) : (
                productosFiltrados.map((item) => (
                  <Card
                    key={item.id} // ID real de la base de datos
                    producto={item}
                    alAgregar={incrementarCarrito}
                  />
                ))
              )
            )}
          </div>
        </section>

        {/* SECCIÓN COLUMNA LATERAL */}
        <div className="flex flex-col gap-6">
          
          {/* FORMULARIO DE REGISTRO */}
          <section className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-left">
            <h3 className="text-lg font-bold text-gray-800 text-base mb-1">Crear Cuenta</h3>
            <p className="text-xs text-gray-500 mb-4">Únete para comprar rápido y seguro.</p>

            <form onSubmit={manejarRegistro} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Usuario / Correo</label>
                <input
                  type="text"
                  placeholder="ejemplo@correo.com"
                  value={usuarioReg}
                  onChange={(e) => setUsuarioReg(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={claveReg}
                  onChange={(e) => setClaveReg(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-emerald-600"
                  required
                />
              </div>

              <button type="submit" className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors shadow-sm">
                  Registrarme
              </button>
            </form>
          </section>

          {/* PANEL LATERAL DE ESTADO */}
          <section className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-left">
            <h3 className="font-bold text-gray-800 text-base mb-2">Estado del Servidor</h3>
            
            <div className="flex items-center gap-2 mb-4 font-inter text-xs">
              <span className={`w-3 h-3 rounded-full ${errorNet ? 'bg-red-500' : cargando ? 'bg-amber-400' : 'bg-emerald-500'}`}></span>
              <span className="text-gray-500">
                {errorNet ? 'Desconectado' : cargando ? 'Sincronizando...' : 'Online (Firebase/cloud)'}
              </span>
            </div>

            <button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-3 rounded-xl transition-colors shadow-sm">
              Procesar Orden
            </button>
          </section>

        </div>

      </div>

      {/* SECCIÓN BOLETÍN INFORMATIVO */}
      <section className="bg-gray-100 p-6 rounded-2xl max-w-md mx-auto border border-gray-200 mb-8">
        <h3 className="text-center font-bold text-gray-800 mb-2">Boletín de la selva</h3>
        <form onSubmit={manejarBoletin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Ingresa tu correo para novedades..."
            value={correoBoletin}
            onChange={(e) => setCorreoBoletin(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-600"
            required
          />
          <button type="submit" className="bg-emerald-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Suscribirme
          </button>
        </form>
      </section>
    </div>
  )
}

export default Home