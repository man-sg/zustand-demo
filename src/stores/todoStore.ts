import { create } from 'zustand'
import { devtools } from "zustand/middleware";

export interface ToDo {
  title: string;
  completed: boolean;
  id: number;
  userId: number;
}

export type ToDoState = {
  todos: ToDo[];
  setTodos: (todos: ToDo[]) => void;
  addTodo: (todo: ToDo) => void;
  removeTodo: (todo: ToDo) => void;
  toggleComplete: (todo: ToDo) => void;
};


const store = (set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) =>
    set((state) => ({
      todos: [todo, ...state.todos],
    })),
  removeTodo: (todo) =>
    set((state) => ({ todos: state.todos.filter((item) => item !== todo) })),
  toggleComplete: (todo) =>
    set((state) => ({
      todos: state.todos.map((item) => item.id === todo.id ? { ...todo, completed: !todo.completed } : item),
    })),
})

const useTodoStore = create<ToDoState>()(devtools(store));

export default useTodoStore;
