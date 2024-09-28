// import React from "react";
// import { db } from "../config/firebase-config";
// import { collection, addDoc ,getDocs} from "firebase/firestore";

// const querySnapshot = await getDocs(collection(db, "cities"));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });

// function App() {
//   const addTodos = async () => {
//     // Add a new document with a generated id.
//     try {
//       const docRef = await addDoc(collection(db, "cities"), {
//         name: "Tokyo",
//         country: "Japan",
//       });
//       console.log("Document written with ID: ", docRef.id);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <button onClick={addTodos}>add data</button>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useRef, useState } from "react";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";



function App() {
  const todoVal = useRef();
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTodos() {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({ todo: doc.data().todo, id: doc.id });
      });
      setTodo(todos);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    const newTodo = todoVal.current.value;
    try {
      const docRef = await addDoc(collection(db, "todos"), { todo: newTodo });
      setTodo([{ todo: newTodo, id: docRef.id }, ...todo]);
      todoVal.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  async function editTodo(index, id) {
    const editedTodo = prompt("Edit your todo", todo[index].todo);
    if (editedTodo) {
      todo[index].todo = editedTodo;
      const edit = doc(db, "todos", id);
      setTodo([...todo]);
      await updateDoc(edit, { todo: editedTodo });
    }
  }

  async function deleteTodo(index, id) {
    todo.splice(index, 1);
    setTodo([...todo]);
    await deleteDoc(doc(db, "todos", id));
  }

  return (
    <>
      <h1 className="text-center mt-8 text-2xl font-extrabold text-blue-500 my-4">
        Todo App
      </h1>
      <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl shadow-lg">
        <form onSubmit={addTodo} className="mb-6 flex space-x-2">
          <input
            type="text"
            ref={todoVal}
            placeholder="Add a new todo"
            className="flex-grow p-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-40"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transform hover:scale-105"
          >
            Add Todo
          </button>
        </form>
        {loading ? (
          <p className="text-center text-md">Loading...</p>
        ) : (
          <div>
            {todo.length > 0 ? (
              todo.map((item, index) => (
                <div key={item.id} className="bg-gray-800 p-4 mb-3 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-gray-700 duration-300">
                  <h2 className="text-xl font-bold mb-2 text-green-400">{item.todo}</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => editTodo(index, item.id)}
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md shadow-md transition transform hover:scale-105"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(index, item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md shadow-md transition transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-md text-gray-400">No Todo Found!</p>
            )}
          </div>
        )}
      </div>
    </>
  );
  
  
}

export default App;
