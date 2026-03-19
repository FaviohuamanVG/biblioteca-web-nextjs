import { Book } from '@/types';

interface Props {
  book: Book;
  onBorrow: (bookId: number) => void;
}

export default function BookCard({ book, onBorrow }: Props) {
  const isAvailable = book.status === 'AVAILABLE';

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{book.title}</h3>
          <p className="text-slate-400 text-sm">{book.author}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${isAvailable ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
          {isAvailable ? 'DISPONIBLE' : 'PRESTADO'}
        </span>
      </div>
      
      <button 
        onClick={() => onBorrow(book.id)}
        disabled={!isAvailable}
        className={`w-full py-3 rounded-xl font-medium tracking-wide transition-all duration-300 ${
          isAvailable 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 active:scale-95' 
            : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
        }`}
      >
        {isAvailable ? 'Pedir Prestado' : 'No Disponible'}
      </button>
    </div>
  );
}
