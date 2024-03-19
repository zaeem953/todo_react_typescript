import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProviderProps = {
    children : ReactNode
}

export type Todos = {
    id : string;
    task : string;
    completed : boolean;
    createdAt : Date;
}

export type TodosContext = {
    todos : Todos[];
    handleAddTodo : (task:string) => void; //call signature
    toggleTodoAsCompleted : (id:string) => void
    handleDeleteTodo : (id:string) => void
}

export const todosContext = createContext<TodosContext | null>(null);

// children children must be lowecase
export const TodosProvider = ({children} : TodosProviderProps) => {

    // const [todos,setTodos] = useState<Todos[]>([]);

    const [todos,setTodos] = useState<Todos[]>(() => {
        try {
            const newTodos=localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodos) as Todos[];
        } catch (error) {
            return [];
        }
    })

    const handleAddTodo = (task:string) => {
        setTodos((prev) => {
            const newTodos:Todos[]= [
                {
                    id : Math.random().toString(),
                    task:task,
                    completed:false,
                    createdAt: new Date()
                },
                ... prev
            ]
            

            // console.log("Previous data "  + prev);
            // console.log(newTodos);
            localStorage.setItem("todos",JSON.stringify(newTodos));
            return newTodos;
        })
    }

    //mark toggle/completed
    const toggleTodoAsCompleted = (id:string) =>{
        setTodos((prev) =>{
            let newTodos = prev.map((todo) => {
                if(todo.id === id){
                    return {...todo,completed: !todo.completed}
                }
                return todo;
            })
            localStorage.setItem("todos",JSON.stringify(newTodos));
            return newTodos;
        })
    }


    const handleDeleteTodo = (id:string) => {
        setTodos((prev) => {
            let newTodos = prev.filter((filterTodo) => filterTodo.id !== id);
            localStorage.setItem("todos",JSON.stringify(newTodos));
            return newTodos;
        })
    }

    return <todosContext.Provider value={{todos,handleAddTodo,toggleTodoAsCompleted,handleDeleteTodo}}>
        {children}
    </todosContext.Provider>

}


//consumer
export const useTodos = () => {
    const todosConsumer= useContext(todosContext);
    if(!todosConsumer){
        throw new Error("useTodos used outside of provider")
    }

    return todosConsumer;
}