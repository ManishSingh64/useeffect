import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import axios from 'axios';


const TodoUseeffect = () => {
    const [page, setPage] = useState(1);
    const [newTodo, setNewTodo] = useState("")
    const [todos, setTodos] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [limit, setLimit] = useState(5)
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
        axios

         .get(`http://localhost:3004/todos?_page=${page}&_limit=${limit}`)
        .then((res) =>{
            console.log(res)
            setTodos(res.data)
            setTotalCount(Number(res.headers["x-total-count"]));
        })
    }, [page,limit]);

  return (
    <div>
        Todos
        <div>
        <button
          disabled={page <= 1}
          onClick={() => {
              if(page > 1){
                  setPage(page - 1);
              }
          }}
         >{"<"}</button>

          <select name="" id="" onChange={(e) => setLimit(Number(e.target.value))}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
          </select>

         <button disabled={totalCount < page*5 } onClick={() => setPage(page + 1)}>{">"}</button>
           
           
            <div>
                <input type="text" onChange={(e) => setNewTodo(e.target.value)}/>
                <button onClick={saveInfo}>+</button>
            </div>
            {todos.map((todo) =>(
                <div key={todo.id}>{todo.id} {` : `} {todo.text}</div>
            ))}
        </div>
        
    </div>
  )
}

export default TodoUseeffect;