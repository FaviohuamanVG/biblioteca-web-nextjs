'use client';
import React, { useState } from 'react';
import { returnBook } from '@/lib/api';

export default function ReturnSection({ onChange }: { onChange: () => void }) {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'IDLE'|'LOADING'|'SUCCESS'|'ERROR'>('IDLE');
  const [message, setMessage] = useState('');

  const handleReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    
    if(!code.toUpperCase().startsWith('BBL-')) {
      setStatus('ERROR');
      setMessage('El formato del código es incorrecto (Ej. BBL-A1B2C3)');
      return;
    }

    setStatus('LOADING');
    try {
      await returnBook(code.toUpperCase());
      setStatus('SUCCESS');
      setMessage('¡Libro devuelto a la biblioteca exitosamente!');
      setCode('');
      onChange(); // Actualiza el catálogo
      
      // Limpia el mensaje después de 4 segundos
      setTimeout(() => setStatus('IDLE'), 4000);
    } catch (err: any) {
      setStatus('ERROR');
      setMessage(err.message || 'El código no es válido o ya fue devuelto.');
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 lg:p-12 border border-slate-700/50 shadow-2xl relative overflow-hidden group">
      {/* Glow Effects */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] group-hover:bg-emerald-500/30 transition-colors duration-700" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 mb-6 shadow-inner">
          <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
        </div>
        
        <h2 className="text-3xl font-extrabold text-white mb-3">Devoluciones Rápidas</h2>
        <p className="text-slate-400 mb-8 text-lg">Ingresa tu código único de ticket (BBL) para devolver un libro al catálogo.</p>

        <form onSubmit={handleReturn} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input 
            type="text" 
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="BBL-XXXXXX"
            className="flex-1 bg-slate-950/80 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-2xl px-6 py-4 text-white uppercase tracking-[0.2em] font-mono text-center sm:text-left outline-none transition-all duration-300 shadow-inner"
          />
          <button 
            type="submit"
            disabled={status === 'LOADING' || !code}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black tracking-wide px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full"
          >
            {status === 'LOADING' ? '...' : 'Devolver'}
          </button>
        </form>
        
        <div className="mt-6 h-6">
          {status === 'SUCCESS' && <p className="text-emerald-400 font-medium animate-in slide-in-from-bottom-2 fade-in">✨ {message}</p>}
          {status === 'ERROR' && <p className="text-rose-400 font-medium animate-in slide-in-from-bottom-2 fade-in">⚠️ {message}</p>}
        </div>
      </div>
    </div>
  );
}
