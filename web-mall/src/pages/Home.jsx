import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import { Link, useSearchParams } from 'react-router-dom'

function Home() {
  const [locales, setLocales] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const filter = searchParams.get('category') || 'all'
  const searchTerm = searchParams.get('search')?.toLowerCase() || ''

  useEffect(() => {
    const query = `*[_type == "store"]{
      name,
      slug,
      category,
      location,
      "imageUrl": logo.asset->url
    }`
    client.fetch(query).then((data) => setLocales(data))
  }, [])

  const handleFilterChange = (newFilter) => {
    const params = new URLSearchParams(searchParams)
    if (newFilter === 'all') {
      params.delete('category')
    } else {
      params.set('category', newFilter)
    }
    setSearchParams(params)
  }

  const filteredLocales = locales.filter(local => {
    const matchesCategory = filter === 'all' || local.category.toLowerCase() === filter.toLowerCase()
    const matchesSearch = !searchTerm ||
      local.name.toLowerCase().includes(searchTerm) ||
      local.category.toLowerCase().includes(searchTerm)
    return matchesCategory && matchesSearch
  })

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'comida', name: 'Comida' },
    { id: 'ropa', name: 'Ropa' },
    { id: 'salud', name: 'Salud' },
    { id: 'servicios', name: 'Servicios' }
  ]

  return (
    <div className="min-h-screen bg-orange-50/30 font-sans antialiased text-stone-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        {/* Placeholder Hero Image - Warm Community Centered */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=2070")',
          }}
        />
        {/* Soft Warm Overlay */}
        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-50/30" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-black text-white mb-4 drop-shadow-lg tracking-tight">
            Mall Punto Mayor
          </h1>
          <p className="text-xl md:text-2xl font-light text-orange-50 mb-8 drop-shadow-md">
            Tu lugar de encuentro en el corazón del pueblo
          </p>
        </div>
      </section>

      <main id="stores" className="max-w-7xl mx-auto -mt-12 relative z-20 px-4 pb-24">
        {/* Filter Bar */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-stone-200/50 p-4 mb-4 sticky top-24 border border-stone-100 overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar justify-center"> 
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilterChange(cat.id)}
                className={`
                  whitespace-nowrap px-6 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm
                  ${filter.toLowerCase() === cat.id.toLowerCase()
                    ? 'bg-terracotta text-white shadow-lg shadow-terracotta/30 scale-105'
                    : 'bg-stone-50 text-stone-500 hover:bg-stone-100'
                  }
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Summary */}
        {searchTerm && (
          <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <p className="text-stone-400 text-sm font-medium uppercase tracking-widest mb-1">Resultados para</p>
            <h2 className="text-2xl font-serif font-bold text-wood-brown">"{searchTerm}"</h2>
          </div>
        )}

        {/* Store Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredLocales.map((local) => (
            <Link
              key={local.slug?.current || local.name}
              to={`/local/${local.slug?.current}`}
              className="group flex flex-col bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Image Container */}
              <div className="aspect-[4/5] bg-stone-100 relative overflow-hidden">
                {local.imageUrl ? (
                  <img
                    src={local.imageUrl}
                    alt={local.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300 text-6xl font-serif">
                    {local.name[0]}
                  </div>
                )}
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-sage-green shadow-sm border border-stone-50">
                    {local.category}
                  </span>
                </div>
              </div>

              {/* Info Container */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-1 group-hover:text-terracotta transition-colors">
                  {local.name}
                </h3>
                <p className="text-stone-400 text-sm font-medium mb-4 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {local.location}
                </p>
                <div className="mt-auto flex items-center text-terracotta font-bold text-sm">
                  <span>Explorar</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredLocales.length === 0 && (
          <div className="text-center py-24 animate-in fade-in duration-700">
            <div className="bg-stone-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-stone-400 text-xl font-serif italic mb-2">No se encontraron locales</p>
            <p className="text-stone-300 text-sm">Intenta con otros términos o categorías.</p>
          </div>
        )}
      </main>

    </div>
  )
}

export default Home


