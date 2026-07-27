import React from 'react'
import { Link } from 'react-router-dom'
import searchIcon from '../assets/Lupa.webp'
import heardIcon from '../assets/corazon.png'
import cartIcon from '../assets/carrito.png'

const Header = ({ cantidad }) => {
    return (
        <header className="bg-white border-b border-border-default p-4 flex justify-between items-center sticky top-0 z-50 font-inter">
            <div className="header-logo">
                {/* Al hacer clic en el logo, regresamos al Home */}
                <Link to="/" className="text-xl font-lora font-bold text-brand-primary cursor-pointer">
                    D'Calucho Tienda Oficial Artesanal
                </Link>
            </div>

            <nav className="flex items-center gap-4">
                {/* Enlace al Login solicitado por la guía */}
                <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-brand-primary transition-colors">
                    Mi cuenta
                </Link>

                <button className="p-2 hover:bg-bg-secondary rounded-full transition-colors">
                    <img src={searchIcon} alt="Buscar" className="w-6 h-6" />
                </button>
                <button className="p-2 hover:bg-bg-secondary rounded-full transition-colors">
                    <img src={heardIcon} alt="Mis Favoritos" className="w-6 h-6" />
                </button>

                <div className="relative">
                    <button className="p-2 hover:bg-bg-secondary rounded-full transition-colors">
                        <img src={cartIcon} alt="Carrito" className="w-6 h-6" />
                    </button>

                    {/* Globo con estado dinámico corregido para que el número sea totalmente visible */}
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                        {cantidad}
                    </span>
                </div>
            </nav>
        </header>
    )
}

export default Header;