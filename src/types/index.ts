export interface User {
  id: number;
  name: string;
  role: 'KID' | 'TEEN' | 'ADULT';
}

export interface Book {
  id: number;
  title: string;
  author: string;
  status: 'AVAILABLE' | 'BORROWED';
}

export interface Loan {
  id: number;
  user: User;
  book: Book;
  borrowDate: string;
  dueDate: string;
  returnCode: string;
  status: 'ACTIVE' | 'RETURNED' | 'OVERDUE';
}
