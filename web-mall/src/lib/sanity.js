import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true, // true para que sea más rápido (usa caché)
  apiVersion: "2024-03-03", // Fecha de hoy para asegurar compatibilidad
});

// Esto es para que las imágenes de Sanity se vean bien
const builder = imageUrlBuilder(client);
export function urlFor(source) {
  return builder.image(source);
}