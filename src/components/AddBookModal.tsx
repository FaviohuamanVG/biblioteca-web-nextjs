'use client';
import React, { useState } from 'react';
import { addBook } from '@/lib/api';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddBookModal({ onClose, onSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    setLoading(true);
    setError('');

    try {
      await addBook(title, author);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al agregar el libro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="bg-slate-900 rounded-3xl p-8 max-w-md w-full border border-slate-700 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
        
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-2">Nuevo Libro</h2>
        <p className="text-slate-400 mb-6">Completa los datos para el catálogo.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Título del Libro</label>
            <input 
              required
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="Ej. El Alquimista"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Autor</label>
            <input 
              required
              type="text" 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="Ej. Paulo Coelho"
            />
          </div>

          {error && <div className="text-rose-400 text-sm bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">{error}</div>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Agregar al Catálogo'}
          </button>
        </form>
      </div>
    </div>
  );
}
