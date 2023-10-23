import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { store } from "~/store";

export type Todo = {
    key: string,
    created: Date | null,
    updated: Date | null,
    name: string,
    finished: boolean,
}

export type Todos = Todo[];

interface ContextProps {
    addTodo: (name: string) => void;
    updateTodo: (key: string, update: Todo) => void;
    deleteTodo: (key: string) => void;
    todos: Todos | undefined;
    inputRef: React.RefObject<HTMLInputElement> | null;
    updateRef: React.RefObject<HTMLInputElement> | null;
}

const defaultValue: ContextProps = { 
    todos: [], 
    addTodo: () => {}, 
    updateTodo: () => {}, 
    deleteTodo: () => {}, 
    inputRef: null, 
    updateRef: null,
};

const Context = createContext<ContextProps>(defaultValue);

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const updateRef = useRef<HTMLInputElement>(null);

    const [todos, setTodos] = useState<Todos>();

    useEffect(() => {
        const getLocalData = async () => {
            const data: (Todos | null) = await store.getItem("todos");
            return data;
        };

        getLocalData().then(r => {
            if (r) {
                setTodos(r);
            } else {
                setTodos([]);
            }
        });
    }, []);

    useEffect(() => {
        store.setItem("todos", todos, (err, value) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Updated: ", value);
            }
        });
    }, [todos]);

    const addTodo = useCallback((name: string) => {
        const key = String(Math.floor(Math.random() * 999999));
        const created = new Date();
        const updated = null;
        const newTodo: Todo = { key, created, updated, name, finished: false };

        if (todos) {
            const updatedTodos: Todos = [newTodo, ...todos];
            setTodos(updatedTodos);
        } else {
            setTodos([newTodo]);
        }
    }, [todos]);

    const updateTodo = useCallback((key: string, update: Todo) => {
        if (todos) {
            const updatedTodos = todos.map(todo => {
                if (todo.key === key) {
                    return { ...update, updated: new Date()};
                }
                return todo;
            });
            setTodos(updatedTodos);
        }
    }, [todos]);

    const deleteTodo = useCallback((key: string) => {
        if (todos) {
            const updatedTodos = todos.filter(todo => {
                return todo.key !== key;
            });
            setTodos(updatedTodos);
        }
    }, [todos]);

    return <Context.Provider value={{addTodo, updateTodo, deleteTodo, todos, inputRef, updateRef}}>
        { children }
    </Context.Provider>
};

export default Provider;

export const useTodo = () => useContext(Context);