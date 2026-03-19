'use client';
import React, { useState } from 'react';
import { Book, Loan, User } from '@/types';
import { borrowBook, createUser } from '@/lib/api';

interface Props {
  book: Book;
  onClose: () => void;
  onSuccess: (loan: Loan) => void;
}

export default function BorrowModal({ book, onClose, onSuccess }: Props) {
  const [name, setName] = useState('');
  const [role, setRole] = useState<'KID' | 'TEEN' | 'ADULT'>('KID');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBorrow = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!name.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const user = await createUser(name, role);
      const loan = await borrowBook(user.id, book.id);
      onSuccess(loan);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al procesar el préstamo');
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
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
        
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-2">Préstamo de Libro</h2>
        <p className="text-slate-400 mb-6">Vas a pedir prestado: <br/><span className="text-blue-400 font-semibold text-lg">{book.title}</span></p>

        <form onSubmit={handleBorrow} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">¿Cuál es tu nombre?</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="Ej. Juan Pérez"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">¿Categoría de Lector?</label>
            <div className="grid grid-cols-3 gap-3">
              {(['KID', 'TEEN', 'ADULT'] as const).map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                    role === r 
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-inner' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  {r === 'KID' ? '👦 Niño' : r === 'TEEN' ? '👱 Joven' : '👨 Adulto'}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              {role === 'KID' ? '14 días de préstamo' : role === 'TEEN' ? '10 días de préstamo' : '7 días de préstamo'}
            </p>
          </div>

          {error && <div className="text-rose-400 text-sm bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">{error}</div>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-wait"
          >
            {loading ? 'Procesando...' : 'Confirmar Préstamo'}
          </button>
        </form>
      </div>
    </div>
  );
}
