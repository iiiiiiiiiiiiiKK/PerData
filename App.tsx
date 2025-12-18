import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';

// --- ICONS ---
const IconBinance = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor">
    <path d="M16 0l-6 6 6 6 6-6-6-6zM6 6l-6 6 6 6 6-6-6-6zM26 6l-6 6 6 6 6-6-6-6zM16 12l-6 6 6 6 6-6-6-6zM6 18l-6 6 6 6 6-6-6-6zM26 18l-6 6 6 6 6-6-6-6zM16 24l-6 6 6 6 6-6-6-6z" />
  </svg>
);

const IconTradingView = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M21 4H3a1 1 0 00-1 1v14a1 1 0 001 1h18a1 1 0 001-1V5a1 1 0 00-1-1zm-1 14H4V6h16v12z" />
    <path d="M6 13h3v4H6zm4-5h3v9h-3zm4 3h3v6h-3z" />
  </svg>
);

const IconX = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconGlobe = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconExport = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const IconSettings = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconArrowUp = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
);

const IconArrowDown = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
);

const IconClose = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// --- STATIC FALLBACK DATA ---
const STATIC_COIN_DATA: Record<string, { sector: string, website: string, description: string }> = {
    'BTC': { sector: 'Layer 1', website: 'https://bitcoin.org', description: 'Bitcoin is the first successful internet money based on peer-to-peer technology.' },
    'ETH': { sector: 'Layer 1', website: 'https://ethereum.org', description: 'Ethereum is a global, open-source platform for decentralized applications.' },
    'SOL': { sector: 'Layer 1', website: 'https://solana.com', description: 'Solana is a fast, secure, and censorship-resistant blockchain providing open infrastructure.' },
    'BNB': { sector: 'Exchange', website: 'https://www.binance.com', description: 'BNB is the cryptocurrency coin that powers the Binance ecosystem.' },
    'XRP': { sector: 'Layer 1', website: 'https://xrpl.org', description: 'XRP Ledger is a decentralized public blockchain built for business.' },
    'DOGE': { sector: 'Meme', website: 'https://dogecoin.com', description: 'Dogecoin is an open source peer-to-peer digital currency.' },
    'ADA': { sector: 'Layer 1', website: 'https://cardano.org', description: 'Cardano is a proof-of-stake blockchain platform.' },
    'AVAX': { sector: 'Layer 1', website: 'https://avax.network', description: 'Avalanche is an open, programmable smart contracts platform.' },
    'TRX': { sector: 'Layer 1', website: 'https://tron.network', description: 'TRON is dedicated to building the infrastructure for a truly decentralized internet.' },
    'DOT': { sector: 'Layer 1', website: 'https://polkadot.network', description: 'Polkadot empowers blockchain networks to work together.' },
    'LINK': { sector: 'Oracle', website: 'https://chain.link', description: 'Chainlink decentralized oracle networks provide tamper-proof inputs.' },
    'SHIB': { sector: 'Meme', website: 'https://shibatoken.com', description: 'Shiba Inu is a decentralized community-building experiment.' },
    'LTC': { sector: 'Payment', website: 'https://litecoin.org', description: 'Litecoin is a peer-to-peer Internet currency that enables instant payments.' },
    'UNI': { sector: 'DeFi', website: 'https://uniswap.org', description: 'Uniswap is a decentralized trading protocol.' },
    'ATOM': { sector: 'Layer 1', website: 'https://cosmos.network', description: 'Cosmos is an ecosystem of networks and tools for creating interoperable blockchains.' },
    'ETC': { sector: 'Layer 1', website: 'https://ethereumclassic.org', description: 'Ethereum Classic is a decentralized computing platform that runs smart contracts.' },
    'XLM': { sector: 'Payment', website: 'https://www.stellar.org', description: 'Stellar is an open network for storing and moving money.' },
    'NEAR': { sector: 'Layer 1', website: 'https://near.org', description: 'NEAR Protocol is a user-friendly and carbon-neutral blockchain.' },
    'FIL': { sector: 'Storage', website: 'https://filecoin.io', description: 'Filecoin is a decentralized storage network.' },
    'SUI': { sector: 'Layer 1', website: 'https://sui.io', description: 'Sui is a first-of-its-kind Layer 1 blockchain.' },
    'APT': { sector: 'Layer 1', website: 'https://aptoslabs.com', description: 'Aptos is a Layer 1 blockchain built with safety and usability in mind.' },
    'OP': { sector: 'Layer 2', website: 'https://optimism.io', description: 'Optimism is a low-cost and lightning-fast Ethereum L2 blockchain.' },
    'ARB': { sector: 'Layer 2', website: 'https://arbitrum.io', description: 'Arbitrum is a suite of Ethereum scaling solutions.' },
    'LDO': { sector: 'DeFi', website: 'https://lido.fi', description: 'Lido is a liquid staking solution for ETH.' },
    'PEPE': { sector: 'Meme', website: 'https://www.pepe.vip', description: 'Pepe is a meme coin designed to be the most memeable memecoin.' },
    'WIF': { sector: 'Meme', website: 'https://dogwifcoin.org', description: 'dogwifhat is a meme coin on Solana.' },
    'RNDR': { sector: 'AI/Depin', website: 'https://rendernetwork.com', description: 'Render Network is the leading provider of decentralized GPU based rendering solutions.' },
    'INJ': { sector: 'DeFi', website: 'https://injective.com', description: 'Injective is a blockchain built for finance.' },
};

