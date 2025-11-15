// API utility functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export function getApiUrl(endpoint: string): string {
  // Always use local /api/* path
  // Next.js will proxy to VPS via rewrites (server-side)
  return endpoint;
}

export async function fetchApi(endpoint: string, options?: RequestInit) {
  const url = getApiUrl(endpoint);
  console.log('[fetchApi] Fetching:', url, 'API_BASE:', API_BASE_URL);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
    
    const response = await fetch(url, { 
      ...options,
      signal: controller.signal,
      cache: 'no-store',
      mode: 'cors', // Explicitly set CORS mode
      headers: {
        ...options?.headers,
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    console.log('[fetchApi] Response:', response.status, url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error: any) {
    console.error('[fetchApi] Failed:', url, error.message || error);
    console.error('[fetchApi] Error type:', error.name);
    console.error('[fetchApi] Full error:', error);
    
    // Retry once for network errors
    if (error.name === 'TypeError' || error.name === 'AbortError') {
      console.log('[fetchApi] Retrying...');
      try {
        const response = await fetch(url, { 
          ...options, 
          cache: 'no-store',
          mode: 'cors'
        });
        console.log('[fetchApi] Retry success:', response.status);
        return response;
      } catch (retryError: any) {
        console.error('[fetchApi] Retry failed:', retryError.message);
      }
    }
    
    throw error;
  }
}
