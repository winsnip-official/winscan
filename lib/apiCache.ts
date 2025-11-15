// API wrapper with caching support
import { cacheManager, chainCache } from './cache';

/**
 * Fetch with cache support
 * Uses stale-while-revalidate pattern for optimal UX
 */
export async function fetchWithCache<T>(
  url: string,
  options?: RequestInit,
  ttl: number = 30000 // 30 seconds default
): Promise<T> {
  const cacheKey = `fetch_${url}_${JSON.stringify(options || {})}`;
  
  return cacheManager.get(
    cacheKey,
    async () => {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    ttl,
    true // Enable stale-while-revalidate
  );
}

/**
 * Debounce function to limit API calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Fetch chains with localStorage cache (persistent)
 */
export async function fetchChains(): Promise<any[]> {
  // Try to get from localStorage first
  const cached = chainCache.get<any[]>('chains_list');
  if (cached) {
    // Return cached immediately and refresh in background
    fetchChainsFromAPI().catch(console.error);
    return cached;
  }
  
  // No cache, fetch and wait
  return fetchChainsFromAPI();
}

async function fetchChainsFromAPI(): Promise<any[]> {
  const response = await fetch('/api/chains');
  if (!response.ok) {
    throw new Error('Failed to fetch chains');
  }
  
  const chains = await response.json();
  
  // Cache for 1 hour in localStorage
  chainCache.set('chains_list', chains, 60 * 60 * 1000);
  
  return chains;
}

/**
 * Cache configuration for different endpoints
 */
export const CACHE_CONFIG = {
  // Chain configuration - 1 hour (rarely changes)
  chains: 60 * 60 * 1000,
  
  // Latest blocks - 10 seconds (changes frequently)
  latestBlocks: 10 * 1000,
  
  // Block details - 5 minutes (immutable once created)
  blockDetail: 5 * 60 * 1000,
  
  // Transactions - 5 minutes (immutable)
  transactions: 5 * 60 * 1000,
  
  // Transaction detail - 5 minutes (immutable)
  transactionDetail: 5 * 60 * 1000,
  
  // Validators - 30 seconds (voting power changes)
  validators: 30 * 1000,
  
  // Validator detail - 1 minute
  validatorDetail: 60 * 1000,
  
  // Proposals - 30 seconds
  proposals: 30 * 1000,
  
  // Proposal detail - 30 seconds
  proposalDetail: 30 * 1000,
  
  // Account balance - 10 seconds
  accountBalance: 10 * 1000,
  
  // Network info - 20 seconds
  networkInfo: 20 * 1000,
  
  // Parameters - 10 minutes (rarely changes)
  parameters: 10 * 60 * 1000,
};

/**
 * Prefetch data to warm up cache
 */
export function prefetchCommonData(chainName: string): void {
  // Prefetch in background without blocking
  Promise.all([
    fetchWithCache(`/api/blocks?chain=${chainName}&limit=10`, {}, CACHE_CONFIG.latestBlocks),
    fetchWithCache(`/api/validators?chain=${chainName}`, {}, CACHE_CONFIG.validators),
    fetchWithCache(`/api/network?chain=${chainName}`, {}, CACHE_CONFIG.networkInfo),
  ]).catch(console.error);
}

/**
 * Clear cache for a specific chain
 */
export function clearChainCache(chainName: string): void {
  console.log(`[ApiCache] Clearing cache for chain: ${chainName}`);
  cacheManager.clearByPattern(chainName);
}

/**
 * Clear all cache
 */
export function clearAllCache(): void {
  console.log('[ApiCache] Clearing all cache');
  cacheManager.clear();
  chainCache.clear();
}
