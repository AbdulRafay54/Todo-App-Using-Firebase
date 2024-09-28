
import { useRef } from "react";
import { useState } from "react"


const App = () => {

  const [todo, setTodo] = useState([]);
  const todoValue = useRef();

  const addTodo = (event) => {
    event.preventDefault();



    if (!todoValue.current.value) {
      alert("Please Enter Todo!");
    }
    else {
      todo.push(todoValue.current.value);
      setTodo([...todo]);
      console.log(todo);
      todoValue.current.value = "";
    }
 
  }


  const deleteTodo = (index) => {

    todo.splice(index, 1);
    setTodo([...todo]);
    console.log(todo);

  }

  const editTodo = (index) => {

    const updatedTodo = prompt("Enter Edit Todo");
    if (updatedTodo === "") {
      alert("Try Again!\nPlease Enter new Edited Todo");
      return
    }

    todo.splice(index, 1, updatedTodo);
    setTodo([...todo]);
    console.log(todo);
  }

  

  return (
    < >
      <div className="container">
        <h1 className="main-heading">Todo App</h1>
        <form onSubmit={addTodo}>
          <input type="text" placeholder="Enter Todo" className="todo-inp"ref={todoValue}  />
          <button type="submit" className="todo-btn">Add Todo</button>
        </form>
        <ul className="todo-list">
          {todo.map((item, index) => {
            return <div key={index} >
              <li className="list">{item}
                <div className="buttons-div">
                  <button className="delete-btn buttons" onClick={() => deleteTodo(index)}>Delete</button>
                  <button className="edit-btn buttons" onClick={() => editTodo(index)}>Edit</button>
                </div>
              </li>

            </div>
          })}
        </ul>
      </div>
    </ >
  )
}

export default App
