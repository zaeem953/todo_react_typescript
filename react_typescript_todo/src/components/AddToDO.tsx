import { FormEvent, useState } from "react"
import { useTodos } from "../store/todos";


const AddToDO = () => {
    const[todo, setTodo]=useState("");
    const {handleAddTodo} = useTodos();

    const handleFormSubmit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        handleAddTodo(todo);
        setTodo("");
    }
  return (
        <form onSubmit={handleFormSubmit}>
            <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
            <button type="submit">Add</button>
        </form>
  )
}

export default AddToDO