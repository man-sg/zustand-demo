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


// Autogenerate selectors
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

const initialState = {
  todos: [] as ToDo[],
};

const store = (set) => ({
  ...initialState,
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
  resetState: () => set(initialState)
})

const useTodoStore = create<ToDoState>()(devtools(store));

// Export the store with selectors
export const useTodoStoreWithSelectors = createSelectors(useTodoStore)

export default useTodoStore;
