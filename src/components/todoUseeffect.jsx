import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';

const TodoUseeffect = () => {
    const [newTodo, setNewTodo] = useState("")
    const [todos, setTodos] = useState([]);

    const saveInfo = () => {
        //call api to save this information in backend

        fetch("http://localhost:3004/todos",{
            method:"POST",
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify({
                text:newTodo,
                isCompleted:false,
            }),
        })
        .then((r) =>  r.json())
        .then((d) => {
            setTodos([...todos,d]);
            setNewTodo("")
        })
    };

    useEffect(() =>{
        
        fetch("http://localhost:3004/todos")
        .then((r) => r.json())
        .then((d) => {
            setTodos(d);
        })
    }, []);

  return (
    <div>
        Todos
        <div>
            <div>
                <input type="text" onChange={(e) => setNewTodo(e.target.value)}/>
                <button onClick={saveInfo}>+</button>
            </div>
            {todos.map((todo) =>(
                <div key={todo.id}>{todo.text}</div>
            ))}
        </div>
        </div>
  )
}

export default TodoUseeffect;