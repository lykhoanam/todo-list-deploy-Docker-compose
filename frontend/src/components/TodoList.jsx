import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:5000/api/todos', { text: newTodo })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('Error adding todo:', error));
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div class="container">
        <div class="header">
            <h1>TODO</h1>
            <div class="tabs">
                <div class="active">Personal</div>
                <div>Professional</div>
            </div>
        </div>
        <div class="input-container">
            <input type="text" placeholder="What do you need to do?" value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}/>
            <button onClick={addTodo}>Add Todo</button>
        </div>
      {/* <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button> */}
      <div>
        {todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} onDelete={deleteTodo} />
        ))}
      </div>
    </div>

    
  );
};

export default TodoList;
