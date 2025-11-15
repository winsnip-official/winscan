'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Link from 'next/link';
import { ChainData } from '@/types/chain';
import { Users, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/i18n';

interface Account {
  address: string;
  balance: {
    denom: string;
    amount: string;
  }[];
}

export default function AccountsPage() {
  const params = useParams();
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);
  const [chains, setChains] = useState<ChainData[]>([]);
  const [selectedChain, setSelectedChain] = useState<ChainData | null>(null);
  const [searchAddress, setSearchAddress] = useState('');

  useEffect(() => {
    fetch('/api/chains')
      .then(res => res.json())
      .then(data => {
        setChains(data);
        const chainName = params?.chain as string;
        const chain = chainName 
          ? data.find((c: ChainData) => c.chain_name.toLowerCase().replace(/\s+/g, '-') === chainName.toLowerCase())
          : data.find((c: ChainData) => c.chain_name === 'lumera-mainnet') || data[0];
        if (chain) setSelectedChain(chain);
      });
  }, [params]);

  const chainPath = selectedChain?.chain_name.toLowerCase().replace(/\s+/g, '-') || '';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchAddress.trim()) {
      window.location.href = `/${chainPath}/accounts/${searchAddress.trim()}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      <Sidebar selectedChain={selectedChain} />
      
      <div className="flex-1 flex flex-col">
        <Header chains={chains} selectedChain={selectedChain} onSelectChain={setSelectedChain} />

        <main className="flex-1 mt-16 p-6 overflow-auto">
          <div className="flex items-center text-sm text-gray-400 mb-6">
            <Link href={`/${chainPath}`} className="hover:text-blue-500">{t('overview.title')}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{t('accounts.title')}</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-6">{t('accounts.title')}</h1>

          {/* Search Form */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 mb-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  placeholder={t('accounts.searchPlaceholder')}
                  className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-text-dim focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={!searchAddress.trim()}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-500/90 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                {t('accounts.searchButton')}
              </button>
            </form>
          </div>

          {/* Info Card */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{t('accounts.searchTitle')}</h3>
            <p className="text-gray-400 mb-6">
              {t('accounts.searchDesc')}
            </p>
            <div className="text-left max-w-2xl mx-auto bg-[#0f0f0f] p-4 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">{t('accounts.exampleAddresses')}</p>
              <div className="space-y-2">
                <div className="font-mono text-xs text-white break-all">
                  {selectedChain?.addr_prefix || 'cosmos'}1abc...xyz
                </div>
                <p className="text-xs text-gray-400">
                  {t('accounts.searchAny')} {selectedChain?.chain_name || 'chain'} {t('accounts.network')}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
