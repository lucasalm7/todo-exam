"use strict";
let todos = [];
const todoInput = document.getElementById('todo-input');
const todoForm = document.querySelector('.todo-form');
const todoList = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-message'); //possible feature
const addTodo = (text) => {
    const newTodo = {
        id: Date.now(), //replace with uuid
        text: text,
        completed: false
    };
    todos.push(newTodo);
    console.log(`Todo added: ${todos}`);
    renderTodos();
};
const renderTodos = () => {
    // clears the current list
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
      <span>${todo.text}</span>
      <button>Remove</button>
    `;
        addRemoveButtonListener(li, todo.id);
        todoList.appendChild(li);
    });
};
renderTodos();
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = todoInput.value.trim();
    if (text !== '') {
        addTodo(text);
        todoInput.value = ''; //clears input field
    }
});
const addRemoveButtonListener = (li, id) => {
    const removeButton = li.querySelector('button');
    removeButton?.addEventListener('click', () => removeTodo(id));
};
const removeTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
};
