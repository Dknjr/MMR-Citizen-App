/**
 * Adresse de l'API Spring Boot.
 *
 * Elle se règle avec la variable d'environnement EXPO_PUBLIC_API_URL
 * (voir le fichier .env.example). Sans variable, on retombe sur localhost.
 */
export const API_URL = normalizeBaseUrl(
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:2030'
);

/** Retire les « / » finaux pour éviter les doubles barres dans les URL. */
export function normalizeBaseUrl(url: string): string {
  return url.trim().replace(/\/+$/, '');
}

/** Construit l'URL complète d'un endpoint, ex. apiUrl('/api/auth/login'). */
export function apiUrl(path: string, baseUrl: string = API_URL): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizeBaseUrl(baseUrl)}${cleanPath}`;
}
