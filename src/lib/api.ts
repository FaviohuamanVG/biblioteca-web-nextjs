import { Book, Loan, User } from '../types';

// Usamos el proxy configurado en next.config.ts para evitar errores de CORS
const API_BASE_URL = '/api/proxy';

export const getBooks = async (): Promise<Book[]> => {
  const res = await fetch(`${API_BASE_URL}/books`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error obteniendo libros');
  return res.json();
};

export const borrowBook = async (userId: number, bookId: number): Promise<Loan> => {
  const res = await fetch(`${API_BASE_URL}/loans/borrow?userId=${userId}&bookId=${bookId}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Error al pedir prestado el libro');
  return res.json();
};

export const returnBook = async (returnCode: string): Promise<Loan> => {
  const res = await fetch(`${API_BASE_URL}/loans/return?returnCode=${returnCode}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Código inválido o ya devuelto');
  return res.json();
};

export const createUser = async (name: string, role: string): Promise<User> => {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, role }),
  });
  if (!res.ok) throw new Error('Error al registrar usuario');
  return res.json();
};

export const addBook = async (title: string, author: string): Promise<Book> => {
  const res = await fetch(`${API_BASE_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author }),
  });
  if (!res.ok) throw new Error('Error al registrar el libro');
  return res.json();
};
