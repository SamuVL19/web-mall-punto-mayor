import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

export default function Layout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

    // Keep internal state in sync with URL if it changes externally
    useEffect(() => {
        setSearchQuery(searchParams.get('search') || '')
    }, [searchParams])

    const handleComingSoon = (e) => {
        e.preventDefault()
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
        setIsMenuOpen(false)
    }

    const handleSearchCommit = (e) => {
        if (e.key === 'Enter') {
            const term = searchQuery.trim()
            if (term) {
                navigate(`/?search=${encodeURIComponent(term)}`)
            } else {
                navigate('/')
            }
            setIsMenuOpen(false) // Close mobile menu if open
        }
    }

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchQuery(value)
        // Optional: real-time search as user types
        if (value.trim()) {
            navigate(`/?search=${encodeURIComponent(value.trim())}`, { replace: true })
        } else {
            navigate('/', { replace: true })
        }
    }

    return (
        <div className="min-h-screen bg-stone-50/30 flex flex-col font-sans text-stone-900 overflow-x-hidden">
            {/* Toast Notification */}
            <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="bg-wood-brown text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
                    <div className="w-2 h-2 bg-terracotta rounded-full animate-pulse" />
                    <span className="text-sm font-bold uppercase tracking-widest">Próximamente... ¡Estamos trabajando en esto!</span>
                </div>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-stone-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <span className="text-2xl md:text-3xl font-serif font-black tracking-tight text-wood-brown transition-colors group-hover:text-terracotta">
                                Mall Punto Mayor
                            </span>
                        </Link>

                        {/* Desktop Search bar */}
                        <div className="hidden md:flex flex-1 max-w-md mx-8 transition-all duration-300">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleSearchCommit}
                                    placeholder="¿Qué buscas hoy?"
                                    className="w-full bg-stone-100 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-sage-green transition-all"
                                />
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Desktop Nav Actions */}
                        <div className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-widest text-stone-500">
                            <Link to="/" className="hover:text-wood-brown transition-colors border-b-2 border-transparent hover:border-wood-brown pb-1">Inicio</Link>
                            <a href="/#stores" className="hover:text-wood-brown transition-colors border-b-2 border-transparent hover:border-wood-brown pb-1">Locales</a>
                            <a
                                href="https://maps.app.goo.gl/XJWBLzAVTTjuzoBPA"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 hover:text-wood-brown transition-colors border-b-2 border-transparent hover:border-wood-brown pb-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Cómo Llegar
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-stone-600 hover:text-wood-brown transition-colors"
                                aria-label="Toggle menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[400px] border-t border-stone-100' : 'max-h-0'}`}>
                    <div className="px-4 py-6 space-y-4 bg-white shadow-inner">
                        <div className="relative w-full mb-6">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchCommit}
                                placeholder="¿Qué buscas hoy?"
                                className="w-full bg-stone-50 border border-stone-100 rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-sage-green outline-none"
                            />
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <Link to="/" className="block text-lg font-serif font-bold text-stone-800" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
                        <a href="/#stores" className="block text-lg font-serif font-bold text-stone-800" onClick={() => setIsMenuOpen(false)}>Locales</a>
                        <a
                            href="https://maps.app.goo.gl/XJWBLzAVTTjuzoBPA"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-lg font-serif font-bold text-stone-800"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Cómo Llegar
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-stone-950 text-stone-400 pt-20 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-16 pb-16 border-b border-white/5">
                        {/* 1. Mall Info & Address */}
                        <div>
                            <p className="font-serif font-black text-white text-3xl mb-6">Mall Punto Mayor</p>
                            <p className="text-sm leading-relaxed mb-6 italic">
                                Ubicado en el corazón de nuestro pueblo, somos el punto de encuentro favorito para familias y amigos.
                            </p>
                            <div className="space-y-3">
                                <p className="flex items-center gap-3 text-sm">
                                    <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Calle Real #45-20, Centro Histórico
                                </p>
                                <p className="flex items-center gap-3 text-sm">
                                    <svg className="w-5 h-5 text-sage-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Abierto hoy: 10:00 AM - 9:00 PM
                                </p>
                            </div>
                        </div>

                        {/* 2. Categories */}
                        <div>
                            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Categorías</h4>
                            <ul className="space-y-4 text-sm font-medium">
                                <li><Link to="/?category=ropa#stores" className="hover:text-white transition-colors">Moda y Accesorios</Link></li>
                                <li><Link to="/?category=comida#stores" className="hover:text-white transition-colors">Restaurantes y Cafés</Link></li>
                                <li><Link to="/?category=salud#stores" className="hover:text-white transition-colors">Salud y Droguería</Link></li>
                                <li><Link to="/?category=servicios#stores" className="hover:text-white transition-colors">Bancos y Finanzas</Link></li>
                            </ul>
                        </div>

                        {/* 3. Contact & Social Media */}
                        <div>
                            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Conéctanos</h4>
                            <p className="text-sm mb-6">Síguenos en nuestras redes sociales para estar al tanto de eventos y ofertas.</p>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-4.78 2.618-4.803 6.117h-.001c-.023 3.497.436 5.916 4.804 6.117 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.358-.2 4.78-2.618 4.803-6.117h.001c.023-3.497-.436-5.916-4.804-6.117-1.28-.058-1.688-.072-4.947-.072z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-stone-600">
                        <p>© 2026 Mall Punto Mayor. </p>
                        <p>Todos los derechos reservados.</p>
                        <div className="flex gap-8">
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

