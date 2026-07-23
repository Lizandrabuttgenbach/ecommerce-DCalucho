import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast' // Importamos la librería

const Login = () => {
  const [correo, setCorreo] = useState('')
  const [errorValidacion, setErrorValidacion] = useState('') // Estado para mensaje de error visual
  const [procesando, setProcesando] = useState(false) // Estado de carga (Loader)
  const navigate = useNavigate() 

  const registrarUsuario = async (e) => {
    e.preventDefault()
    setErrorValidacion('') // Limpiamos errores previos

    if (!correo.trim()) {
      setErrorValidacion("El campo no puede estar vacío.")
      return // Detiene la función aquí, NO llama a Firebase
    }

    // Expresión regular básica para verificar que parezca un correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(correo)) {
      setErrorValidacion("Por favor, ingresa un correo electrónico válido.")
      return // Detiene la función si el formato es inválido
    }

    // 2. INICIO DE ESTADO DE CARGA
    setProcesando(true)

    const urlApi = "https://firestore.googleapis.com/v1/projects/d-calucho/databases/(default)/documents/usuarios"

    // Nota: El payload utiliza la propiedad "fecha" requerida por tu guía 
    const payload = {
      fields: {
        correo: { stringValue: correo },
        fecha: { stringValue: new Date().toISOString() }
      }
    }

    // 3. BLOQUE DE SEGURIDAD (TRY / CATCH / FINALLY)
    try {
      const respuesta = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!respuesta.ok) throw new Error("Fallo en el servidor de base de datos")

      // NOTIFICACIÓN TOAST DE ÉXITO 
      toast.success("¡Bienvenido D'Calucho lácteos artesanales que deleitan")
      navigate('/') 

    } catch (error) {
      // NOTIFICACIÓN TOAST DE ERROR
      toast.error(error.message)
    } finally {
      // Esto siempre se ejecuta, apagando el botón de carga
      setProcesando(false)
      setCorreo('')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-radius-lg border border-border-default shadow-sm mt-10">
      <h2 className="text-xl font-lora font-bold text-brand-primary mb-4 text-center">Registro de Clientes</h2>
      
      <form onSubmit={registrarUsuario} className="flex flex-col gap-4">
        <div>
          <input
            type="text" // Le quitamos el type="email" y el required para probar nuestra propia validación de React
            placeholder="Ingresa tu correo"
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value)
              setErrorValidacion('') // Limpia el error al escribir
            }}
            className={`w-full p-2 border rounded-radius-md outline-none text-sm transition-colors ${
              errorValidacion 
                ? 'border-error focus:border-error' 
                : 'border-border-default focus:border-brand-primary'
            }`}
            disabled={procesando} // Se bloquea el input si está cargando
          />
          {/* RENDERIZADO CONDICIONAL DEL ERROR */}
          {errorValidacion && (
            <p className="text-error text-xs ml-1 font-inter mt-1 text-left">{errorValidacion}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={procesando} // Evita el doble clic y desactiva el botón
          className={`w-full text-white text-sm font-semibold py-2 rounded-radius-md transition-colors flex justify-center items-center gap-2 ${
            procesando 
              ? 'bg-text-secondary cursor-not-allowed' 
              : 'bg-brand-accent hover:bg-brand-accent-hover'
          }`}
        >
          {procesando ? (
            <>
              {/* SPINNER SVG ANIMADO */}
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Conectando...
            </>
          ) : (
            'Crear Cuenta'
          )}
        </button>
      </form>
    </div>
  )
}

export default Login