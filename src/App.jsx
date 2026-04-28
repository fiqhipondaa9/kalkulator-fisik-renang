import React, { useState, useMemo } from 'react';
import * as htmlToImage from 'html-to-image';

// --- KOMPONEN IKON SVG (Custom Aquatics) ---
const IconUser = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconScale = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>;
const IconDownload = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
const IconReset = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
const IconWaves = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>;
const IconAlert = () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;

// --- FUNGSI SCORING LOGIC RENANG ---
const getScoreRenang = (test, gender, value) => {
  if (value === '' || value === null || isNaN(value)) return 0;
  const v = parseFloat(value); const isM = gender === 'Putra';
  switch(test) {
    case 'reaction': // Inverse Logic (Lower is Faster)
      return isM ? (v <= 0.63 ? 100 : v <= 0.66 ? 80 : v <= 0.69 ? 70 : v <= 0.72 ? 60 : 40) 
                 : (v <= 0.67 ? 100 : v <= 0.70 ? 80 : v <= 0.74 ? 70 : v <= 0.77 ? 60 : 40);
    case 'sitReach': 
      return isM ? (v >= 30.6 ? 100 : v >= 24.5 ? 80 : v >= 21.43 ? 70 : v >= 18.37 ? 60 : 40) 
                 : (v >= 32.1 ? 100 : v >= 25.7 ? 80 : v >= 22.48 ? 70 : v >= 19.27 ? 60 : 40);
    case 'shoulderL': 
      return isM ? (v >= 9.0 ? 100 : v >= 7.2 ? 80 : v >= 6.3 ? 70 : v >= 5.4 ? 60 : 40) 
                 : (v >= 12.0 ? 100 : v >= 9.6 ? 80 : v >= 8.4 ? 70 : v >= 7.2 ? 60 : 40);
    case 'shoulderR': 
      return isM ? (v >= 12.0 ? 100 : v >= 9.6 ? 80 : v >= 8.4 ? 70 : v >= 7.2 ? 60 : 40) 
                 : (v >= 14.0 ? 100 : v >= 11.2 ? 80 : v >= 9.8 ? 70 : v >= 8.4 ? 60 : 40);
    case 'pullUp': 
      return isM ? (v >= 33 ? 100 : v >= 26 ? 80 : v >= 23 ? 70 : v >= 20 ? 60 : 40) 
                 : (v >= 21 ? 100 : v >= 17 ? 80 : v >= 15 ? 70 : v >= 13 ? 60 : 40);
    case 'core': 
      return v >= 12 ? 100 : v >= 10 ? 80 : v >= 8 ? 70 : v >= 7 ? 60 : 40;
    case 'broadJump': 
      return isM ? (v >= 2.63 ? 100 : v >= 2.10 ? 80 : v >= 1.84 ? 70 : v >= 1.58 ? 60 : 40) 
                 : (v >= 2.39 ? 100 : v >= 1.91 ? 80 : v >= 1.67 ? 70 : v >= 1.43 ? 60 : 40);
    case 'swimVO2': 
      return isM ? (v >= 55.9 ? 100 : v >= 44.7 ? 80 : v >= 41.9 ? 70 : v >= 39.1 ? 60 : 40) 
                 : (v >= 41.9 ? 100 : v >= 33.5 ? 80 : v >= 31.4 ? 70 : v >= 29.3 ? 60 : 40);
    default: return 0;
  }
};

// --- FUNGSI TARGET PLACEHOLDER ---
const getTargetPlaceholder = (test, gender) => {
  const isM = gender === 'Putra';
  switch(test) {
    case 'reaction': return isM ? '≤ 0.63' : '≤ 0.67';
    case 'sitReach': return isM ? '≥ 30.6' : '≥ 32.1';
    case 'shoulderL': return isM ? '≥ 9.0' : '≥ 12.0';
    case 'shoulderR': return isM ? '≥ 12.0' : '≥ 14.0';
    case 'pullUp': return isM ? '≥ 33' : '≥ 21';
    case 'core': return '≥ 12';
    case 'broadJump': return isM ? '≥ 2.63' : '≥ 2.39';
    case 'swimVO2': return isM ? '≥ 55.9' : '≥ 41.9';
    default: return '';
  }
};

