import React, { useState, useEffect } from 'react'; // Added import for useEffect
import Navbar from './components/navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Corrected the use of JSON.parse
    let todoString = localStorage.getItem("todos");
    if(todoString){
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);
  

  const savetols = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  

  const handleEdit = (e, id) => {
    // Implement your edit logic here
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetols();
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetols();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo('');
    savetols();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetols();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh]">
        <div className="addtodo">
          <h1 className="text-lg font-bold my-5">Add a todo</h1>
          <input onChange={handleChange} value={todo} className="w-60" type="text" />
          <button onClick={handleAdd} className="bg-violet-800 text-sm font-bold hover:bg-violet-900 p-3 py-1 text-white rounded-md mx-6">
            save
          </button>
        </div>
        <div className="text-xl font-bold">
          <h1 className="text-lg font-bold">Your todo</h1>
          <div className="todos">
            {todos.length === 0 && <div className='m-5'>No Todo to display </div>}
            {todos.map((item, index) => (
              <div key={item.id} className="todo flex w-1/2 justify-between my-3">
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? 'line-through' : ''}>{item.todo}</div>
                <div className=" flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className="bg-violet-800 text-sm font-bold hover:bg-violet-900 p-3 py-1 text-white rounded-md mx-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="bg-violet-800 text-sm font-bold hover:bg-violet-900 p-3 py-1 text-white rounded-md mx-2">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
