export interface User {
  id: number;
  role: string;
  name: string;
  email: string;
  user_id: number;
  todolist_id: number;
  created_at?: any;
  updated_at?: any;
}

export interface Task {
  id: number;
  todolist_id: number;
  title: string;
  description: string;
  tag: string;
  active: number;
  archived: number;
  created_at?: any;
  updated_at?: any;
}

export interface TodolistInterface {
  id: number;
  title: string;
  archived: number;
  users: User[];
  tasks: Task[];
}

export interface WaitingSharedTodolist {
  id: number;
  user: User;
  todolist: TodolistInterface;
}

export interface TodolistUsers {
  id: number;
  user: User;
  sharedby: User;
  todolist: TodolistInterface;
  owner: boolean;
  read: boolean;
  write: boolean;
}