// --- KOMPONEN RADAR CHART ---
const RadarChart = ({ data, labels, isBlanko }) => {
  const size = 320; const center = size / 2; const radius = 100;
  const angleStep = (Math.PI * 2) / labels.length;

  const getCoordinates = (val, i) => {
    const r = (val / 100) * radius;
    const a = i * angleStep - Math.PI / 2;
    return { x: center + r * Math.cos(a), y: center + r * Math.sin(a) };
  };

  const dataPoints = data.map((val, i) => getCoordinates(val, i));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {[20, 40, 60, 80, 100].map(level => {
        const pts = labels.map((_, i) => getCoordinates(level, i));
        const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
        return <path key={level} d={path} fill="none" stroke={level === 100 ? '#06b6d4' : '#e2e8f0'} strokeWidth={level === 100 ? 2 : 1} strokeDasharray={level < 100 ? "4 4" : "none"} />
      })}
      
      {labels.map((label, i) => {
        const pOuter = getCoordinates(125, i);
        const pEdge = getCoordinates(100, i);
        return (
          <g key={i}>
            <line x1={center} y1={center} x2={pEdge.x} y2={pEdge.y} stroke="#e2e8f0" strokeWidth="1" />
            <text x={pOuter.x} y={pOuter.y} textAnchor="middle" dominantBaseline="middle" className="text-[10px] font-black fill-slate-500 uppercase">{label}</text>
          </g>
        );
      })}

      {!isBlanko && (
        <>
          <path d={dataPath} fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="3" strokeLinejoin="round" />
          {dataPoints.map((p, i) => ( <circle key={i} cx={p.x} cy={p.y} r="4" fill="#0891b2" /> ))}
        </>
      )}
    </svg>
  );
};

