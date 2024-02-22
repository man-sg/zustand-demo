import { create } from 'zustand'
import { devtools } from "zustand/middleware";
import { StoreApi, UseBoundStore } from 'zustand'

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


type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    ; (store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}

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
export const useTodoStoreWithSelectors = createSelectors(useTodoStore)

export default useTodoStore;
