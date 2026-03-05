import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { client } from '../lib/sanity'

function LocalDetail() {
  const { slug } = useParams()
  const [local, setLocal] = useState(null)

  useEffect(() => {
    const query = `*[_type == "store" && slug.current == "${slug}"][0]{
      name,
      category,
      location,
      description,
      whatsapp,
      hours,
      mapInstructions,
      "imageUrl": logo.asset->url,
      "gallery": gallery[]{
        "url": asset->url,
        "alt": alt
      }
    }`
    client.fetch(query).then((data) => setLocal(data))
  }, [slug])

  if (!local) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 bg-stone-200 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-stone-200 rounded"></div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 antialiased">
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-stone-50 rounded-[2rem] p-4 md:p-8 aspect-square flex items-center justify-center border border-stone-100 shadow-sm overflow-hidden">
              <img
                src={local.imageUrl}
                alt={local.name}
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-700"
              />
            </div>

            {local.gallery && local.gallery.length > 0 && ( 
              <div className="grid grid-cols-2 gap-4">
                <h2 className="text-2xl font-serif font-bold text-stone-800 mb-2">
                  Conócenos más de cerca
                </h2> <br></br>
                <p className="text-stone-500 font-sans text-sm tracking-wide">
                  Explora nuestro espacio y productos a través de estas imágenes.
                </p><br></br>
                {local.gallery.map((foto, index) => (
                  <div key={index} className="aspect-square rounded-[1.5rem] bg-stone-50 overflow-hidden border border-stone-100 group">
                    <img
                      src={foto.url}
                      alt={foto.alt || `Galería ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-zoom-in"
                    />
                    
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="mb-8">
              <span className="inline-block bg-sage-green/10 text-sage-green px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                {local.category}
              </span>
              <h1 className="text-5xl md:text-6xl font-serif font-black mb-6 leading-[1.1]">
                {local.name}
              </h1>
              <p className="text-stone-500 text-lg leading-relaxed mb-10 font-light">
                {local.description || "Un espacio diseñado para brindarte la mejor experiencia en nuestro mall. Ven y descubre todo lo que tenemos para ofrecerte."}
              </p>
            </div>

            {/* Plan Your Visit Block */}
            <div className="bg-stone-50/50 rounded-3xl p-8 border border-stone-100 space-y-8 mb-12">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 pb-4 border-b border-stone-100">
                Planifica tu visita
              </h3>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100 text-terracotta">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900 mb-1">Horarios</p>
                  <p className="text-sm text-stone-500">{local.hours || "Consultar directamente con el local"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100 text-sage-green">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900 mb-1">Ubicación</p>
                  <p className="text-sm text-stone-500">{local.location}</p>
                  {local.mapInstructions && (
                    <p className="text-xs text-stone-400 mt-1 italic">{local.mapInstructions}</p>
                  )}
                </div>
              </div>
            </div>

            {/* CTA: WhatsApp Section */}
            <div className="mt-auto">
              {local.whatsapp && (
                <a
                  href={`https://wa.me/${local.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center justify-center gap-3 w-full bg-[#25D366] text-white px-8 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-green-200 transition-all duration-300"
                >
                  <span className="absolute inset-0 bg-green-400 rounded-2xl animate-ping opacity-20 pointer-events-none"></span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Contáctanos por WhatsApp
                </a>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}



export default LocalDetail
