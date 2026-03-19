'use client';
import { useEffect, useState } from 'react';
import { Book, Loan } from '@/types';
import { getBooks } from '@/lib/api';
import BookCard from '@/components/BookCard';
import BorrowModal from '@/components/BorrowModal';
import ReturnSection from '@/components/ReturnSection';
import AddBookModal from '@/components/AddBookModal';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [successLoan, setSuccessLoan] = useState<Loan | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBorrowSuccess = (loan: Loan) => {
    setSuccessLoan(loan);
    setSelectedBook(null);
    fetchBooks(); // Refresh catalog
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden font-sans selection:bg-emerald-500/30">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Header */}
        <header className="mb-16 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Biblioteca Virtual
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Explora nuestro catálogo, pide prestado tu libro favorito en segundos y devuélvelo cuando termines usando tu ticket inteligente.
            </p>
          </div>
          <div className="hidden lg:block relative">
             <div className="w-32 h-32 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-full opacity-20 blur-3xl absolute -right-10 -top-10 animate-pulse" />
             <div className="text-8xl">📚</div>
          </div>
        </header>

        {/* Content Tabs / Split */}
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Column: Catalog */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-500 rounded-full inline-block"></span>
                Catálogo de Libros
              </h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-600/20 active:scale-95 flex items-center gap-2"
                >
                  <span className="text-lg">+</span> Añadir Libro
                </button>
                <span className="hidden sm:inline-block text-xs font-medium bg-slate-800 text-slate-400 px-4 py-2.5 rounded-xl border border-slate-700">
                  {books.length} Libros
                </span>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-12 h-12 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : books.length === 0 ? (
               <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
                 <p className="text-slate-400 text-lg">No hay libros en la base de datos.</p>
                 <p className="text-sm text-slate-500 mt-2">Usa Postman o interactúa con el API en el backend para crear libros.</p>
               </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {books.map(book => (
                  <BookCard 
                    key={book.id} 
                    book={book} 
                    onBorrow={(id) => setSelectedBook(books.find(b => b.id === id) || null)} 
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Returns */}
          <div className="lg:col-span-1">
             <div className="sticky top-12">
               <ReturnSection onChange={fetchBooks} />
             </div>
          </div>

        </div>
      </main>

      {/* Modals */}
      {selectedBook && (
        <BorrowModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)}
          onSuccess={handleBorrowSuccess}
        />
      )}

      {successLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
          <div className="bg-slate-900 rounded-3xl p-8 max-w-md w-full border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-emerald-400">✔️</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">¡Préstamo Exitoso!</h2>
            <p className="text-slate-400 mb-6">Disfruta tu lectura, <span className="text-white font-medium">{successLoan.user.name}</span>.</p>
            
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 mb-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
               <p className="text-sm font-medium text-slate-500 mb-1 uppercase tracking-wider">Tu Ticket de Devolución</p>
               <p className="text-3xl font-mono font-bold text-emerald-400 tracking-widest selection:bg-emerald-500/30 py-2">{successLoan.returnCode}</p>
               <p className="text-xs text-slate-600 mb-4">(Guarda este número para devolverlo)</p>
               
               <div className="pt-4 border-t border-slate-800 flex justify-between text-sm">
                 <span className="text-slate-500">Préstamo:</span>
                 <span className="text-slate-300 font-medium">{successLoan.borrowDate}</span>
               </div>
               <div className="mt-2 flex justify-between text-sm">
                 <span className="text-slate-500">Devolución Máx:</span>
                 <span className="text-rose-400 font-medium">{successLoan.dueDate}</span>
               </div>
            </div>

            <button 
              onClick={() => setSuccessLoan(null)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 rounded-xl transition-colors"
            >
              Entendido, gracias
            </button>
          </div>
        </div>
      )}

      {showAddModal && (
        <AddBookModal 
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchBooks}
        />
      )}
    </div>
  );
}
