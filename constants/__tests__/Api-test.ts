import { API_URL, apiUrl, normalizeBaseUrl } from '../Api';

describe('normalizeBaseUrl', () => {
  it('retire les barres finales et les espaces', () => {
    expect(normalizeBaseUrl(' http://10.0.0.5:2030/ ')).toBe('http://10.0.0.5:2030');
    expect(normalizeBaseUrl('https://api.example.com///')).toBe('https://api.example.com');
  });
});

describe('apiUrl', () => {
  it('assemble la base et le chemin', () => {
    expect(apiUrl('/api/auth/login', 'http://10.0.0.5:2030')).toBe(
      'http://10.0.0.5:2030/api/auth/login'
    );
  });

  it('ajoute la barre manquante entre la base et le chemin', () => {
    expect(apiUrl('api/auth/signup', 'http://10.0.0.5:2030/')).toBe(
      'http://10.0.0.5:2030/api/auth/signup'
    );
  });

  it("utilise l'adresse configurée par défaut", () => {
    expect(apiUrl('/api/auth/login')).toBe(`${API_URL}/api/auth/login`);
  });
});
