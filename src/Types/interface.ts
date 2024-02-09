import { Request } from 'express';
export interface User {
  id: number;
  username: string;
  email: string;
  newPassword?: string;
  password: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  userId: number;
  user: User;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  articleId: number;
}

export interface RequestWithUser extends Request {
  user?: User;
}