export default function App() {
  const [identity, setIdentity] = useState({ name: '', origin: '', dob: '', gender: 'Putra' });
  const [anthro, setAnthro] = useState({ weight: '', height: '', armSpan: '', sitHeight: '' });
  const [tests, setTests] = useState({
    reaction: '', sitReach: '', shoulderL: '', shoulderR: '', pullUp: '', core: '', broadJump: '', swimVO2: ''
  });
  const [isExporting, setIsExporting] = useState(false);

  const age = useMemo(() => {
    if (!identity.dob) return '-';
    const birthDate = new Date(identity.dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) calculatedAge--;
    return calculatedAge;
  }, [identity.dob]);

  const bmiData = useMemo(() => {
    if (!anthro.weight || !anthro.height || anthro.height <= 0) return { bmi: '-', status: '-', color: 'text-slate-400' };
    const hM = anthro.height / 100;
    const bmiValue = (anthro.weight / (hM * hM));
    const bmi = bmiValue.toFixed(1);
    let status = 'Kurus'; let color = 'text-sky-500';
    if (bmi >= 18.5 && bmi <= 24.9) { status = 'Ideal'; color = 'text-cyan-500'; }
    else if (bmi >= 25 && bmi <= 29.9) { status = 'Gemuk'; color = 'text-blue-500'; }
    else if (bmi >= 30) { status = 'Obesitas'; color = 'text-indigo-600'; }
    return { bmi, status, color };
  }, [anthro.weight, anthro.height]);

  // --- MESIN PENGHITUNG APE INDEX & RASIO TUNGKAI ---
  const proportionData = useMemo(() => {
    const h = parseFloat(anthro.height);
    const arm = parseFloat(anthro.armSpan);
    const sit = parseFloat(anthro.sitHeight);

    let apeIndex = { value: 0, text: '-', color: 'text-slate-400', desc: 'Isi Tinggi & Lengan' };
    let legRatio = { value: 0, text: '-', color: 'text-slate-400', desc: 'Isi Tinggi Duduk' };

    if (h > 0 && arm > 0) {
      const ratio = arm / h;
      if (ratio > 1.02) apeIndex = { value: ratio.toFixed(2), text: 'Superior', color: 'text-cyan-500', desc: 'Keuntungan Tarikan Air (Pull)' };
      else if (ratio >= 1.0) apeIndex = { value: ratio.toFixed(2), text: 'Ideal', color: 'text-sky-500', desc: 'Proporsi Hidrodinamis Normal' };
      else apeIndex = { value: ratio.toFixed(2), text: 'Standar', color: 'text-slate-500', desc: 'Jangkauan Stroke Pendek' };
    }

    if (h > 0 && sit > 0 && sit < h) {
      const legLength = h - sit;
      const legPercentage = (legLength / h) * 100;
      if (legPercentage >= 50) legRatio = { value: legPercentage.toFixed(1) + '%', text: 'Tungkai Panjang', color: 'text-cyan-500', desc: 'Tolakan Dinding (Flip Turn) Kuat' };
      else if (legPercentage >= 47) legRatio = { value: legPercentage.toFixed(1) + '%', text: 'Tungkai Ideal', color: 'text-sky-500', desc: 'Proporsi Tendangan Seimbang' };
      else legRatio = { value: legPercentage.toFixed(1) + '%', text: 'Tungkai Pendek', color: 'text-slate-500', desc: 'Fokus Frekuensi Tendangan' };
    }

    return { apeIndex, legRatio };
  }, [anthro.height, anthro.armSpan, anthro.sitHeight]);

  // Deteksi Simetri Khusus Renang (Shoulder Mobility)
  const symmetryData = useMemo(() => {
    const r = parseFloat(tests.shoulderR);
    const l = parseFloat(tests.shoulderL);
    if (!r || !l || r === 0 || l === 0) return { diff: 0, isDanger: false };
    const min = Math.min(r, l);
    const max = Math.max(r, l);
    const diff = 100 - ((min / max) * 100);
    return { diff: diff.toFixed(1), isDanger: diff > 15, weakSide: r < l ? 'Kanan' : 'Kiri' };
  }, [tests.shoulderR, tests.shoulderL]);

  const scores = useMemo(() => ({
    reaction: getScoreRenang('reaction', identity.gender, tests.reaction),
    sitReach: getScoreRenang('sitReach', identity.gender, tests.sitReach),
    shoulderL: getScoreRenang('shoulderL', identity.gender, tests.shoulderL),
    shoulderR: getScoreRenang('shoulderR', identity.gender, tests.shoulderR),
    pullUp: getScoreRenang('pullUp', identity.gender, tests.pullUp),
    core: getScoreRenang('core', identity.gender, tests.core),
    broadJump: getScoreRenang('broadJump', identity.gender, tests.broadJump),
    swimVO2: getScoreRenang('swimVO2', identity.gender, tests.swimVO2),
  }), [tests, identity.gender]);

  const activeLabels = ['Start Rx', 'Flexibility', 'Shoulder (L)', 'Shoulder (R)', 'Pull Up', 'Core', 'Broad Jump', 'Swim VO2'];
  
  const averageScore = useMemo(() => {
    const vals = Object.values(scores);
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }, [scores]);

  const isBlanko = !identity.name && averageScore === 0;

  const handleReset = () => { if (window.confirm("Hapus semua data isian?")) window.location.reload(); };

  const handleDownloadImage = async () => {
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    try {
      const element = document.getElementById('report-container');
      const dataUrl = await htmlToImage.toPng(element, { quality: 1.0, backgroundColor: "#f8fafc", pixelRatio: 2 });
      const safeName = identity?.name ? identity.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'atlet';
      const link = document.createElement("a");
      link.download = `Rapor_Aquatics_${safeName}.png`;
      link.href = dataUrl; link.click();
    } catch (error) { console.error(error); alert("Gagal membuat gambar."); } finally { setIsExporting(false); }
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-cyan-500 transition-all";
  const testInputClass = "w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 font-black text-slate-900 focus:outline-none focus:border-cyan-500 transition-all pr-24 placeholder:text-[11px] placeholder:font-bold placeholder:text-slate-400/70 text-right";

  return (
    <div id="report-container" className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4 font-sans print:bg-white print:py-0 print:px-0">
      
      {isExporting && (
        <style dangerouslySetInnerHTML={{__html: `
          #report-container input, #report-container select { appearance: none !important; -webkit-appearance: none; padding-bottom: 8px !important; }
          #report-container input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none !important; margin: 0 !important; }
          #report-container input:focus, #report-container select:focus { box-shadow: none !important; border-color: #e2e8f0 !important; }
        `}} />
      )}

      {/* HEADER: AQUATIC DYNAMICS THEME */}
      <header className="bg-slate-900 text-white p-8 shadow-2xl relative overflow-hidden w-full max-w-7xl rounded-[2.5rem] border-b-8 border-cyan-500">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
           <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-cyan-400/30 blur-[100px] rounded-full"></div>
           <div className="absolute bottom-[-50%] left-[-10%] w-[60%] h-[150%] bg-blue-600/30 blur-[100px] rounded-full"></div>
        </div>
        
        <div className="mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="inline-block bg-cyan-500 text-slate-900 font-black text-[10px] px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4 shadow-lg border border-cyan-400">
              PERMENPORA 15 / 2024 • ELITE STANDARD
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight italic">
              AQUATIC <span className="text-cyan-400">PERFORMANCE</span>
            </h1>
          </div>
          <div className="text-left md:text-right w-full md:w-auto">
            {!isExporting && (
              <div className="no-print flex flex-wrap items-center justify-start md:justify-end gap-3 mb-4">
                <button onClick={handleReset} className="bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 text-xs font-bold tracking-wider backdrop-blur-sm border border-white/10">
                  <IconReset /> <span>Reset</span>
                </button>
                <button onClick={handleDownloadImage} disabled={isExporting} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-6 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 text-xs font-black tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50">
                  <IconDownload /> {isExporting ? 'Processing...' : 'Export PNG'}
                </button>
              </div>
            )}
            <div className="mt-2">
                <p className="font-black text-cyan-500/80 text-[11px] tracking-[0.3em] uppercase">
                  System Developed <span className="text-white">by fiqhipondaa9</span>
                </p>
            </div>
          </div>
        </div>
      </header>

      <main className={`${isExporting ? 'w-[1200px]' : 'max-w-7xl w-full'} mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8`}>
        
        {/* LEFT COLUMN: DATA INPUT */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-5 relative z-10">
              <div className="bg-cyan-500 text-white p-3 rounded-2xl shadow-lg shadow-cyan-200"><IconUser /></div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Biographical Profile</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
              <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label><input type="text" value={identity.name} onChange={e => setIdentity({...identity, name: e.target.value})} className={inputClass} placeholder={isExporting ? "" : "Nama atlet..."} /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Provinsi / Klub</label><input type="text" value={identity.origin} onChange={e => setIdentity({...identity, origin: e.target.value})} className={inputClass} placeholder={isExporting ? "" : "Asal instansi..."} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tgl Lahir</label><input type="date" value={identity.dob} onChange={e => setIdentity({...identity, dob: e.target.value})} className={`${inputClass} text-sm`} /></div>
                <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age Index</label><div className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 font-black text-slate-900 text-center">{age !== '-' ? `${age} Thn` : '\u00A0'}</div></div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kategori Gender</label>
                <select value={identity.gender} onChange={e => setIdentity({...identity, gender: e.target.value})} className={`${inputClass} cursor-pointer`}>
                  <option value="Putra">Putra (Male)</option><option value="Putri">Putri (Female)</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              {[{label: 'Tinggi (cm)', id: 'height'}, {label: 'Berat (kg)', id: 'weight'}, {label: 'Rentang Lengan', id: 'armSpan'}, {label: 'Tinggi Duduk', id: 'sitHeight'}].map(item => (
                 <div key={item.id} className="space-y-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</label>
                   <input type="number" value={anthro[item.id]} onChange={e => setAnthro({...anthro, [item.id]: e.target.value})} className="w-full bg-white border border-slate-200 rounded-2xl py-3 px-3 font-black text-center focus:border-cyan-500 outline-none" placeholder={isExporting ? "" : "0"} />
                 </div>
              ))}
            </div>
            
            <div className="mt-4 flex items-center justify-between bg-slate-900 text-white rounded-[2rem] p-6 shadow-xl border-l-8 border-cyan-500 relative z-10">
               <div className="flex items-center gap-4"><IconScale /> <span className="font-black text-xs tracking-[0.2em] uppercase text-slate-400">Body Mass Index</span></div>
               <div className="flex items-center gap-5">
                 <span className="text-4xl font-black italic">{bmiData.bmi}</span>
                 {bmiData.status !== '-' && <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-800 shadow-inner ${bmiData.color}`}>{bmiData.status}</span>}
               </div>
            </div>

            {/* KOTAK RASIO TUNGKAI & LENGAN (AQUATICS) */}
            {(anthro.height > 0 && (anthro.armSpan > 0 || anthro.sitHeight > 0)) && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 animate-in fade-in">
                <div className="bg-white border border-slate-200 rounded-[2rem] p-5 shadow-sm flex flex-col justify-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500"></div>
                   <div className="flex justify-between items-start mb-2 pl-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ape Index</span>
                      <span className={`text-[9px] bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg font-black uppercase tracking-widest ${proportionData.apeIndex.color}`}>{proportionData.apeIndex.text}</span>
                   </div>
                   <div className="flex items-end gap-2 pl-2 mt-1">
                      <span className="text-3xl font-black text-slate-900 leading-none italic">{proportionData.apeIndex.value}</span>
                   </div>
                   <p className="text-[10px] font-bold text-slate-400 mt-2 pl-2 uppercase tracking-widest">{proportionData.apeIndex.desc}</p>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-[2rem] p-5 shadow-sm flex flex-col justify-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
                   <div className="flex justify-between items-start mb-2 pl-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Rasio Tungkai</span>
                      <span className={`text-[9px] bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg font-black uppercase tracking-widest ${proportionData.legRatio.color}`}>{proportionData.legRatio.text}</span>
                   </div>
                   <div className="flex items-end gap-2 pl-2 mt-1">
                      <span className="text-3xl font-black text-slate-900 leading-none italic">{proportionData.legRatio.value}</span>
                   </div>
                   <p className="text-[10px] font-bold text-slate-400 mt-2 pl-2 uppercase tracking-widest">{proportionData.legRatio.desc}</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-5">
              <div className="bg-cyan-100 text-cyan-600 p-3 rounded-2xl"><IconWaves /></div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Aquatic Kinetics</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
               {[
                 { id: 'reaction', label: 'Start Reaction Time', unit: 'DETIK' },
                 { id: 'sitReach', label: 'Sit & Reach Flexibility', unit: 'CM' },
                 { id: 'shoulderL', label: 'Shoulder Mobility (Kiri)', unit: 'CM' },
                 { id: 'shoulderR', label: 'Shoulder Mobility (Kanan)', unit: 'CM' },
                 { id: 'pullUp', label: 'Pull Up (1 Menit)', unit: 'REPS' },
                 { id: 'core', label: 'Core Stability', unit: 'LEVEL' },
                 { id: 'broadJump', label: 'Standing Broad Jump', unit: 'METER' },
                 { id: 'swimVO2', label: 'Aerobic Swim VO2 Max (15m)', unit: 'ML/KG/MIN' },
               ].map(item => (
                 <div key={item.id} className={`${item.id === 'swimVO2' ? 'sm:col-span-2 bg-cyan-50/50 p-6 rounded-[2rem] border border-cyan-100 mt-2 shadow-inner' : 'flex flex-col'}`}>
                   {item.id === 'swimVO2' ? (
                      <>
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                           <label className="text-sm font-black text-slate-800 uppercase tracking-wide">{item.label}</label>
                           <span className="bg-cyan-500 text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">
                             Target Emas: {getTargetPlaceholder(item.id, identity.gender)} {item.unit}
                           </span>
                        </div>
                        <div className="relative">
                           <input type="number" step="0.1" value={tests[item.id]} onChange={e => setTests({...tests, [item.id]: e.target.value})} className={`${testInputClass} bg-white border-cyan-200 py-4 text-xl`} placeholder="Hasil Uji Ekstensif..." />
                           <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-black text-cyan-600 uppercase tracking-widest">{item.unit}</span>
                        </div>
                      </>
                   ) : (
                      <>
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">{item.label}</label>
                        <div className="relative">
                          <input type="number" step="0.01" value={tests[item.id]} onChange={e => setTests({...tests, [item.id]: e.target.value})} className={testInputClass} placeholder={getTargetPlaceholder(item.id, identity.gender)} />
                          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.unit}</span>
                        </div>
                      </>
                   )}
                 </div>
               ))}

               {/* PERINGATAN ASIMETRIS BAHU (SWIM STROKE) */}
               {symmetryData.isDanger && (
                   <div className="sm:col-span-2 mt-2 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-5 flex gap-4 animate-pulse shadow-sm">
                     <div className="text-rose-500 mt-0.5"><IconAlert /></div>
                     <div>
                       <h4 className="font-black text-sm uppercase tracking-wide">Peringatan Asimetri Mobilitas Bahu</h4>
                       <p className="text-xs font-medium mt-1 leading-relaxed">Perbedaan fleksibilitas Bahu Kanan dan Kiri melebihi 15% (Selisih: <b>{symmetryData.diff}%</b>). Kelenturan sisi <b>{symmetryData.weakSide}</b> tertinggal, berisiko menyebabkan <i>Stroke Imbalance</i> dan meningkatkan hambatan <i>drag efficiency</i> di dalam air.</p>
                     </div>
                   </div>
               )}
            </div>
            <p className="mt-8 p-4 bg-cyan-50 border border-cyan-100 rounded-2xl text-[10px] font-bold text-cyan-800 text-center uppercase tracking-widest leading-relaxed">
              *Start Reaction Time dihitung menggunakan Inverse Scoring (Semakin kecil waktu = Semakin tinggi nilai).
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: ANALYTICS */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          <div className={`rounded-[3rem] p-10 shadow-2xl text-center relative overflow-hidden transition-all duration-700 border-b-[12px] ${averageScore > 80 ? 'bg-slate-900 text-white border-cyan-500' : averageScore < 60 && averageScore > 0 ? 'bg-rose-700 text-white border-rose-900' : 'bg-white border-slate-200'}`}>
            <h3 className={`text-[11px] font-black uppercase tracking-[0.3em] mb-3 ${averageScore > 80 || (averageScore < 60 && averageScore > 0) ? 'text-cyan-400/60' : 'text-slate-400'}`}>Aquatic Performance Score</h3>
            <div className="text-[100px] font-black tracking-tighter mb-4 italic leading-none drop-shadow-lg">{isBlanko ? '-' : averageScore || 0}</div>
            
            <div className={`inline-flex items-center justify-center gap-3 px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-inner border ${averageScore > 80 ? 'bg-cyan-900/50 text-cyan-400 border-cyan-500/30' : averageScore < 60 && averageScore > 0 ? 'bg-rose-900/50 text-rose-100 border-rose-500/30' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
               {averageScore > 80 ? 'WORLD CLASS ELITE' : averageScore < 60 && averageScore > 0 ? 'NEEDS INTENSIVE DRILL' : averageScore > 0 ? 'QUALIFIED ATHLETE' : isBlanko ? 'BLANKO RECORDING' : 'WAITING FOR DATA'}
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-200 flex-1 flex flex-col items-center">
             <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.3em] text-center mb-8 italic">Hydrodynamic Radar Analysis</h3>
             <div className="flex-1 w-full flex items-center justify-center min-h-[300px] bg-slate-50 rounded-[2.5rem] p-6 border border-slate-100">
               <RadarChart data={Object.values(scores)} labels={activeLabels} isBlanko={isBlanko} />
             </div>
             <p className="text-[10px] font-black text-slate-400 text-center mt-6 uppercase tracking-[0.2em]">Cyan Polygon = Actual Capacity • Gray Line = Elite Standard</p>
          </div>

          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Point Distribution (0-100)</h3>
            <div className="space-y-4">
              {activeLabels.map((label, idx) => {
                const val = Object.values(scores)[idx];
                return (
                  <div key={idx} className="flex items-center">
                    <span className="text-[10px] font-black text-slate-700 uppercase w-28 tracking-tighter">{label}</span>
                    {isBlanko ? (
                      <div className="flex-1 border-b-2 border-dotted border-slate-200 mx-4"></div>
                    ) : (
                      <div className="flex-1 flex justify-end items-center gap-4 ml-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-1000 ${val >= 80 ? 'bg-cyan-500' : val >= 60 ? 'bg-blue-400' : 'bg-rose-500'}`} style={{ width: `${val}%` }}></div>
                        </div>
                        <span className={`text-xs font-black w-8 text-right ${val >= 80 ? 'text-cyan-600' : 'text-slate-500'}`}>{val}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
               <span className="text-[10px] font-black text-slate-300 tracking-[0.4em] uppercase">by fiqhipondaa9</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}