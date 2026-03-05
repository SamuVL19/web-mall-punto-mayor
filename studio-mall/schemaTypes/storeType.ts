import { defineField, defineType } from 'sanity'

export const storeType = defineType({
  name: 'store',
  title: 'Locales',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Local',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Amigable',
      type: 'slug',
      options: { source: 'name' }, // Se genera automático basado en el nombre
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Comida/Restaurante', value: 'comida' },
          { title: 'Ropa/Moda', value: 'ropa' },
          { title: 'Salud/Droguería', value: 'salud' },
          { title: 'Servicios', value: 'servicios' },
        ],
      },
    }),
    defineField({
      name: 'logo',
      title: 'Logo del Local',
      type: 'image',
      options: { hotspot: true }, // Permite recortar la imagen en el panel
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text', // Un texto simple para la info del local
    }),
    defineField({
      name: 'whatsapp',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Incluye el código de país sin el +, ej: 573001234567',
    }),
    defineField({
      name: 'location',
      title: 'Ubicación Física',
      type: 'string',
      placeholder: 'Ej: Piso 1, Local 102',
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Fotos',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'hours',
      title: 'Horario de Atención',
      type: 'string', // Ej: "Lunes a Viernes: 8:00 AM - 8:00 PM"
    }),
    defineField({
      name: 'mapInstructions',
      title: 'Instrucciones de Ubicación',
      type: 'text', // Ej: "Al lado del cajero principal"
    }),
  ],
})