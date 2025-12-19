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
    /* Sticky Column CSS - Enhanced for Reliability */
    .sticky-col { position: sticky; left: 0; z-index: 50; } 
    .sticky-header { position: sticky; top: 0; z-index: 40; }
    .sticky-header-col { position: sticky; top: 0; left: 0; z-index: 60; } 
  `}</style>
);

// --- TYPES ---
export type SortField = 'symbol' | 'price' | 'volume' | 'change1h' | 'change4h' | 'change24h' | 'change7d' | 'change30d' | 'mcap' | 'fdv' | 'dominance' | 'volMcap' | 'circulating' | 'totalMax' | 'ath' | 'atl' | 'hasSpot' | 'listed' | 'funding' | 'sector' | 'rangePos' | 'openInterest' | 'trend' | 'rsi' | 'turnover' | 'trades' | 'volatility' | 'vwapGap' | 'spread' | 'volStrength' | 'distHL' | 'avgTrade' | 'basis' | 'oiMcapRatio' | 'volOiRatio' | 'sma20Gap' | 'floatRatio' | 'coverTime' | 'imbalance' | 'topDepth' | 'rangePosAll';
export type SortDirection = 'asc' | 'desc';
export type ThemeMode = 'light' | 'dark' | 'pixel' | 'lightPixel';
export type SpotFilterMode = 'ALL' | 'YES' | 'NO';

// --- CONFIG ---
const THEMES: any = {
  light: { bg: 'bg-gray-50', card: 'bg-white', textMain: 'text-gray-800', textSub: 'text-gray-500', border: 'border-gray-200', headerBg: 'bg-gray-50', stickyBg: 'bg-white', radius: 'rounded-lg', font: 'font-sans', iconMain: 'text-gray-700', iconHover: 'hover:text-yellow-600', button: 'bg-white hover:bg-gray-50 border-gray-300', buttonActive: 'bg-black text-white border-black', rowBorder: 'border-gray-100', rowHover: 'hover:bg-gray-50', dropdownBg: 'bg-white/95', containerClass: '', modalBg: 'bg-white', modalText: 'text-gray-800', modalBorder: 'border-gray-300', modalSectionTitle: 'text-gray-900', filterBtn: 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700', filterBtnActive: 'bg-black text-white border-black' },
  dark: { bg: 'bg-gray-900', card: 'bg-gray-800', textMain: 'text-gray-100', textSub: 'text-gray-400', border: 'border-gray-700', headerBg: 'bg-gray-800', stickyBg: 'bg-gray-900', radius: 'rounded-lg', font: 'font-sans', iconMain: 'text-gray-400', iconHover: 'hover:text-yellow-400', button: 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-gray-200', buttonActive: 'bg-gray-100 text-gray-900 border-gray-100', rowBorder: 'border-gray-700', rowHover: 'hover:bg-gray-700', dropdownBg: 'bg-gray-800/95', containerClass: 'dark', modalBg: 'bg-gray-800', modalText: 'text-gray-100', modalBorder: 'border-gray-600', modalSectionTitle: 'text-gray-300', filterBtn: 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300', filterBtnActive: 'bg-gray-100 text-gray-900 border-gray-100' },
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

// Safe Calculation for Range Position
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

// RSI Calculation
const calcRSI = (closes: number[], period: number = 14) => {
    if (closes.length < period + 1) return null;
    let gains = 0, losses = 0;
    for (let i = 1; i <= period; i++) {
        const change = closes[i] - closes[i - 1];
        if (change > 0) gains += change;
        else losses -= change;
    }
    let avgGain = gains / period;
    let avgLoss = losses / period;
    
    for (let i = period + 1; i < closes.length; i++) {
        const change = closes[i] - closes[i - 1];
        avgGain = (avgGain * (period - 1) + (change > 0 ? change : 0)) / period;
        avgLoss = (avgLoss * (period - 1) + (change < 0 ? -change : 0)) / period;
    }

    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
};

// Volatility Calculation
const calcVolatility = (klines: any[]) => {
    if (!klines || klines.length < 7) return 0;
    let sumRange = 0;
    const slice = klines.slice(klines.length - 8, klines.length - 1);
    slice.forEach((k: any) => {
        const h = parseFloat(k[2]);
        const l = parseFloat(k[3]);
        const o = parseFloat(k[1]);
        if (o > 0) sumRange += ((h - l) / o);
    });
    return (sumRange / slice.length) * 100; 
};

// SMA Calculation
const calcSMA = (data: number[], period: number) => {
    if (data.length < period) return null;
    const slice = data.slice(data.length - period);
    const sum = slice.reduce((a, b) => a + b, 0);
    return sum / period;
};

// Width Mapping - EXPORTED
const WIDTH_MAP: any = {
    'w-16': '4rem', 'w-20': '5rem', 'w-24': '6rem', 'w-32': '8rem', 
    'w-40': '10rem', 'w-48': '12rem', 'w-56': '14rem', 'w-64': '16rem', 
    'w-80': '20rem', 'w-96': '24rem'
};
const WIDTH_OPTIONS = Object.keys(WIDTH_MAP);

// EXPORT COLUMNS DEFINITION
const EXPORT_COLUMNS = [
    { key: 'symbol', label: 'Symbol', subLabel: '[代币]', format: (v:any) => '$' + normalizeSymbol(v) },
    { key: 'onboardDate', label: 'Listed', subLabel: '[上线]', format: (v:any) => v ? new Date(v).toISOString().split('T')[0] : '-' },
    { key: 'price', label: 'Price', subLabel: '[价格]', format: formatPriceReal },
    { key: 'imbalance', label: 'Imbal%', subLabel: '[失衡]', format: (v:any) => v?(v*100).toFixed(2)+'%':'-' },
    { key: 'topDepth', label: 'Depth($)', subLabel: '[深度]', format: (v:any) => v?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) },
    { key: 'rangePosAll', label: 'Pos(All)', subLabel: '[历史位置]', format: (v:any) => v?.toFixed(0) + '%' },
    { key: 'floatRatio', label: 'Float %', subLabel: '[流通率]', format: (v:any) => v?.toFixed(1) + '%' },
    { key: 'coverTime', label: 'Cover (H)', subLabel: '[清算]', format: (v:any) => v?.toFixed(1) + 'h' },
    { key: 'basis', label: 'Basis', subLabel: '[基差]', format: (v:any) => v?(v>0?'+':'')+(v*100).toFixed(2)+'%':'-' },
    { key: 'avgTrade', label: 'AvgTrade', subLabel: '[均笔]', format: (v:any) => v?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) },
    { key: 'oiMcapRatio', label: 'OI/Mcap', subLabel: '[杠杆率]', format: (v:any) => v?.toFixed(3) },
    { key: 'volOiRatio', label: 'Vol/OI', subLabel: '[换手/持仓]', format: (v:any) => v?.toFixed(2) },
    { key: 'sma20Gap', label: 'SMA Gap', subLabel: '[均线偏离]', format: (v:any) => v?(v>0?'+':'')+(v*100).toFixed(2)+'%':'-' },
    { key: 'spread', label: 'Spread', subLabel: '[点差]', format: (v:any) => (v * 100)?.toFixed(3) + '%' },
    { key: 'volStrength', label: 'Vol Str', subLabel: '[量能]', format: (v:any) => v?.toFixed(2) + 'x' },
    { key: 'distHL', label: 'Dist H/L', subLabel: '[高低距离]', format: (v:any) => `${(v?.h*100).toFixed(1)}% / ${(v?.l*100).toFixed(1)}%` },
    { key: 'vwapGap', label: 'VWAP Gap', subLabel: '[均价偏离]', format: (v:any) => v?(v>0?'+':'')+(v*100).toFixed(2)+'%':'-' },
    { key: 'rsi', label: 'RSI(14D)', subLabel: '[强弱]', format: (v:any) => v?.toFixed(1) },
    { key: 'volatility', label: 'Vol(7D)', subLabel: '[波动]', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'turnover', label: 'Turnover', subLabel: '[换手]', format: (v:any) => (v * 100)?.toFixed(2) + '%' },
    { key: 'trades', label: 'Trades', subLabel: '[笔数]', format: (v:any) => v?.toLocaleString('en-US') },
    { key: 'rangePos', label: 'Pos %', subLabel: '[位置]', format: (v:any) => v?.toFixed(0) + '%' },
    { key: 'fundingRate', label: 'Funding', subLabel: '[费率]', format: (v:any) => (v * 100).toFixed(4) + '%' },
    { key: 'openInterest', label: 'OI (USD)', subLabel: '[持仓]', format: (v:any) => v?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) },
    { key: 'volume', label: 'Volume', subLabel: '[成交]', format: (v:any) => v?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) },
    { key: 'changePercent1h', label: '1h %', subLabel: '[1时]', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'changePercent4h', label: '4h %', subLabel: '[4时]', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'changePercent24h', label: '24h %', subLabel: '[24时]', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'changePercent7d', label: '7d %', subLabel: '[7天]', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'changePercent30d', label: '30d %', subLabel: '[30天]', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'hasSpot', label: 'Spot', subLabel: '[现货]', format: (v:any) => v ? 'Yes' : 'No' },
    { key: 'mcap', label: 'Mcap', subLabel: '[市值]', format: (v:any) => v?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) },
    { key: 'fdv', label: 'FDV', subLabel: '[全稀释]', format: (v:any) => v?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) },
    { key: 'dominance', label: 'Dom %', subLabel: '[占比]', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'volMcapRatio', label: 'V/Mc', subLabel: '[量值比]', format: (v:any) => v?.toFixed(2) },
    { key: 'circulating', label: 'Circ', subLabel: '[流通]', format: (v:any) => v?.toLocaleString('en-US') },
    { key: 'totalSupply', label: 'Total', subLabel: '[总量]', format: (v:any) => v?.toLocaleString('en-US') },
    { key: 'ath', label: 'ATH', subLabel: '[最高]', format: formatPriceReal },
    { key: 'athDrop', label: 'ATH Drop', subLabel: '[回撤]', format: (v:any) => v?.toFixed(2) + '%' },
    { key: 'sector', label: 'Sector', subLabel: '[板块]' },
    { key: 'website', label: 'Web', subLabel: '[官网]' },
    { key: 'description', label: 'Desc', subLabel: '[描述]' }
];

const FILTER_PRESETS = [
    { id: 'all', label: 'All Visible (No Filter)', desc: '显示当前列表所有可见数据' },
    { id: 'new', label: 'New Listings (<60d)', desc: '上线时间小于60天的代币' },
    { id: 'imbalance_buy', label: 'Bid Imbalance > 20%', desc: '买盘失衡 > 20% (Buy Wall)' },
    { id: 'imbalance_sell', label: 'Ask Imbalance > 20%', desc: '卖盘失衡 > 20% (Sell Wall)' },
    { id: 'rsi_oversold', label: 'RSI Oversold (<30)', desc: 'RSI技术指标小于30 (超卖)' },
    { id: 'rsi_overbought', label: 'RSI Overbought (>70)', desc: 'RSI技术指标大于70 (超买)' },
    { id: 'high_volatility', label: 'High Volatility Top 20', desc: '按7日波动率从高到低排序，取前20名' },
    { id: 'high_avg_trade', label: 'Whale Activity (Avg Trade)', desc: '按平均成交额从高到低排序，取前20名' },
    { id: 'fund_pos_15', label: 'Funding High Top 15', desc: '按资金费率从高到低排序，取前15名' },
    { id: 'fund_neg_15', label: 'Funding Low Top 15', desc: '按资金费率从低到高排序，取前15名' },
    { id: 'vol_20', label: 'Volume Top 20', desc: '按24小时成交量从高到低排序，取前20名' },
    { id: 'chg7d_up_20', label: '7D Gainers Top 20', desc: '按7日涨幅从高到低排序，取前20名' },
    { id: 'chg7d_down_20', label: '7D Losers Top 20', desc: '按7日跌幅从高到低排序，取前20名' },
    // --- NEW FILTERS ---
    { id: 'mcap_top_25', label: 'Market Cap Top 25', desc: '按市值排名第1-25名' },
    { id: 'mcap_25_50', label: 'Market Cap 25-50', desc: '按市值排名第25-50名' },
    { id: 'mcap_50_75', label: 'Market Cap 50-75', desc: '按市值排名第50-75名' },
    { id: 'mcap_75_100', label: 'Market Cap 75-100', desc: '按市值排名第75-100名' },
    { id: 'vol_500m_50b', label: 'Volume 500M-50B', desc: '24小时成交量在5亿到500亿之间' },
    { id: 'vol_100m_500m', label: 'Volume 100M-500M', desc: '24小时成交量在1亿到5亿之间' },
];

const DEFAULT_COLUMN_ORDER = [
    'onboardDate', 'price', 'imbalance', 'topDepth', 'rangePosAll', 'floatRatio', 'coverTime', 'oiMcapRatio', 'volOiRatio', 'sma20Gap', 'vwapGap', 'rsi', 'volatility', 'avgTrade', 'basis', 'trades', 'rangePos', 'trend', 
    'fundingRate', 'openInterest', 'volume', 'changePercent1h', 'changePercent4h', 
    'changePercent24h', 'changePercent7d', 'changePercent30d', 'turnover', 'hasSpot', 
    'mcap', 'fdv', 'dominance', 'volMcapRatio', 'circulating', 'totalSupply', 'ath', 
    'atl', 'sector', 'website', 'description'
];

const DEFAULT_COLUMN_WIDTHS: any = {
    symbol: 'w-24', onboardDate: 'w-16', price: 'w-16', rangePos: 'w-16', trend: 'w-16', fundingRate: 'w-16',
    openInterest: 'w-16', volume: 'w-16', changePercent1h: 'w-16', changePercent4h: 'w-16',
    changePercent24h: 'w-16', changePercent7d: 'w-16', changePercent30d: 'w-16',
    hasSpot: 'w-16', mcap: 'w-16', fdv: 'w-16', dominance: 'w-16', volMcapRatio: 'w-16',
    circulating: 'w-16', totalSupply: 'w-16', ath: 'w-20', atl: 'w-20', sector: 'w-20',
    website: 'w-20', description: 'w-32', rsi: 'w-16', turnover: 'w-16', trades: 'w-16',
    volatility: 'w-16', vwapGap: 'w-16', spread: 'w-16', volStrength: 'w-16', distHL: 'w-16',
    avgTrade: 'w-16', basis: 'w-16', oiMcapRatio: 'w-16', volOiRatio: 'w-16', sma20Gap: 'w-16',
    floatRatio: 'w-16', coverTime: 'w-16', imbalance: 'w-16', topDepth: 'w-16', rangePosAll: 'w-16'
};

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
  const [columnWidths, setColumnWidths] = useState(DEFAULT_COLUMN_WIDTHS);
  
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

        const storedWidths = localStorage.getItem('columnWidths');
        if (storedWidths) setColumnWidths({...DEFAULT_COLUMN_WIDTHS, ...JSON.parse(storedWidths)});
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

  useEffect(() => {
      try { localStorage.setItem('columnWidths', JSON.stringify(columnWidths)); } catch {}
  }, [columnWidths]);

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
          const turnover = (volume && mcap) ? volume / mcap : 0;
          const volMcapRatio = (volume && mcap) ? volume / mcap : 0;
          const rangePos = calcRangePos(val.price, val.highPrice, val.lowPrice);
          const athDrop = calcAthDrop(val.price, cg.ath);
          
          const spread = (val.ask && val.bid) ? (val.ask - val.bid) / val.ask : 0;
          const vwapGap = (val.price && val.weightedAvgPrice) ? (val.price - val.weightedAvgPrice) / val.weightedAvgPrice : 0;
          const distHigh = (val.price && val.highPrice) ? (val.price - val.highPrice) / val.highPrice : 0;
          const distLow = (val.price && val.lowPrice) ? (val.price - val.lowPrice) / val.lowPrice : 0;
          const volStrength = (val.volume && val.volAvg) ? val.volume / val.volAvg : 0;
          
          const avgTrade = (val.volume && val.count) ? val.volume / val.count : 0;
          const basis = (val.markPrice && val.indexPrice && val.indexPrice > 0) ? (val.markPrice - val.indexPrice) / val.indexPrice : 0;
          const sma20Gap = (val.price && val.sma20) ? (val.price - val.sma20) / val.sma20 : 0;

          const bidQty = val.bidQty || 0;
          const askQty = val.askQty || 0;
          const imbalance = (bidQty + askQty) > 0 ? (bidQty - askQty) / (bidQty + askQty) : 0;
          const topDepth = (val.bid * bidQty) + (val.ask * askQty);
          const rangePosAll = calcRangePos(val.price, cg.ath, cg.atl);

          const oiData = openInterestCacheRef.current.get(key);
          const openInterest = oiData ? (oiData.oiCoin * val.price) : undefined;
          
          const oiMcapRatio = (openInterest && mcap) ? openInterest / mcap : 0;
          const volOiRatio = (volume && openInterest) ? volume / openInterest : 0;
          const floatRatio = (cg.circulating && cg.totalSupply) ? (cg.circulating / cg.totalSupply) * 100 : 0;
          const hourlyVol = volume / 24;
          const coverTime = (openInterest && hourlyVol) ? openInterest / hourlyVol : 0;

          combined.push({ 
              ...val, ...cg, hasSpot, norm, dominance, volMcapRatio, rangePos, openInterest, athDrop, 
              turnover, vwapGap, spread, distHL: { h: distHigh, l: distLow }, volStrength, avgTrade, basis,
              oiMcapRatio, volOiRatio, sma20Gap, floatRatio, coverTime, imbalance, topDepth, rangePosAll
          });
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
              const markMap = new Map();
              const indexMap = new Map();

              if (Array.isArray(premiums)) {
                  premiums.forEach((p:any) => {
                      fundMap.set(p.symbol, parseFloat(p.lastFundingRate));
                      nextFundMap.set(p.symbol, p.nextFundingTime);
                      markMap.set(p.symbol, parseFloat(p.markPrice));
                      indexMap.set(p.symbol, parseFloat(p.indexPrice));
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
                          weightedAvgPrice: parseFloat(item.weightedAvgPrice) || 0,
                          count: parseInt(item.count) || 0,
                          fundingRate: fundMap.get(item.symbol) || 0,
                          nextFundingTime: nextFundMap.get(item.symbol),
                          markPrice: markMap.get(item.symbol),
                          indexPrice: indexMap.get(item.symbol),
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
                          prev.weightedAvgPrice = parseFloat(d.w) || prev.weightedAvgPrice;
                          prev.count = parseInt(d.n) || prev.count;
                          if (d.b && d.a) {
                              prev.bid = parseFloat(d.b);
                              prev.ask = parseFloat(d.a);
                              prev.bidQty = parseFloat(d.B); 
                              prev.askQty = parseFloat(d.A); 
                          }
                      } else if (d.r !== undefined) {
                          prev.fundingRate = parseFloat(d.r);
                          prev.nextFundingTime = d.T;
                          prev.markPrice = parseFloat(d.p);
                          prev.indexPrice = parseFloat(d.i);
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
                  const vols = k.slice(k.length-8, k.length-1).map((x:any) => parseFloat(x[7])); 
                  if (sl.every((n:number) => !isNaN(n))) {
                      item.sparkline = sl;
                      item.rsi = calcRSI(sl, 14);
                      item.volatility = calcVolatility(k);
                      item.sma20 = calcSMA(sl, 20);
                      const avgVol = vols.reduce((a:number,b:number)=>a+b,0) / vols.length;
                      item.volAvg = avgVol;
                  }
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
          <div className="font-bold text-sm text-green-500">
            Binance Futures Pro
             <a href="https://x.com/0xkillcoin" target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-gray-400 hover:text-blue-400 font-normal">@oAdam</a>
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
                  columnWidths={columnWidths}
                  setColumnWidths={setColumnWidths}
              />
          ) : <div className="absolute inset-0 flex items-center justify-center">Loading...</div>}
      </div>

      {showExport && <ExportModal onClose={() => setShowExport(false)} data={filteredData} t={t} />}
      {showColSettings && (
          <ColumnConfigModal 
            onClose={() => setShowColSettings(false)} 
            currentOrder={columnOrder} 
            onSave={setColumnOrder} 
            currentWidths={columnWidths}
            onSaveWidths={setColumnWidths}
            t={t} 
          />
      )}
    </div>
  );
};

// --- CONFIG MODAL ---
const ColumnConfigModal = ({ onClose, currentOrder, onSave, currentWidths, onSaveWidths, t }: any) => {
    const [order, setOrder] = useState([...currentOrder]);
    const [widths, setWidths] = useState({...currentWidths});

    const move = (idx: number, dir: number) => {
        if ((dir === -1 && idx === 0) || (dir === 1 && idx === order.length - 1)) return;
        const newOrder = [...order];
        const temp = newOrder[idx];
        newOrder[idx] = newOrder[idx + dir];
        newOrder[idx + dir] = temp;
        setOrder(newOrder);
    };
    
    const changeWidth = (key: string) => {
        const idx = WIDTH_OPTIONS.indexOf(widths[key] || 'w-32');
        const next = WIDTH_OPTIONS[(idx + 1) % WIDTH_OPTIONS.length];
        setWidths({ ...widths, [key]: next });
    };

    const handleSave = () => {
        onSave(order);
        onSaveWidths(widths);
        onClose();
    };

    const reset = () => {
        setOrder([...DEFAULT_COLUMN_ORDER]);
        setWidths({...DEFAULT_COLUMN_WIDTHS});
    };

    const getLabel = (id: string) => EXPORT_COLUMNS.find(c => c.key === id)?.label || id;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className={`w-full max-w-sm flex flex-col ${t.modalBg} ${t.modalText} border ${t.modalBorder} rounded-lg shadow-xl max-h-[80vh]`}>
                <div className={`flex items-center justify-between p-4 border-b ${t.modalBorder}`}>
                    <h2 className="text-lg font-bold">Column Settings</h2>
                    <button onClick={onClose}><IconClose className="w-5 h-5" /></button>
                </div>
                <div className="flex-1 overflow-auto p-2">
                    <div className="text-xs opacity-50 mb-2 px-2">Order & Width (Click width to toggle)</div>
                    <div className="space-y-1">
                        <div className={`flex items-center justify-between p-2 border ${t.modalBorder} rounded bg-black/5`}>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono w-24 truncate font-bold">Symbol (Fixed)</span>
                                <button onClick={()=>changeWidth('symbol')} className={`text-[10px] px-1.5 py-0.5 rounded border ${t.modalBorder} opacity-70 hover:opacity-100 min-w-[3rem]`}>
                                    {widths['symbol'] || 'w-32'}
                                </button>
                            </div>
                        </div>
                        {order.map((col, idx) => (
                            <div key={col} className={`flex items-center justify-between p-2 border ${t.modalBorder} rounded bg-black/5`}>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono w-24 truncate">{getLabel(col)}</span>
                                    <button onClick={()=>changeWidth(col)} className={`text-[10px] px-1.5 py-0.5 rounded border ${t.modalBorder} opacity-70 hover:opacity-100 min-w-[3rem]`}>
                                        {widths[col] || 'w-32'}
                                    </button>
                                </div>
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
    const [excludeMissing, setExcludeMissing] = useState(false);
    const [copied, setCopied] = useState(false);

    const activePreset = useMemo(() => 
        FILTER_PRESETS.find(p => p.id === filterPreset)
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
            case 'imbalance_buy': d = d.filter(i => i.imbalance > 0.2).sort((a,b)=>b.imbalance-a.imbalance); break;
            case 'imbalance_sell': d = d.filter(i => i.imbalance < -0.2).sort((a,b)=>a.imbalance-b.imbalance); break;
            case 'rsi_oversold': d = d.filter(i => i.rsi !== undefined && i.rsi < 30); d.sort((a,b)=>a.rsi-b.rsi); break;
            case 'rsi_overbought': d = d.filter(i => i.rsi !== undefined && i.rsi > 70); d.sort((a,b)=>b.rsi-a.rsi); break;
            case 'high_volatility': d.sort((a,b)=>(b.volatility||0)-(a.volatility||0)); d=d.slice(0,20); break;
            case 'high_avg_trade': d.sort((a,b)=>(b.avgTrade||0)-(a.avgTrade||0)); d=d.slice(0,20); break;
            case 'high_leverage': d.sort((a,b)=>(b.oiMcapRatio||0)-(a.oiMcapRatio||0)); d=d.slice(0,20); break;
            case 'fund_pos_15': d.sort((a,b) => (b.fundingRate||-Infinity)-(a.fundingRate||-Infinity)); d=d.slice(0,15); break;
            case 'fund_neg_15': d.sort((a,b) => (a.fundingRate||Infinity)-(b.fundingRate||Infinity)); d=d.slice(0,15); break;
            case 'vol_20': d.sort((a,b) => (b.volume||0)-(a.volume||0)); d=d.slice(0,20); break;
            case 'chg7d_up_20': d.sort((a,b) => (b.changePercent7d||-Infinity)-(a.changePercent7d||-Infinity)); d=d.slice(0,20); break;
            case 'chg7d_down_20': d.sort((a,b) => (a.changePercent7d||Infinity)-(b.changePercent7d||Infinity)); d=d.slice(0,20); break;
            case 'chg30d_up_20': d.sort((a,b) => (b.changePercent30d||-Infinity)-(a.changePercent30d||-Infinity)); d=d.slice(0,20); break;
            case 'chg30d_down_20': d.sort((a,b) => (a.changePercent30d||Infinity)-(b.changePercent30d||Infinity)); d=d.slice(0,20); break;
            
            // New Filter Logic
            case 'mcap_top_25': d.sort((a,b)=>(b.mcap||0)-(a.mcap||0)); d=d.slice(0,25); break;
            case 'mcap_25_50': d.sort((a,b)=>(b.mcap||0)-(a.mcap||0)); d=d.slice(25,50); break;
            case 'mcap_50_75': d.sort((a,b)=>(b.mcap||0)-(a.mcap||0)); d=d.slice(50,75); break;
            case 'mcap_75_100': d.sort((a,b)=>(b.mcap||0)-(a.mcap||0)); d=d.slice(75,100); break;
            case 'vol_500m_50b': d = d.filter(i=>(i.volume||0)>=500000000 && (i.volume||0)<=50000000000); d.sort((a,b)=>(b.volume||0)-(a.volume||0)); break;
            case 'vol_100m_500m': d = d.filter(i=>(i.volume||0)>=100000000 && (i.volume||0)<=500000000); d.sort((a,b)=>(b.volume||0)-(a.volume||0)); break;
        }
        return d;
    };

    const getExportData = () => {
        let finalData = getFilteredData();
        const cols = EXPORT_COLUMNS.filter(c => selectedCols.has(c.key));
        
        // Exclude Missing Data Logic
        if (excludeMissing) {
            finalData = finalData.filter((item: any) => {
                return cols.every(c => {
                    const val = item[c.key];
                    return val !== undefined && val !== null && val !== '' && val !== '-';
                });
            });
        }

        const rows = finalData.map((item: any) => {
            return cols.map(c => {
                const val = item[c.key];
                return c.format ? c.format(val) : (val || '');
            });
        });
        return { cols, rows, count: finalData.length };
    };

    const getHeaderDescription = () => {
        return `${activePreset?.label || 'Custom'}\n${activePreset?.desc || ''}\n\n`;
    };

    const generateMarkdown = () => {
        if (selectedCols.size === 0) return 'Please select columns.';
        const { cols, rows } = getExportData();
        if (rows.length === 0) return 'No data.';
        const header = `| ${cols.map(c => c.label).join(' | ')} |`;
        const separator = `| ${cols.map(() => '---').join(' | ')} |`;
        const body = rows.map((r: any[]) => `| ${r.join(' | ')} |`).join('\n');
        return `${getHeaderDescription()}${header}\n${separator}\n${body}`;
    };

    const generateCSV = () => {
        if (selectedCols.size === 0) return 'No columns selected';
        const { cols, rows } = getExportData();
        if (rows.length === 0) return 'No data';
        const header = cols.map(c => `"${c.label}"`).join(',');
        const body = rows.map((r: any[]) => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
        return `"${activePreset?.label || ''} - ${activePreset?.desc || ''}"\n${header}\n${body}`;
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
        return `${getHeaderDescription()}${header}\n${separator}\n${body}`;
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
                        <div className="flex-1 overflow-y-auto max-h-[40vh]">
                            <h3 className={`text-xs font-bold mb-2 uppercase ${t.modalSectionTitle}`}>1. Filter Logic</h3>
                            <div className="flex flex-col gap-1.5">
                                {FILTER_PRESETS.map(p => (
                                    <button key={p.id} onClick={() => setFilterPreset(p.id)} className={`text-left px-3 py-2 rounded text-xs transition-colors border group ${filterPreset===p.id ? t.filterBtnActive : t.filterBtn}`}>
                                        <div className="font-bold">{p.label}</div>
                                        <div className="text-[9px] opacity-70 mt-0.5">{p.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden flex flex-col max-h-[40vh]">
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
                        <div className="flex flex-col gap-2 mb-2">
                            <div className="flex items-center justify-between">
                                <h3 className={`text-xs font-bold uppercase ${t.modalSectionTitle}`}>3. Preview & Format</h3>
                                <div className="flex gap-2">
                                    <button onClick={() => setFormat('markdown')} className={`px-3 py-1 text-xs border rounded ${format==='markdown' ? 'bg-blue-500 text-white border-blue-500' : t.button}`}>Markdown</button>
                                    <button onClick={() => setFormat('text')} className={`px-3 py-1 text-xs border rounded ${format==='text' ? 'bg-purple-500 text-white border-purple-500' : t.button}`}>Plain Text</button>
                                    <button onClick={() => setFormat('csv')} className={`px-3 py-1 text-xs border rounded ${format==='csv' ? 'bg-green-500 text-white border-green-500' : t.button}`}>CSV / Excel</button>
                                </div>
                            </div>
                            <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                                <input type="checkbox" checked={excludeMissing} onChange={(e) => setExcludeMissing(e.target.checked)} className="rounded border-gray-400" />
                                Exclude Incomplete Rows (Ignore if data missing)
                            </label>
                        </div>
                        <div className="flex-1 border rounded p-2 overflow-hidden bg-black/5">
                            <textarea readOnly value={format === 'markdown' ? generateMarkdown() : format === 'csv' ? generateCSV() : generatePlainText()} className={`w-full h-full text-[10px] font-mono bg-transparent outline-none resize-none whitespace-pre`}/>
                        </div>
                        <div className="mt-2 text-xs text-right opacity-50">Rows: {getExportData().rows.length} (Filtered) | Cols: {selectedCols.size}</div>
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
    if (!Array.isArray(data) || data.length < 5) return <div className="w-full h-8 flex items-center justify-center opacity-20">-</div>;
    if (data.some(n => isNaN(n))) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    if (range === 0) return <div className="w-full h-0.5 bg-gray-300 opacity-30"></div>;
    const W = 100; const H = 24;
    const points = data.map((p, i) => { const x = (i / (data.length - 1)) * W; const y = H - ((p - min) / range) * H; return `${x},${y}`; }).join(' ');
    const isUp = data[data.length - 1] >= data[0];
    const color = isUp ? '#10b981' : '#ef4444';
    return (<svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="overflow-visible"><polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /></svg>);
};

const RangeBar = ({ pos }: { pos: number }) => (
    <div className="w-full h-full flex items-center px-2">
        <div className={`w-full h-1.5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700`}>
            <div className="h-full rounded-full" style={{ width: `${isNaN(pos)?0:pos}%`, backgroundColor: pos > 80 ? '#ef4444' : pos < 20 ? '#10b981' : '#3b82f6' }} />
        </div>
    </div>
);

const PctCell = ({ v, box, isPixel, theme }: any) => (
    <div className={`w-full px-2 h-full flex items-center justify-end`}>
        <div className={`w-full text-center ${box?`rounded py-0.5 font-bold ${isPixel?'text-[8px]':'text-[9px]'}`:`text-right ${isPixel?'text-[8px]':'text-[9px]'} font-mono`}`}
             style={{ color: !box?(v>0?'#10b981':'#ef4444'):(isPixel||theme==='lightPixel'?'white':theme==='dark'?'#f3f4f6':'#1f2937'), backgroundColor: box?(v>0?'#10b981':'#ef4444'):'' }}>
            {v !== undefined && !isNaN(v) ? (v>0?'+':'')+v.toFixed(box?2:1)+'%' : '-'}
        </div>
    </div>
);

const VirtualTable = ({ data, theme, t, favorites, toggleFav, toggleSpot, spotFilter, onRequestDetails, onLoadStats, onVisibleSymbols, columnOrder, columnWidths, setColumnWidths }: any) => {
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

    const WIDTH_MAP: any = {
        'w-16': '4rem', 'w-20': '5rem', 'w-24': '6rem', 'w-32': '8rem', 
        'w-40': '10rem', 'w-48': '12rem', 'w-56': '14rem', 'w-64': '16rem', 
        'w-80': '20rem', 'w-96': '24rem'
    };

    const COLUMN_DEFS: any = {
        onboardDate: { label: 'Listed', subLabel: '[上线]', render: (item: any) => { const { label, color } = getListedCategory(item.onboardDate); return <div className="w-full text-center flex justify-center"><span className={`px-1 rounded border ${color}`}>{label}</span></div>; } },
        price: { label: 'Price', subLabel: '[价格]', render: (item: any) => <div className="w-full text-right px-1 font-mono">{formatPriceReal(item.price)}</div> },
        imbalance: { label: 'Imbal%', subLabel: '[失衡]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${item.imbalance>0.2?'text-green-500':item.imbalance<-0.2?'text-red-500':''}`}>{item.imbalance?(item.imbalance*100).toFixed(2)+'%':'-'}</div> },
        topDepth: { label: 'Depth($)', subLabel: '[深度]', render: (item: any) => <div className={`w-full text-right px-1 font-mono`}>{item.topDepth?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</div> },
        rangePosAll: { label: 'Pos(All)', subLabel: '[历史位置]', render: (item: any) => <RangeBar pos={item.rangePosAll} /> },
        floatRatio: { label: 'Float %', subLabel: '[流通率]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${item.floatRatio>90?'text-green-500':'opacity-60'}`}>{item.floatRatio?.toFixed(1)}%</div> },
        coverTime: { label: 'Cover (H)', subLabel: '[清算]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${item.coverTime>24?'text-red-500':''}`}>{item.coverTime?.toFixed(1)}h</div> },
        basis: { label: 'Basis', subLabel: '[基差]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${item.basis>0.001?'text-red-500':item.basis<-0.001?'text-green-500':''}`}>{item.basis?(item.basis*100).toFixed(2)+'%':'-'}</div> },
        avgTrade: { label: 'Avg Trade', subLabel: '[均笔]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${item.avgTrade>5000?'text-yellow-500 font-bold':''}`}>{item.avgTrade?formatCurrency(item.avgTrade):'-'}</div> },
        rangePos: { label: 'Pos', subLabel: '[位置]', render: (item: any) => <RangeBar pos={item.rangePos} /> },
        trend: { label: 'Trend(7d)', subLabel: '[趋势]', sortable: false, render: (item: any) => <div className="w-full h-full flex items-center justify-center px-1"><Sparkline data={item.sparkline} /></div> },
        rsi: { label: 'RSI(14D)', subLabel: '[强弱]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${item.rsi>70?'text-red-500':item.rsi<30?'text-green-500':'opacity-60'}`}>{item.rsi?.toFixed(1)||'-'}</div> },
        volatility: { label: 'Vol(7D)', subLabel: '[波动]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${item.volatility>5?'text-orange-500':''}`}>{item.volatility?.toFixed(2)}%</div> },
        trades: { label: 'Trades', subLabel: '[笔数]', render: (item: any) => <div className="w-full text-right px-1 font-mono">{item.count?.toLocaleString()}</div> },
        spread: { label: 'Spread', subLabel: '[点差]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${item.spread>0.001?'text-red-500':'text-green-500'}`}>{(item.spread*100)?.toFixed(3)}%</div> },
        volStrength: { label: 'Vol Str', subLabel: '[量能]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${item.volStrength>2?'text-yellow-500 font-bold':''}`}>{item.volStrength?.toFixed(2)}x</div> },
        distHL: { label: 'Dist H/L', subLabel: '[高低]', sortable: false, render: (item: any) => <div className="w-full text-right px-1 font-mono text-[9px]"><span className="text-red-500">{(item.distHL?.h*100).toFixed(1)}%</span> / <span className="text-green-500">{(item.distHL?.l*100).toFixed(1)}%</span></div> },
        vwapGap: { label: 'VWAP Gap', subLabel: '[偏离]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${item.vwapGap>0.02?'text-red-500':item.vwapGap<-0.02?'text-green-500':''}`}>{(item.vwapGap*100)?.toFixed(2)}%</div> },
        turnover: { label: 'Turnover', subLabel: '[换手]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${item.turnover>0.5?'text-yellow-500 font-bold':''}`}>{(item.turnover*100)?.toFixed(1)}%</div> },
        fundingRate: { label: 'Fund/Time', subLabel: '[费率]', render: (item: any) => <div className={`w-full text-right px-1 font-mono flex flex-col justify-center`}><span className={item.fundingRate>0?'text-green-500':item.fundingRate<0?'text-red-500':''}>{item.fundingRate?(item.fundingRate*100).toFixed(4)+'%':'-'}</span><span className="text-[8px] opacity-50">{getCountdown(item.nextFundingTime)}</span></div> },
        openInterest: { label: 'OI(USD)', subLabel: '[持仓]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${t.textSub}`}>{item.openInterest ? formatCurrency(item.openInterest) : <span className="opacity-30">...</span>}</div> },
        volume: { label: 'Vol', subLabel: '[成交]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${t.textSub}`}>{formatCurrency(item.volume)}</div> },
        changePercent1h: { label: '1h', subLabel: '[1时]', render: (item: any) => <PctCell v={item.changePercent1h} isPixel={isPixel} theme={theme} /> },
        changePercent4h: { label: '4h', subLabel: '[4时]', render: (item: any) => <PctCell v={item.changePercent4h} isPixel={isPixel} theme={theme} /> },
        changePercent24h: { label: '24h', subLabel: '[24时]', render: (item: any) => <PctCell v={item.changePercent24h} box isPixel={isPixel} theme={theme} /> },
        changePercent7d: { label: '7d', subLabel: '[7天]', render: (item: any) => <PctCell v={item.changePercent7d} isPixel={isPixel} theme={theme} /> },
        changePercent30d: { label: '30d', subLabel: '[30天]', render: (item: any) => <PctCell v={item.changePercent30d} isPixel={isPixel} theme={theme} /> },
        hasSpot: { label: 'Spot', subLabel: '[现货]', render: (item: any) => <div className="w-full text-center">{item.hasSpot?<span className="text-green-500">✓</span>:<span className="text-gray-300">·</span>}</div> },
        mcap: { label: 'Mcap', subLabel: '[市值]', render: (item: any) => <div className="w-full text-right px-1 font-mono">{formatCurrency(item.mcap)}</div> },
        fdv: { label: 'FDV', subLabel: '[全稀释]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${t.textSub}`}>{formatCurrency(item.fdv)}</div> },
        dominance: { label: 'Dom%', subLabel: '[占比]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${t.textSub}`}>{item.dominance?.toFixed(2)}%</div> },
        volMcapRatio: { label: 'V/Mc', subLabel: '[量值比]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${t.textSub}`}>{item.volMcapRatio?.toFixed(2)}</div> },
        circulating: { label: 'Circ', subLabel: '[流通]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${t.textSub}`}>{formatCurrency(item.circulating)}</div> },
        totalSupply: { label: 'Tot', subLabel: '[总量]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${t.textSub}`}>{formatCurrency(item.totalSupply)}</div> },
        ath: { label: 'ATH', subLabel: '[最高]', render: (item: any) => <div className="w-full text-right px-1 font-mono flex flex-col justify-center"><span>{formatPriceReal(item.ath)}</span>{item.athDrop !== null && !isNaN(item.athDrop) && (<span className={`text-[8px] ${item.athDrop < -80 ? 'text-red-500 font-bold' : 'opacity-50'}`}>{item.athDrop.toFixed(0)}%</span>)}</div> },
        atl: { label: 'ATL', subLabel: '[最低]', render: (item: any) => <div className="w-full text-right px-1 font-mono flex flex-col justify-center"><span>{formatPriceReal(item.atl)}</span><span className="text-[8px] opacity-50">{formatDate(item.atlDate)}</span></div> },
        sector: { label: 'Sector', subLabel: '[板块]', render: (item: any) => <div className="w-full text-right px-1 truncate">{item.sector||'-'}</div> },
        website: { label: 'Web', subLabel: '[官网]', sortable: false, render: (item: any) => <div className="w-full text-center flex justify-center">{item.website?<a href={item.website} target="_blank"><IconGlobe className="w-3 h-3"/></a>:'-'}</div> },
        description: { label: 'Desc', subLabel: '[描述]', sortable: false, render: (item: any) => <div className="w-full text-left truncate opacity-70">{item.description||'-'}</div> },
        oiMcapRatio: { label: 'OI/Mcap', subLabel: '[杠杆率]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${item.oiMcapRatio>0.5?'text-red-500':''}`}>{item.oiMcapRatio?.toFixed(3)}</div> },
        volOiRatio: { label: 'Vol/OI', subLabel: '[换手/持仓]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${item.volOiRatio>5?'text-yellow-500':''}`}>{item.volOiRatio?.toFixed(2)}</div> },
        sma20Gap: { label: 'SMA Gap', subLabel: '[均线偏离]', render: (item: any) => <div className={`w-full text-right px-1 font-mono ${item.sma20Gap>0.1?'text-red-500':item.sma20Gap<-0.1?'text-green-500':''}`}>{item.sma20Gap?(item.sma20Gap*100).toFixed(2)+'%':'-'}</div> },
    };

    return (
        <div className={`w-full h-full overflow-auto scroll-container flex flex-col ${t.containerClass}`} ref={containerRef} onScroll={e => setScrollTop((e.target as HTMLDivElement).scrollTop)}>
            <div className="min-w-[2000px] relative flex flex-col">
                <div className={`flex items-center border-b ${t.border} ${t.headerBg} text-[10px] font-bold uppercase ${t.textSub} h-[40px] shrink-0 sticky-header z-30`}>
                    <div 
                        className={`px-2 text-center border-r ${t.border} h-full flex flex-col items-center justify-center shrink-0 sticky-header-col ${t.stickyBg} z-40`} 
                        style={{ width: WIDTH_MAP[columnWidths['symbol']] || '8rem', minWidth: WIDTH_MAP[columnWidths['symbol']] || '8rem', maxWidth: WIDTH_MAP[columnWidths['symbol']] || '8rem' }}
                        onClick={()=>handleSort('symbol')}
                    >
                        <span>Symbol</span>
                        <span className="text-[8px] opacity-50 scale-90">[代币]</span>
                    </div>
                    {columnOrder.map((colId: string) => {
                        const def = COLUMN_DEFS[colId];
                        const widthClass = columnWidths[colId] || 'w-16'; // Fallback to w-16
                        const widthStyle = WIDTH_MAP[widthClass] || '4rem';
                        
                        if (!def) return null;
                        return (
                            <div 
                                key={colId} 
                                className={`px-2 shrink-0 h-full flex flex-col items-center justify-center cursor-pointer border-r ${t.border} last:border-r-0 hover:bg-black/5 transition-colors`}
                                style={{ width: widthStyle, minWidth: widthStyle, maxWidth: widthStyle }}
                                onClick={() => (def.sortable!==false) && handleSort(colId)}
                            >
                                <span>{def.label}</span>
                                {def.subLabel && <span className="text-[8px] opacity-50 scale-90 mt-0.5">{def.subLabel}</span>}
                                {def.label==='Spot' && <span onClick={(e)=>{e.stopPropagation();toggleSpot()}} className="mt-1">{spotFilter==='YES'?'✓':spotFilter==='NO'?'✕':''}</span>}
                            </div>
                        );
                    })}
                </div>

                <div className="relative w-full" style={{ height: sortedData.length * H }}>
                    {visibleItems.map((item: any) => {
                        const top = item.virtualRowIndex * H;
                        // Determine row background color for sticky column
                        const rowBg = theme === 'light' ? 'bg-white' : theme === 'dark' ? 'bg-gray-800' : theme === 'pixel' ? 'bg-slate-900' : 'bg-white';

                        return (
                            <div key={item.symbol} className={`absolute left-0 w-full flex items-center border-b ${t.rowBorder} ${t.rowHover} text-[10px] ${t.textMain}`} style={{ height: H, top }}>
                                {/* Fixed First Column */}
                                <div 
                                    className={`px-2 sticky-col border-r ${t.rowBorder} z-20 h-full flex items-center justify-center flex-none ${rowBg}`} 
                                    style={{ width: WIDTH_MAP[columnWidths['symbol']] || '8rem', minWidth: WIDTH_MAP[columnWidths['symbol']] || '8rem', maxWidth: WIDTH_MAP[columnWidths['symbol']] || '8rem' }}
                                >
                                    <span onClick={()=>toggleFav(item.symbol)} className={`mr-2 cursor-pointer ${favorites.has(item.symbol)?'text-yellow-400':'text-gray-300'}`}>★</span>
                                    <div className="flex flex-col items-center w-full overflow-hidden">
                                        <span className="font-bold truncate w-full text-center">{item.symbol}</span>
                                        <div className="flex gap-1 mt-0.5 opacity-60">
                                            <a href={`https://www.binance.com/en/futures/${item.symbol}`} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500"><IconBinance className="w-2.5 h-2.5"/></a>
                                            <a href={`https://www.tradingview.com/chart/?symbol=BINANCE:${item.symbol}.P`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500"><IconTradingView className="w-2.5 h-2.5"/></a>
                                            <a href={`https://twitter.com/search?q=%24${item.norm}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-500"><IconX className="w-2.5 h-2.5"/></a>
                                        </div>
                                    </div>
                                </div>
                                {/* Dynamic Columns */}
                                {columnOrder.map((colId: string) => {
                                    const def = COLUMN_DEFS[colId];
                                    const widthClass = columnWidths[colId] || 'w-16';
                                    const widthStyle = WIDTH_MAP[widthClass] || '4rem';

                                    return def ? (
                                        <div key={colId} className={`px-2 shrink-0 h-full flex items-center border-r ${t.rowBorder} last:border-r-0`} style={{ width: widthStyle, minWidth: widthStyle, maxWidth: widthStyle }}>
                                            {def.render(item)}
                                        </div>
                                    ) : null;
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

