// Smart chains caching with auto-refresh
const CACHE_KEY = 'chains_data_v2';  // Increment version to invalidate old cache
const CACHE_VERSION_KEY = 'chains_version_v2';
const CACHE_TTL = 60 * 1000; // 1 minute

export function getCachedChains() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    const version = sessionStorage.getItem(CACHE_VERSION_KEY);
    
    if (!cached || !version) return null;
    
    const data = JSON.parse(cached);
    const versionData = JSON.parse(version);
    
    // Check if cache expired
    if (Date.now() - versionData.timestamp > CACHE_TTL) {
      return null;
    }
    
    return data;
  } catch {
    return null;
  }
}

export function setCachedChains(chains: any[], count?: number) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(chains));
    sessionStorage.setItem(CACHE_VERSION_KEY, JSON.stringify({
      timestamp: Date.now(),
      count: count || chains.length
    }));
  } catch {
    // Ignore storage errors
  }
}

export function clearChainsCache() {
  try {
    // Clear current version
    sessionStorage.removeItem(CACHE_KEY);
    sessionStorage.removeItem(CACHE_VERSION_KEY);
    
    // Clear old versions
    sessionStorage.removeItem('chains');
    sessionStorage.removeItem('chains_data');
    sessionStorage.removeItem('chains_version');
    sessionStorage.removeItem('chains_data_v1');
    sessionStorage.removeItem('chains_version_v1');
  } catch {
    // Ignore
  }
}

export async function fetchChainsWithCache() {
  // Auto-cleanup old cache keys on first call
  if (typeof window !== 'undefined' && sessionStorage.getItem('chains')) {
    clearChainsCache();
  }
  
  try {
    // Always check server count first (lightweight HEAD request)
    const headResponse = await fetch('/api/chains', { 
      method: 'HEAD',
      cache: 'no-cache'
    });
    
    const serverCount = parseInt(headResponse.headers.get('X-Chains-Count') || '0');
    
    // Try cache
    const cached = getCachedChains();
    if (cached) {
      try {
        const versionData = JSON.parse(sessionStorage.getItem(CACHE_VERSION_KEY) || '{}');
        // If count same and not expired, use cache
        if (versionData.count === serverCount && Date.now() - versionData.timestamp < CACHE_TTL) {
          return cached;
        }
      } catch {
        // Continue to fetch
      }
    }
    
    // Fetch full data if cache miss, count changed, or expired
    const fullResponse = await fetch('/api/chains', { cache: 'no-cache' });
    const chains = await fullResponse.json();
    
    // Update cache with server count
    setCachedChains(chains, serverCount);
    
    return chains;
  } catch (error) {
    // Fallback to cache if network fails
    const cached = getCachedChains();
    if (cached) return cached;
    
    // Last resort: fetch without cache check
    const response = await fetch('/api/chains');
    return response.json();
  }
}
