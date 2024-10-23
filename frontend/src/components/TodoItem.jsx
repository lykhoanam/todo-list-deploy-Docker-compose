import React from 'react';

const TodoItem = ({ todo, onDelete }) => {
  return (
    // <div>
    //   <span>{todo.text}</span>
    //   <button onClick={() => onDelete(todo._id)}>Delete</button>
    // </div>
    <ul class="todo-list">
      <li>
          <div class="todo-text">
              <span>{todo.text}</span>
          </div>
          <div class="delete"><button onClick={() => onDelete(todo._id)}>Delete</button></div>
      </li>
    </ul>
  );
};

export default TodoItem;