// --- STYLES ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
    .dark ::-webkit-scrollbar-thumb { background: #4b5563; }
    .scroll-container { overscroll-behavior-y: contain; }
    /* Sticky Column CSS */
    .sticky-col { position: sticky; left: 0; z-index: 20; }
    .sticky-header { position: sticky; top: 0; z-index: 30; }
    .sticky-header-col { position: sticky; top: 0; left: 0; z-index: 40; }
  `}</style>
);

// --- TYPES ---
export type SortField = 'symbol' | 'price' | 'volume' | 'change1h' | 'change4h' | 'change24h' | 'change7d' | 'change30d' | 'mcap' | 'fdv' | 'dominance' | 'volMcap' | 'circulating' | 'totalMax' | 'ath' | 'atl' | 'hasSpot' | 'listed' | 'funding' | 'sector' | 'rangePos' | 'openInterest' | 'trend';
export type SortDirection = 'asc' | 'desc';
export type ThemeMode = 'light' | 'dark' | 'pixel' | 'lightPixel';
export type SpotFilterMode = 'ALL' | 'YES' | 'NO';

// --- CONFIG ---
const THEMES: any = {
  light: { bg: 'bg-gray-50', card: 'bg-white', textMain: 'text-gray-800', textSub: 'text-gray-500', border: 'border-gray-200', headerBg: 'bg-gray-50', stickyBg: 'bg-gray-50', radius: 'rounded-lg', font: 'font-sans', iconMain: 'text-gray-700', iconHover: 'hover:text-yellow-600', button: 'bg-white hover:bg-gray-50 border-gray-300', buttonActive: 'bg-black text-white border-black', rowBorder: 'border-gray-100', rowHover: 'hover:bg-gray-50', dropdownBg: 'bg-white/95', containerClass: '', modalBg: 'bg-white', modalText: 'text-gray-800', modalBorder: 'border-gray-300', modalSectionTitle: 'text-gray-900', filterBtn: 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700', filterBtnActive: 'bg-black text-white border-black' },
  dark: { bg: 'bg-gray-900', card: 'bg-gray-800', textMain: 'text-gray-100', textSub: 'text-gray-400', border: 'border-gray-700', headerBg: 'bg-gray-800', stickyBg: 'bg-gray-800', radius: 'rounded-lg', font: 'font-sans', iconMain: 'text-gray-400', iconHover: 'hover:text-yellow-400', button: 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-gray-200', buttonActive: 'bg-gray-100 text-gray-900 border-gray-100', rowBorder: 'border-gray-700', rowHover: 'hover:bg-gray-700', dropdownBg: 'bg-gray-800/95', containerClass: 'dark', modalBg: 'bg-gray-800', modalText: 'text-gray-100', modalBorder: 'border-gray-600', modalSectionTitle: 'text-gray-300', filterBtn: 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300', filterBtnActive: 'bg-gray-100 text-gray-900 border-gray-100' },
  pixel: { bg: 'bg-slate-900', card: 'bg-slate-900', textMain: 'text-green-400', textSub: 'text-green-600', border: 'border-green-500 border-b-4 border-r-4 border-t-2 border-l-2', headerBg: 'bg-slate-900 border-b-4 border-green-500', stickyBg: 'bg-slate-900', radius: 'rounded-none', font: "font-['Press_Start_2P'] tracking-tight text-xs", iconMain: 'text-green-600', iconHover: 'hover:text-green-300', button: 'bg-slate-900 hover:bg-green-900 border-green-600 border-2', buttonActive: 'bg-green-500 text-slate-900 border-green-500 border-2', rowBorder: 'border-green-900 border-dashed', rowHover: 'hover:bg-green-900/30', dropdownBg: 'bg-slate-900 border-4 border-green-500', containerClass: 'pixel', modalBg: 'bg-slate-900', modalText: 'text-green-400', modalBorder: 'border-green-500', modalSectionTitle: 'text-green-500', filterBtn: 'bg-slate-900 hover:bg-green-900 border-green-600 border-2 text-green-600', filterBtnActive: 'bg-green-500 text-slate-900 border-green-500 border-2' },
  lightPixel: { bg: 'bg-gray-100', card: 'bg-white', textMain: 'text-gray-900', textSub: 'text-gray-500', border: 'border-gray-900 border-b-4 border-r-4 border-t-2 border-l-2', headerBg: 'bg-white border-b-4 border-gray-900', stickyBg: 'bg-white', radius: 'rounded-none', font: "font-['Press_Start_2P'] tracking-tight text-xs", iconMain: 'text-gray-900', iconHover: 'hover:text-gray-600', button: 'bg-white hover:bg-gray-200 border-gray-900 text-gray-900 border-2', buttonActive: 'bg-gray-900 text-white border-gray-900 border-2', rowBorder: 'border-gray-300 border-dashed', rowHover: 'hover:bg-gray-100', dropdownBg: 'bg-white border-4 border-gray-900', containerClass: 'lightPixel', modalBg: 'bg-white', modalText: 'text-gray-900', modalBorder: 'border-gray-900', modalSectionTitle: 'text-gray-900', filterBtn: 'bg-white hover:bg-gray-200 border-gray-900 text-gray-900 border-2', filterBtnActive: 'bg-gray-900 text-white border-gray-900 border-2' }
};

// --- HELPERS ---
const formatCurrency = (n: any) => typeof n === 'number' && !isNaN(n) ? '$' + Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(n) : '-';
const formatPriceReal = (n: any) => typeof n === 'number' && !isNaN(n) ? n.toLocaleString('en-US', { maximumFractionDigits: 10, useGrouping: false }) : '-';
const formatDate = (s: any) => s ? new Date(s).toISOString().split('T')[0] : '-';
const getListedCategory = (ts: any) => {
  if (!ts) return { label: '-', color: 'text-gray-300' };
  const days = (Date.now() - ts) / (24 * 60 * 60 * 1000);
  if (days < 60) return { label: 'NEW', color: 'bg-green-100 text-green-700 border-green-200' };
  if (days < 180) return { label: 'H2', color: 'bg-blue-50 text-blue-600 border-blue-100' };
  if (days < 365) return { label: '1Y', color: 'bg-purple-50 text-purple-600 border-purple-100' };
  return { label: new Date(ts).getFullYear().toString(), color: 'text-xs text-gray-400' };
};
const normalizeSymbol = (s: string) => {
    let base = s || '';
    ['USDT','FDUSD','USDC','BUSD'].forEach(q => { if(base.endsWith(q)) base = base.slice(0, -q.length); });
    const match = base.match(/^(\d+)(.+)$/);
    return match ? match[2] : base;
};

// Safe Calculation for Range Position (0-100)
const calcRangePos = (current: number, high: number, low: number) => {
    if (!high || !low || high === low || isNaN(current) || isNaN(high) || isNaN(low)) return 50;
    const pos = ((current - low) / (high - low)) * 100;
    return Math.min(100, Math.max(0, pos));
};

// Safe Calculation for Countdown
const getCountdown = (nextFundingTime: number) => {
    if (!nextFundingTime) return '-';
    const now = Date.now();
    const diff = nextFundingTime - now;
    if (diff <= 0) return '00:00:00';
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    if (isNaN(h) || isNaN(m) || isNaN(s)) return '-';
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

// Safe Calculation for Drop from ATH
const calcAthDrop = (current: number, ath: number) => {
    if (!ath || !current || isNaN(ath) || isNaN(current) || ath === 0) return null;
    const drop = ((current - ath) / ath) * 100;
    return isFinite(drop) ? drop : null;
};

// EXPORT COLUMNS DEFINITION
const EXPORT_COLUMNS = [
    { key: 'symbol', label: 'Symbol', format: (v:any) => '$' + normalizeSymbol(v) },
    { key: 'onboardDate', label: 'Listed', format: (v:any) => v ? new Date(v).toISOString().split('T')[0] : '-' },
    { key: 'price', label: 'Price', format: formatPriceReal },
    { key: 'rangePos', label: 'Pos %', format: (v:any) => v?.toFixed(0) + '%' },
    { key: 'fundingRate', label: 'Funding', format: (v:any) => (v * 100).toFixed(4) + '%' },
    { key: 'openInterest', label: 'OI (USD)', format: (v:any) => v?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) },
    { key: 'volume', label: 'Volume', format: (v:any) => v?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) },
    { key: 'changePercent1h', label: '1h %', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'changePercent4h', label: '4h %', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'changePercent24h', label: '24h %', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'changePercent7d', label: '7d %', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'changePercent30d', label: '30d %', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'hasSpot', label: 'Spot', format: (v:any) => v ? 'Yes' : 'No' },
    { key: 'mcap', label: 'Mcap', format: (v:any) => v?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) },
    { key: 'fdv', label: 'FDV', format: (v:any) => v?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) },
    { key: 'dominance', label: 'Dom %', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'volMcapRatio', label: 'V/Mc', format: (v:any) => v?.toFixed(2) },
    { key: 'circulating', label: 'Circulating', format: (v:any) => v?.toLocaleString('en-US') },
    { key: 'totalSupply', label: 'Total Supply', format: (v:any) => v?.toLocaleString('en-US') },
    { key: 'ath', label: 'ATH', format: formatPriceReal },
    { key: 'athDrop', label: 'ATH Drop %', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'sector', label: 'Sector' },
    { key: 'website', label: 'Website' },
    { key: 'description', label: 'Description' }
];

const FILTER_PRESETS = [
    { id: 'all', label: 'All Visible (No Filter)' },
    { id: 'new', label: 'New Listings (<60d)' },
    { id: 'fund_pos_15', label: 'Funding High Top 15' },
    { id: 'fund_neg_15', label: 'Funding Low Top 15' },
    { id: 'vol_20', label: 'Volume Top 20' },
    { id: 'chg7d_up_20', label: '7D Gainers Top 20' },
    { id: 'chg7d_down_20', label: '7D Losers Top 20' },
    { id: 'chg30d_up_20', label: '30D Gainers Top 20' },
    { id: 'chg30d_down_20', label: '30D Losers Top 20' },
];

const DEFAULT_COLUMN_ORDER = [
    'onboardDate', 'price', 'rangePos', 'trend', 'fundingRate', 'openInterest', 
    'volume', 'changePercent1h', 'changePercent4h', 'changePercent24h', 
    'changePercent7d', 'changePercent30d', 'hasSpot', 'mcap', 'fdv', 
    'dominance', 'volMcapRatio', 'circulating', 'totalSupply', 'ath', 
    'atl', 'sector', 'website', 'description'
];

// --- MAIN COMPONENT ---
const App = () => {
  const tickerMapRef = useRef(new Map()); 
  const coinMapRef = useRef(new Map());
  const symbolToIdRef = useRef(new Map());
  const requestedDetailsRef = useRef(new Set()); 
  const spotsRef = useRef(new Set()); 
  const totalMarketCapRef = useRef(0);
  
  const openInterestCacheRef = useRef(new Map()); 
  const oiQueueRef = useRef<string[]>([]); 
  const isFetchingOIRef = useRef(false); 
  
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [favorites, setFavorites] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [showExport, setShowExport] = useState(false);
  const [showColSettings, setShowColSettings] = useState(false);
  const [columnOrder, setColumnOrder] = useState(DEFAULT_COLUMN_ORDER);
  
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('market');
  const [theme, setTheme] = useState('light');
  const [spotFilter, setSpotFilter] = useState('ALL');
  const [assetFilter, setAssetFilter] = useState('USDT');
  
  const t = THEMES[theme];

  // --- INITIALIZATION ---
  useEffect(() => {
    try { 
        const storedFavs = localStorage.getItem('favs');
        if (storedFavs) setFavorites(new Set(JSON.parse(storedFavs)));
        
        const storedCols = localStorage.getItem('columnOrder');
        if (storedCols) setColumnOrder(JSON.parse(storedCols));
    } catch {}

    Object.entries(STATIC_COIN_DATA).forEach(([sym, data]) => coinMapRef.current.set(sym, data));

    initBinance();
    initCoinGecko();
    initSpotMarkets(); 

    const interval = setInterval(() => {
        updateDisplayData();
        setNow(Date.now());
        processOIQueue();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { 
      try { localStorage.setItem('favs', JSON.stringify(Array.from(favorites))); } catch {}
  }, [favorites]);

  useEffect(() => {
      try { localStorage.setItem('columnOrder', JSON.stringify(columnOrder)); } catch {}
  }, [columnOrder]);

  const initSpotMarkets = async () => {
      const urls = [
          'https://api.binance.com/api/v3/exchangeInfo', 
          'https://api1.binance.com/api/v3/exchangeInfo', 
          'https://api2.binance.com/api/v3/exchangeInfo', 
          'https://api3.binance.com/api/v3/exchangeInfo' 
      ];
      for (const url of urls) {
          try {
              const res = await fetch(url);
              if (res.ok) {
                  const data = await res.json();
                  if (data && Array.isArray(data.symbols)) {
                      const spotSet = new Set(data.symbols.filter((s:any) => s.status === 'TRADING').map((s:any) => s.symbol));
                      spotsRef.current = spotSet;
                      return; 
                  }
              }
          } catch (e) {}
      }
  };

  const processOIQueue = async () => {
      if (isFetchingOIRef.current || oiQueueRef.current.length === 0) return;
      isFetchingOIRef.current = true;
      const batch = oiQueueRef.current.splice(0, 3);
      try {
          await Promise.all(batch.map(async (symbol) => {
              if (openInterestCacheRef.current.has(symbol)) return; 
              try {
                  const res = await fetch(`https://fapi.binance.com/fapi/v1/openInterest?symbol=${symbol}`);
                  if (res.ok) {
                      const d = await res.json();
                      const val = parseFloat(d.openInterest);
                      if (!isNaN(val)) {
                          openInterestCacheRef.current.set(symbol, { oiCoin: val, ts: Date.now() });
                      }
                  }
              } catch (e) {}
          }));
      } catch {}
      isFetchingOIRef.current = false;
  };

  const enqueueOI = useCallback((symbols: string[]) => {
      const newSyms = symbols.filter(s => 
          !openInterestCacheRef.current.has(s) && !oiQueueRef.current.includes(s)
      );
      if (newSyms.length > 0) {
          oiQueueRef.current = [...oiQueueRef.current, ...newSyms];
      }
  }, []);

  const updateDisplayData = () => {
      const combined: any[] = [];
      const globalCap = totalMarketCapRef.current;

      tickerMapRef.current.forEach((val: any, key: string) => {
          const norm = normalizeSymbol(key);
          const cg = coinMapRef.current.get(norm) || {};
          
          let hasSpot = false;
          if (spotsRef.current && spotsRef.current.has) {
             hasSpot = spotsRef.current.has(key) || spotsRef.current.has(norm+'USDT');
          }
          
          const mcap = cg.mcap || 0;
          const dominance = (mcap && globalCap) ? (mcap / globalCap) * 100 : 0;
          const volume = val.volume || 0;
          const volMcapRatio = (volume && mcap) ? volume / mcap : 0;
          const rangePos = calcRangePos(val.price, val.highPrice, val.lowPrice);
          const athDrop = calcAthDrop(val.price, cg.ath);

          const oiData = openInterestCacheRef.current.get(key);
          const openInterest = oiData ? (oiData.oiCoin * val.price) : undefined;

          combined.push({ ...val, ...cg, hasSpot, norm, dominance, volMcapRatio, rangePos, openInterest, athDrop });
      });
      if (combined.length > 0) {
          setDisplayData(combined);
          setIsLoaded(true);
      }
  };

  const initBinance = async () => {
      try {
          const res = await fetch('https://fapi.binance.com/fapi/v1/exchangeInfo').then(r => r.json()).catch(()=>({symbols:[]}));
          if (res && Array.isArray(res.symbols)) {
              const dateMap = new Map();
              res.symbols.forEach((s:any) => dateMap.set(s.symbol, s.onboardDate));

              const tickers = await fetch('https://fapi.binance.com/fapi/v1/ticker/24hr').then(r => r.json()).catch(()=>[]);
              const premiums = await fetch('https://fapi.binance.com/fapi/v1/premiumIndex').then(r => r.json()).catch(()=>[]);
              
              const fundMap = new Map();
              const nextFundMap = new Map();
              if (Array.isArray(premiums)) {
                  premiums.forEach((p:any) => {
                      fundMap.set(p.symbol, parseFloat(p.lastFundingRate));
                      nextFundMap.set(p.symbol, p.nextFundingTime);
                  });
              }

              if (Array.isArray(tickers)) {
                  tickers.forEach((item: any) => {
                      if(!item.symbol.endsWith('USDT') && !item.symbol.endsWith('USDC')) return;
                      tickerMapRef.current.set(item.symbol, {
                          symbol: item.symbol,
                          price: parseFloat(item.lastPrice) || 0,
                          volume: parseFloat(item.quoteVolume) || 0,
                          changePercent24h: parseFloat(item.priceChangePercent) || 0,
                          highPrice: parseFloat(item.highPrice) || 0,
                          lowPrice: parseFloat(item.lowPrice) || 0,
                          fundingRate: fundMap.get(item.symbol) || 0,
                          nextFundingTime: nextFundMap.get(item.symbol),
                          onboardDate: dateMap.get(item.symbol)
                      });
                  });
              }
          }

          const ws = new WebSocket('wss://fstream.binance.com/stream?streams=!ticker@arr/!markPrice@arr');
          ws.onmessage = (e) => {
              try {
                  const msg = JSON.parse(e.data);
                  if(!msg.data) return;
                  const arr = Array.isArray(msg.data) ? msg.data : [msg.data];
                  arr.forEach((d:any) => {
                      const s = d.s;
                      if(!s || (!s.endsWith('USDT') && !s.endsWith('USDC'))) return;
                      const prev = tickerMapRef.current.get(s) || { symbol: s, price: 0, volume: 0, changePercent24h: 0, highPrice: 0, lowPrice: 0 };
                      if(d.e === '24hrTicker') {
                          prev.price = parseFloat(d.c) || prev.price; 
                          prev.volume = parseFloat(d.q) || prev.volume; 
                          prev.changePercent24h = parseFloat(d.P) || prev.changePercent24h;
                          prev.highPrice = parseFloat(d.h) || prev.highPrice;
                          prev.lowPrice = parseFloat(d.l) || prev.lowPrice;
                      } else if (d.r !== undefined) {
                          prev.fundingRate = parseFloat(d.r);
                          prev.nextFundingTime = d.T;
                      }
                      tickerMapRef.current.set(s, prev);
                  });
              } catch {}
          };
      } catch (e) { console.error(e); }
  };

  const initCoinGecko = async () => {
      try {
          const global = await fetch('https://api.coingecko.com/api/v3/global').then(r => r.json()).catch(()=>({}));
          if (global.data?.total_market_cap?.usd) totalMarketCapRef.current = global.data.total_market_cap.usd;

          const list = await fetch('https://api.coingecko.com/api/v3/coins/list').then(r => r.json()).catch(()=>[]);
          if (Array.isArray(list)) list.forEach((c:any) => symbolToIdRef.current.set(c.symbol.toUpperCase(), c.id));

          const markets = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false').then(r => r.json()).catch(()=>[]);
          if (Array.isArray(markets)) {
              markets.forEach((c: any) => {
                  const sym = c.symbol.toUpperCase();
                  symbolToIdRef.current.set(sym, c.id);
                  const prev = coinMapRef.current.get(sym) || {};
                  coinMapRef.current.set(sym, {
                      ...prev, cgId: c.id, mcap: c.market_cap, fdv: c.fully_diluted_valuation,
                      circulating: c.circulating_supply, totalSupply: c.total_supply, maxSupply: c.max_supply,
                      ath: c.ath, athDate: c.ath_date, atl: c.atl, atlDate: c.atl_date
                  });
              });
          }
      } catch (e) { console.error(e); }
  };

  const queueDetails = async (symbol: string, cgId?: string) => {
      const id = cgId || symbolToIdRef.current.get(symbol) || symbol.toLowerCase();
      if (!id || requestedDetailsRef.current.has(id)) return;
      requestedDetailsRef.current.add(id);
      try {
          const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`);
          if (res.ok) {
              const d = await res.json();
              const update = {
                  description: d.description?.en?.split('. ')[0] + '.',
                  website: d.links?.homepage?.[0] || '',
                  sector: d.categories?.[0] || 'General'
              };
              const sym = d.symbol.toUpperCase();
              const prev = coinMapRef.current.get(sym) || {};
              coinMapRef.current.set(sym, { ...prev, ...update });
          }
      } catch {}
  };

  const pendingStatsRef = useRef(new Set());
  const fetchStats = async (s: string) => {
      if(pendingStatsRef.current.has(s)) return;
      pendingStatsRef.current.add(s);
      try {
          const base = 'https://fapi.binance.com/fapi/v1';
          const [k, k1, k4] = await Promise.all([
              fetch(`${base}/klines?symbol=${s}&interval=1d&limit=32`).then(r=>r.json()).catch(()=>[]), 
              fetch(`${base}/klines?symbol=${s}&interval=1h&limit=5`).then(r=>r.json()).catch(()=>[]),
              fetch(`${base}/klines?symbol=${s}&interval=4h&limit=2`).then(r=>r.json()).catch(()=>[])
          ]);
          const item = tickerMapRef.current.get(s);
          if(item) {
              const p = item.price;
              if (Array.isArray(k1) && k1.length) {
                  const prev = parseFloat(k1[k1.length-1][1]);
                  if (!isNaN(prev) && prev !== 0) item.changePercent1h = (p - prev) / prev * 100;
              }
              if (Array.isArray(k4) && k4.length) {
                  const prev = parseFloat(k4[k4.length-1][1]);
                  if (!isNaN(prev) && prev !== 0) item.changePercent4h = (p - prev) / prev * 100;
              }
              if (Array.isArray(k) && k.length>7) {
                  const prev = parseFloat(k[k.length-8][4]);
                  if (!isNaN(prev) && prev !== 0) item.changePercent7d = (p - prev) / prev * 100;
                  const sl = k.map((x:any) => parseFloat(x[4]));
                  if (sl.every((n:number) => !isNaN(n))) item.sparkline = sl;
              }
              if (Array.isArray(k) && k.length>30) {
                  const prev = parseFloat(k[k.length-31][4]);
                  if (!isNaN(prev) && prev !== 0) item.changePercent30d = (p - prev) / prev * 100;
              }
              tickerMapRef.current.set(s, item);
          }
      } catch {}
      setTimeout(() => pendingStatsRef.current.delete(s), 5000);
  };

  const filteredData = useMemo(() => {
      let d = displayData;
      if (assetFilter !== 'ALL') d = d.filter(i => i.symbol.endsWith(assetFilter));
      if (viewMode === 'favorites') d = d.filter(i => favorites.has(i.symbol));
      if (spotFilter === 'YES') d = d.filter(i => i.hasSpot);
      if (spotFilter === 'NO') d = d.filter(i => !i.hasSpot);
      if (search) d = d.filter(i => i.symbol.includes(search.toUpperCase()));
      return d;
  }, [displayData, viewMode, favorites, spotFilter, search, assetFilter]);

  return (
    <div className={`h-[100dvh] flex flex-col ${t.bg} ${t.font}`}>
      <GlobalStyles />
      <div className={`h-12 border-b ${t.border} ${t.headerBg} flex items-center justify-between px-4 shrink-0`}>
          <div className="flex items-center gap-2">
            <div className="font-bold text-sm text-green-500">Binance Futures Pro</div>
            <a href="https://x.com/0xkillcoin" target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:text-green-500 transition-colors">@oAdam</a>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowExport(true)} className={`px-2 py-1 text-xs border rounded uppercase flex items-center gap-1 ${t.button}`}>
                <IconExport className="w-3 h-3" /> Export
            </button>
            <button onClick={() => setShowColSettings(true)} className={`px-2 py-1 text-xs border rounded uppercase flex items-center gap-1 ${t.button}`}>
                <IconSettings className="w-3 h-3" />
            </button>
            <button onClick={() => setTheme(p => p==='light'?'dark':p==='dark'?'pixel':p==='pixel'?'lightPixel':'light')} className={`px-2 py-1 text-xs border rounded uppercase ${t.button}`}>{theme}</button>
          </div>
      </div>

      <div className="p-2 flex gap-2 shrink-0 h-10">
          <button onClick={() => setViewMode('market')} className={`px-3 text-xs border ${viewMode==='market'?t.buttonActive:t.button}`}>Market</button>
          <button onClick={() => setViewMode('favorites')} className={`px-3 text-xs border ${viewMode==='favorites'?t.buttonActive:t.button}`}>Favs</button>
          
          <div className={`flex text-xs border ${t.border} ${theme.includes('Pixel')?'':'rounded'} overflow-hidden`}>
              {['USDT', 'USDC', 'ALL'].map(a => (
                  <button key={a} onClick={() => setAssetFilter(a)} className={`px-3 h-full ${assetFilter === a ? t.buttonActive : t.button} border-r last:border-r-0 ${t.border}`}>
                      {a}
                  </button>
              ))}
          </div>

          <input className={`flex-1 border ${t.border} px-2 text-xs outline-none ${t.bg} ${t.textMain}`} placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>

      <div className="flex-1 min-h-0 relative">
          {isLoaded ? (
              <VirtualTable 
                  data={filteredData} theme={theme} t={t} favorites={favorites}
                  toggleFav={(s: string) => setFavorites(prev => { const n = new Set(prev); n.has(s)?n.delete(s):n.add(s); return n; })}
                  toggleSpot={() => setSpotFilter(p => p==='ALL'?'YES':p==='YES'?'NO':'ALL')}
                  spotFilter={spotFilter}
                  onRequestDetails={queueDetails}
                  onLoadStats={fetchStats}
                  onVisibleSymbols={enqueueOI}
                  columnOrder={columnOrder}
              />
          ) : <div className="absolute inset-0 flex items-center justify-center">Loading...</div>}
      </div>

      {showExport && <ExportModal onClose={() => setShowExport(false)} data={filteredData} t={t} />}
      {showColSettings && (
          <ColumnConfigModal 
            onClose={() => setShowColSettings(false)} 
            currentOrder={columnOrder} 
            onSave={setColumnOrder} 
            t={t} 
          />
      )}
    </div>
  );
};

// --- CONFIG MODAL ---
const ColumnConfigModal = ({ onClose, currentOrder, onSave, t }: any) => {
    const [order, setOrder] = useState([...currentOrder]);

    const move = (idx: number, dir: number) => {
        if ((dir === -1 && idx === 0) || (dir === 1 && idx === order.length - 1)) return;
        const newOrder = [...order];
        const temp = newOrder[idx];
        newOrder[idx] = newOrder[idx + dir];
        newOrder[idx + dir] = temp;
        setOrder(newOrder);
    };

    const handleSave = () => {
        onSave(order);
        onClose();
    };

    const reset = () => setOrder([...DEFAULT_COLUMN_ORDER]);

    const getLabel = (id: string) => EXPORT_COLUMNS.find(c => c.key === id)?.label || id;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className={`w-full max-w-sm flex flex-col ${t.modalBg} ${t.modalText} border ${t.modalBorder} rounded-lg shadow-xl max-h-[80vh]`}>
                <div className={`flex items-center justify-between p-4 border-b ${t.modalBorder}`}>
                    <h2 className="text-lg font-bold">Column Order</h2>
                    <button onClick={onClose}><IconClose className="w-5 h-5" /></button>
                </div>
                <div className="flex-1 overflow-auto p-2">
                    <div className="text-xs opacity-50 mb-2 px-2">First column (Symbol) is fixed.</div>
                    <div className="space-y-1">
                        {order.map((col, idx) => (
                            <div key={col} className={`flex items-center justify-between p-2 border ${t.modalBorder} rounded bg-black/5`}>
                                <span className="text-xs font-mono">{getLabel(col)}</span>
                                <div className="flex gap-1">
                                    <button onClick={() => move(idx, -1)} disabled={idx===0} className="p-1 hover:bg-black/10 rounded disabled:opacity-20"><IconArrowUp className="w-4 h-4"/></button>
                                    <button onClick={() => move(idx, 1)} disabled={idx===order.length-1} className="p-1 hover:bg-black/10 rounded disabled:opacity-20"><IconArrowDown className="w-4 h-4"/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`p-4 border-t ${t.modalBorder} flex justify-between`}>
                    <button onClick={reset} className="text-xs underline opacity-50">Reset Default</button>
                    <div className="flex gap-2">
                        <button onClick={onClose} className={`px-4 py-2 text-sm border rounded ${t.button}`}>Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- EXPORT MODAL ---
const ExportModal = ({ onClose, data, t }: any) => {
    const [selectedCols, setSelectedCols] = useState(new Set([]));
    const [format, setFormat] = useState('markdown'); 
    const [filterPreset, setFilterPreset] = useState('all');
    const [copied, setCopied] = useState(false);

    const activePresetLabel = useMemo(() => 
        FILTER_PRESETS.find(p => p.id === filterPreset)?.label || 'Custom Filter'
    , [filterPreset]);

    const toggleCol = (key: string) => {
        const next = new Set(selectedCols);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        setSelectedCols(next);
    };

    const selectAllCols = () => setSelectedCols(new Set(EXPORT_COLUMNS.map(c => c.key)));
    const clearAllCols = () => setSelectedCols(new Set([]));

    const getFilteredData = () => {
        let d = [...data];
        switch (filterPreset) {
            case 'new': d = d.filter(i => (Date.now() - (i.onboardDate || 0)) / 86400000 < 60); break;
            case 'fund_pos_15': d.sort((a,b) => (b.fundingRate||-Infinity)-(a.fundingRate||-Infinity)); d=d.slice(0,15); break;
            case 'fund_neg_15': d.sort((a,b) => (a.fundingRate||Infinity)-(b.fundingRate||Infinity)); d=d.slice(0,15); break;
            case 'vol_20': d.sort((a,b) => (b.volume||0)-(a.volume||0)); d=d.slice(0,20); break;
            case 'chg7d_up_20': d.sort((a,b) => (b.changePercent7d||-Infinity)-(a.changePercent7d||-Infinity)); d=d.slice(0,20); break;
            case 'chg7d_down_20': d.sort((a,b) => (a.changePercent7d||Infinity)-(b.changePercent7d||Infinity)); d=d.slice(0,20); break;
            case 'chg30d_up_20': d.sort((a,b) => (b.changePercent30d||-Infinity)-(a.changePercent30d||-Infinity)); d=d.slice(0,20); break;
            case 'chg30d_down_20': d.sort((a,b) => (a.changePercent30d||Infinity)-(b.changePercent30d||Infinity)); d=d.slice(0,20); break;
        }
        return d;
    };

    const getExportData = () => {
        const finalData = getFilteredData();
        const cols = EXPORT_COLUMNS.filter(c => selectedCols.has(c.key));
        const rows = finalData.map((item: any) => {
            return cols.map(c => {
                const val = item[c.key];
                return c.format ? c.format(val) : (val || '');
            });
        });
        return { cols, rows, count: finalData.length };
    };

    const generateMarkdown = () => {
        if (selectedCols.size === 0) return 'Please select columns.';
        const { cols, rows } = getExportData();
        if (rows.length === 0) return 'No data.';
        const header = `| ${cols.map(c => c.label).join(' | ')} |`;
        const separator = `| ${cols.map(() => '---').join(' | ')} |`;
        const body = rows.map((r: any[]) => `| ${r.join(' | ')} |`).join('\n');
        return `**${activePresetLabel}**\n\n${header}\n${separator}\n${body}`;
    };

    const generateCSV = () => {
        if (selectedCols.size === 0) return 'No columns selected';
        const { cols, rows } = getExportData();
        if (rows.length === 0) return 'No data';
        const header = cols.map(c => `"${c.label}"`).join(',');
        const body = rows.map((r: any[]) => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
        return `"${activePresetLabel}"\n${header}\n${body}`;
    };

    const generatePlainText = () => {
        if (selectedCols.size === 0) return 'Please select columns.';
        const { cols, rows } = getExportData();
        if (rows.length === 0) return 'No data.';
        const colWidths = cols.map((col, i) => {
            const headerLen = col.label.length;
            const maxDataLen = rows.reduce((max, r) => Math.max(max, String(r[i]).length), 0);
            return Math.max(headerLen, maxDataLen);
        });
        const header = cols.map((c, i) => c.label.padEnd(colWidths[i])).join('   ');
        const separator = cols.map((c, i) => '-'.repeat(colWidths[i])).join('   ');
        const body = rows.map((r: any[]) => r.map((cell, i) => String(cell).padEnd(colWidths[i])).join('   ')).join('\n');
        return `${activePresetLabel}\n\n${header}\n${separator}\n${body}`;
    };

    const handleCopy = () => {
        if (selectedCols.size === 0) return;
        const content = format === 'markdown' ? generateMarkdown() : generatePlainText();
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        if (selectedCols.size === 0) return;
        const csvContent = generateCSV();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `export_${filterPreset}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className={`w-full max-w-4xl max-h-[95vh] flex flex-col ${t.modalBg} ${t.modalText} border ${t.modalBorder} rounded-lg shadow-xl`}>
                <div className={`flex items-center justify-between p-4 border-b ${t.modalBorder}`}>
                    <h2 className="text-lg font-bold">Export Data</h2>
                    <button onClick={onClose}><IconClose className="w-5 h-5" /></button>
                </div>
                <div className="flex-1 overflow-auto p-4 flex gap-4">
                    <div className="w-1/3 flex flex-col gap-4 shrink-0">
                        <div>
                            <h3 className={`text-xs font-bold mb-2 uppercase ${t.modalSectionTitle}`}>1. Filter Logic</h3>
                            <div className="flex flex-col gap-1.5">
                                {FILTER_PRESETS.map(p => (
                                    <button key={p.id} onClick={() => setFilterPreset(p.id)} className={`text-left px-3 py-2 rounded text-xs transition-colors border ${filterPreset===p.id ? t.filterBtnActive : t.filterBtn}`}>{p.label}</button>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className={`text-xs font-bold uppercase ${t.modalSectionTitle}`}>2. Columns</h3>
                                <div className="flex gap-1">
                                    <button onClick={selectAllCols} className="text-[10px] underline opacity-70 hover:opacity-100">All</button>
                                    <span className="text-[10px] opacity-50">/</span>
                                    <button onClick={clearAllCols} className="text-[10px] underline opacity-70 hover:opacity-100">None</button>
                                </div>
                            </div>
                            <div className="overflow-auto flex-1 border rounded p-2 text-xs grid grid-cols-1 gap-1">
                                {EXPORT_COLUMNS.map(col => (
                                    <label key={col.key} className="flex items-center gap-2 cursor-pointer select-none hover:opacity-70"><input type="checkbox" checked={selectedCols.has(col.key)} onChange={() => toggleCol(col.key)} className="rounded border-gray-400"/>{col.label}</label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col min-w-0">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className={`text-xs font-bold uppercase ${t.modalSectionTitle}`}>3. Preview & Format</h3>
                            <div className="flex gap-2">
                                <button onClick={() => setFormat('markdown')} className={`px-3 py-1 text-xs border rounded ${format==='markdown' ? 'bg-blue-500 text-white border-blue-500' : t.button}`}>Markdown</button>
                                <button onClick={() => setFormat('text')} className={`px-3 py-1 text-xs border rounded ${format==='text' ? 'bg-purple-500 text-white border-purple-500' : t.button}`}>Plain Text</button>
                                <button onClick={() => setFormat('csv')} className={`px-3 py-1 text-xs border rounded ${format==='csv' ? 'bg-green-500 text-white border-green-500' : t.button}`}>CSV / Excel</button>
                            </div>
                        </div>
                        <div className="flex-1 border rounded p-2 overflow-hidden bg-black/5">
                            <textarea readOnly value={format === 'markdown' ? generateMarkdown() : format === 'csv' ? generateCSV() : generatePlainText()} className={`w-full h-full text-[10px] font-mono bg-transparent outline-none resize-none whitespace-pre`}/>
                        </div>
                        <div className="mt-2 text-xs text-right opacity-50">Rows: {getFilteredData().length} | Cols: {selectedCols.size}</div>
                    </div>
                </div>
                <div className={`p-4 border-t ${t.modalBorder} flex justify-end gap-2`}>
                    <button onClick={onClose} className={`px-4 py-2 text-sm border rounded ${t.button}`}>Cancel</button>
                    {format === 'csv' ? (
                        <button onClick={handleDownload} className={`px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 font-bold shadow-sm ${selectedCols.size===0?'opacity-50 cursor-not-allowed':''}`}>Download .CSV File</button>
                    ) : (
                        <button onClick={handleCopy} className={`px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 font-bold shadow-sm ${selectedCols.size===0?'opacity-50 cursor-not-allowed':''}`}>{copied ? 'Copied to Clipboard!' : `Copy ${format === 'markdown' ? 'Markdown' : 'Text'}`}</button>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- SPARKLINE COMPONENT ---
const Sparkline = ({ data }: { data?: number[] }) => {
    if (!Array.isArray(data) || data.length < 5) return <div className="w-16 h-8 flex items-center justify-center opacity-20">-</div>;
    if (data.some(n => isNaN(n))) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    if (range === 0) return <div className="w-16 h-0.5 bg-gray-300 opacity-30"></div>;
    const W = 60; const H = 24;
    const points = data.map((p, i) => { const x = (i / (data.length - 1)) * W; const y = H - ((p - min) / range) * H; return `${x},${y}`; }).join(' ');
    const isUp = data[data.length - 1] >= data[0];
    const color = isUp ? '#10b981' : '#ef4444';
    return (<svg width={W} height={H} className="overflow-visible"><polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);
};

const RangeBar = ({ pos }: { pos: number }) => (
    <div className="w-16 h-full flex items-center px-1 shrink-0">
        <div className={`w-full h-1.5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700`}>
            <div className="h-full rounded-full" style={{ width: `${isNaN(pos)?0:pos}%`, backgroundColor: pos > 80 ? '#ef4444' : pos < 20 ? '#10b981' : '#3b82f6' }} />
        </div>
    </div>
);

const PctCell = ({ v, box, isPixel, theme }: any) => (
    <div className={`w-16 px-0.5 h-full flex items-center justify-end shrink-0`}>
        <div className={`w-full text-center ${box?`rounded py-0.5 font-bold ${isPixel?'text-[8px]':'text-[9px]'}`:`text-right ${isPixel?'text-[8px]':'text-[9px]'} font-mono`}`}
             style={{ color: !box?(v>0?'#10b981':'#ef4444'):(isPixel||theme==='lightPixel'?'white':theme==='dark'?'#f3f4f6':'#1f2937'), backgroundColor: box?(v>0?'#10b981':'#ef4444'):'' }}>
            {v !== undefined && !isNaN(v) ? (v>0?'+':'')+v.toFixed(box?2:1)+'%' : '-'}
        </div>
    </div>
);

const VirtualTable = ({ data, theme, t, favorites, toggleFav, toggleSpot, spotFilter, onRequestDetails, onLoadStats, onVisibleSymbols, columnOrder }: any) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [sortField, setSortField] = useState('volume');
    const [sortDir, setSortDir] = useState('desc');
    const isPixel = theme.includes('Pixel');
    const H = isPixel ? 45 : 38;
    const HEADER_HEIGHT = 40;

    const sortedData = useMemo(() => {
        const d = [...data];
        d.sort((a: any, b: any) => {
            let vA = a[sortField];
            let vB = b[sortField];
            if (vA === undefined || vA === null) vA = -Infinity;
            if (vB === undefined || vB === null) vB = -Infinity;
            if (vA < vB) return sortDir === 'asc' ? -1 : 1;
            if (vA > vB) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });
        return d;
    }, [data, sortField, sortDir]);

    const contentScrollTop = Math.max(0, scrollTop - HEADER_HEIGHT);
    const visibleCount = Math.ceil((containerRef.current?.clientHeight || 800) / H) + 15;
    const startIdx = Math.floor(contentScrollTop / H);
    const renderStart = Math.max(0, startIdx - 5);
    const renderEnd = Math.min(sortedData.length, startIdx + visibleCount);
    
    const visibleItems = sortedData.slice(renderStart, renderEnd).map((item: any, index: number) => ({
        ...item,
        virtualRowIndex: renderStart + index
    }));

    useEffect(() => {
        const timer = setTimeout(() => {
            const symbols = visibleItems.map((i: any) => i.symbol);
            visibleItems.forEach((item: any) => {
                if (!item.description) onRequestDetails(item.norm, item.cgId);
                if (item.changePercent7d === undefined) onLoadStats(item.symbol);
            });
            if (onVisibleSymbols) onVisibleSymbols(symbols);
        }, 500); 
        return () => clearTimeout(timer);
    }, [renderStart, sortField, sortDir, visibleItems, onRequestDetails, onLoadStats, onVisibleSymbols]);

    const handleSort = (f: string) => {
        if (sortField === f) setSortDir(p => p==='asc'?'desc':'asc');
        else { setSortField(f); setSortDir('desc'); }
    };

    const COLUMN_DEFS: any = {
        onboardDate: { label: 'Listed', width: 'w-16', render: (item: any) => { const { label, color } = getListedCategory(item.onboardDate); return <div className="w-16 text-center shrink-0 flex justify-center"><span className={`px-1 rounded border ${color}`}>{label}</span></div>; } },
        price: { label: 'Price', width: 'w-16', render: (item: any) => <div className="w-16 text-right px-1 shrink-0 font-mono">{formatPriceReal(item.price)}</div> },
        rangePos: { label: 'Pos', width: 'w-16', center: true, render: (item: any) => <RangeBar pos={item.rangePos} /> },
        trend: { label: 'Trend(7d)', width: 'w-16', center: true, sortable: false, render: (item: any) => <div className="w-16 h-full flex items-center justify-center px-1"><Sparkline data={item.sparkline} /></div> },
        fundingRate: { label: 'Fund/Time', width: 'w-16', render: (item: any) => <div className={`w-16 text-right px-1 shrink-0 font-mono flex flex-col justify-center`}><span className={item.fundingRate>0?'text-green-500':item.fundingRate<0?'text-red-500':''}>{item.fundingRate?(item.fundingRate*100).toFixed(4)+'%':'-'}</span><span className="text-[8px] opacity-50">{getCountdown(item.nextFundingTime)}</span></div> },
        openInterest: { label: 'OI(USD)', width: 'w-16', render: (item: any) => <div className={`w-16 text-right px-1 shrink-0 font-mono ${t.textSub}`}>{item.openInterest ? formatCurrency(item.openInterest) : <span className="opacity-30">...</span>}</div> },
        volume: { label: 'Vol', width: 'w-16', render: (item: any) => <div className={`w-16 text-right px-1 shrink-0 font-mono ${t.textSub}`}>{formatCurrency(item.volume)}</div> },
        changePercent1h: { label: '1h', width: 'w-16', render: (item: any) => <PctCell v={item.changePercent1h} isPixel={isPixel} theme={theme} /> },
        changePercent4h: { label: '4h', width: 'w-16', render: (item: any) => <PctCell v={item.changePercent4h} isPixel={isPixel} theme={theme} /> },
        changePercent24h: { label: '24h', width: 'w-16', center: true, render: (item: any) => <PctCell v={item.changePercent24h} box isPixel={isPixel} theme={theme} /> },
        changePercent7d: { label: '7d', width: 'w-16', render: (item: any) => <PctCell v={item.changePercent7d} isPixel={isPixel} theme={theme} /> },
        changePercent30d: { label: '30d', width: 'w-16', render: (item: any) => <PctCell v={item.changePercent30d} isPixel={isPixel} theme={theme} /> },
        hasSpot: { label: 'Spot', width: 'w-16', render: (item: any) => <div className="w-16 text-center shrink-0">{item.hasSpot?<span className="text-green-500">✓</span>:<span className="text-gray-300">·</span>}</div> },
        mcap: { label: 'Mcap', width: 'w-16', render: (item: any) => <div className="w-16 text-right px-1 shrink-0 font-mono">{formatCurrency(item.mcap)}</div> },
        fdv: { label: 'FDV', width: 'w-16', render: (item: any) => <div className={`w-16 text-right px-1 shrink-0 font-mono ${t.textSub}`}>{formatCurrency(item.fdv)}</div> },
        dominance: { label: 'Dom%', width: 'w-16', render: (item: any) => <div className={`w-16 text-right px-1 shrink-0 font-mono ${t.textSub}`}>{item.dominance?.toFixed(2)}%</div> },
        volMcapRatio: { label: 'V/Mc', width: 'w-16', render: (item: any) => <div className={`w-16 text-right px-1 shrink-0 font-mono ${t.textSub}`}>{item.volMcapRatio?.toFixed(2)}</div> },
        circulating: { label: 'Circ', width: 'w-16', render: (item: any) => <div className={`w-16 text-right px-1 shrink-0 font-mono ${t.textSub}`}>{formatCurrency(item.circulating)}</div> },
        totalSupply: { label: 'Tot', width: 'w-16', render: (item: any) => <div className={`w-16 text-right px-1 shrink-0 font-mono ${t.textSub}`}>{formatCurrency(item.totalSupply)}</div> },
        ath: { label: 'ATH', width: 'w-16', render: (item: any) => <div className="w-16 text-right px-1 shrink-0 font-mono flex flex-col justify-center truncate"><span>{formatPriceReal(item.ath)}</span>{item.athDrop !== null && !isNaN(item.athDrop) && (<span className={`text-[8px] ${item.athDrop < -80 ? 'text-red-500 font-bold' : 'opacity-50'}`}>{item.athDrop.toFixed(0)}%</span>)}</div> },
        atl: { label: 'ATL', width: 'w-16', render: (item: any) => <div className="w-16 text-right px-1 shrink-0 font-mono flex flex-col justify-center truncate"><span>{formatPriceReal(item.atl)}</span><span className="text-[8px] opacity-50">{formatDate(item.atlDate)}</span></div> },
        sector: { label: 'Sector', width: 'w-16', render: (item: any) => <div className="w-16 text-right px-1 shrink-0 truncate">{item.sector||'-'}</div> },
        website: { label: 'Web', width: 'w-16', center: true, sortable: false, render: (item: any) => <div className="w-16 text-center shrink-0 flex justify-center">{item.website?<a href={item.website} target="_blank"><IconGlobe className="w-3 h-3"/></a>:'-'}</div> },
        description: { label: 'Desc', width: 'w-64', align: 'left', sortable: false, render: (item: any) => <div className="w-64 text-left px-2 shrink-0 truncate opacity-70">{item.description||'-'}</div> },
    };

    return (
        <div className={`w-full h-full overflow-auto scroll-container flex flex-col ${t.containerClass}`} ref={containerRef} onScroll={e => setScrollTop((e.target as HTMLDivElement).scrollTop)}>
            <div className="min-w-[2000px] relative flex flex-col">
                <div className={`flex items-center border-b ${t.border} ${t.headerBg} text-[10px] font-bold uppercase ${t.textSub} h-[40px] shrink-0 sticky-header z-30`}>
                    <div className={`w-32 px-2 text-center border-r ${t.border} h-full flex items-center justify-center shrink-0 sticky-header-col ${t.stickyBg} z-40`} onClick={()=>handleSort('symbol')}>Symbol</div>
                    {columnOrder.map((colId: string) => {
                        const def = COLUMN_DEFS[colId];
                        if (!def) return null;
                        return (
                            <div 
                                key={colId} 
                                className={`${def.width} ${def.center?'text-center':'text-right'} px-1 shrink-0 h-full flex items-center ${def.center?'justify-center':'justify-end'} cursor-pointer`}
                                onClick={() => (def.sortable!==false) && handleSort(colId)}
                            >
                                {def.label} {def.label==='Spot' && <span onClick={(e)=>{e.stopPropagation();toggleSpot()}}>{spotFilter==='YES'?'✓':spotFilter==='NO'?'✕':''}</span>}
                            </div>
                        );
                    })}
                </div>

                <div className="relative w-full" style={{ height: sortedData.length * H }}>
                    {visibleItems.map((item: any) => {
                        const top = item.virtualRowIndex * H;
                        return (
                            <div key={item.symbol} className={`absolute left-0 w-full flex items-center border-b ${t.rowBorder} ${t.rowHover} text-[10px] ${t.textMain}`} style={{ height: H, top }}>
                                {/* Fixed First Column */}
                                <div className={`w-32 px-2 sticky-col border-r ${t.rowBorder} ${t.stickyBg} z-20 h-full flex items-center justify-center`}>
                                    <span onClick={()=>toggleFav(item.symbol)} className={`mr-2 cursor-pointer ${favorites.has(item.symbol)?'text-yellow-400':'text-gray-300'}`}>★</span>
                                    <div className="flex flex-col items-center w-full overflow-hidden">
                                        <span className="font-bold truncate">{item.symbol}</span>
                                        <div className="flex gap-1 mt-0.5 opacity-60">
                                            <a 
                                                href={`https://www.binance.com/en/futures/${item.symbol}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="hover:text-[#FCD535] transition-colors"
                                                title="Binance Futures"
                                            >
                                                <IconBinance className="w-2.5 h-2.5"/>
                                            </a>
                                            <a 
                                                href={`https://www.tradingview.com/chart/?symbol=BINANCE:${item.symbol}.P`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="hover:text-[#2962FF] transition-colors"
                                                title="TradingView Chart"
                                            >
                                                <IconTradingView className="w-2.5 h-2.5"/>
                                            </a>
                                            <a 
                                                href={`https://twitter.com/search?q=%24${item.norm}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="hover:text-[#1DA1F2] transition-colors"
                                                title="Search on X"
                                            >
                                                <IconX className="w-2.5 h-2.5"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* Dynamic Columns */}
                                {columnOrder.map((colId: string) => {
                                    const def = COLUMN_DEFS[colId];
                                    return def ? <React.Fragment key={colId}>{def.render(item)}</React.Fragment> : null;
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default App;

