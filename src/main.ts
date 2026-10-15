import './style.css'
import { initializeColorPicker } from './colorPicker'

// structure of the data schema
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = [];
let editingId: number | null = null;

const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const todoList = document.getElementById('todo-list') as HTMLUListElement

// const errorMessage = document.getElementById('error-message') as HTMLParagraphElement //possible feature

const addTodo = (text:string):void => {
  const newTodo: Todo = {
    id: Date.now(), //replace with uuid
    text: text,
    completed: false
  }
  todos.push(newTodo)
  console.log(`Todo added: ${todos}`)

  renderTodos();
}

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const text = todoInput.value.trim()

  if (text !== '') {
    addTodo(text)
    todoInput.value = '' //clears input field
  }
})

const removeTodo = (id:number):void => {
  todos = todos.filter(todo => todo.id !== id)
  if (editingId === id) editingId = null
  renderTodos()
}
const startEditing = (id:number):void => {
  editingId = id
  renderTodos()
}

const cancelEditing = ():void => {
  editingId = null
  renderTodos()
}

const saveTodo = (id:number, newText:string):void => {
  const text = newText.trim()
  if (text === '') return // stay in edit mode, empty todos aren't allowed

  const todo = todos.find(todo => todo.id === id)
  if (todo) todo.text = text
  editingId = null
  renderTodos()
}

const createButton = (label:string, className:string, onClick:() => void):HTMLButtonElement => {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = className
  button.textContent = label
  button.addEventListener('click', onClick)
  return button
}

const renderTodos = ():void => {
  // clears the current list
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li')
    li.className = 'todo-item'

    if (todo.id === editingId) {
      const input = document.createElement('input')
      input.type = 'text'
      input.className = 'edit-input'
      input.value = todo.text
      input.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') saveTodo(todo.id, input.value)
        if (event.key === 'Escape') cancelEditing()
      })

      li.append(
        input,
        createButton('Save', 'save-btn', () => saveTodo(todo.id, input.value)),
        createButton('Cancel', 'cancel-btn', cancelEditing)
      )
      todoList.appendChild(li)
      input.focus()
      input.select()
    } else {
      const span = document.createElement('span')
      span.textContent = todo.text

      li.append(
        span,
        createButton('Remove', 'remove-btn', () => removeTodo(todo.id)),
        createButton('Edit', 'edit-btn', () => startEditing(todo.id))
      )
      todoList.appendChild(li)
    }
  })
}

renderTodos();

document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker();
});