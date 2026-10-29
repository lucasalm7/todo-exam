import './style.css'
import { initializeColorPicker } from './colorPicker'
import { updateTodoText, toggleTodo, clearCompletedTodos, toggleAllTodos, type Todo } from './todoLogic'

let todos: Todo[] = [];
// id of the todo currently being edited, or null if none
let editingId: number | null = null;

const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const clearCompletedBtn = document.getElementById('clear-completed-btn') as HTMLButtonElement
const toggleAllBtn = document.getElementById('toggle-all-btn') as HTMLButtonElement

// const errorMessage = document.getElementById('error-message') as HTMLParagraphElement //possible feature

clearCompletedBtn?.addEventListener('click', () => {
  todos = clearCompletedTodos(todos)
  renderTodos()
})

toggleAllBtn?.addEventListener('click', () => {
  todos = toggleAllTodos(todos)
  renderTodos()
})

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
const startEdit = (id:number):void => {
  editingId = id
  renderTodos()
}

const cancelEdit = ():void => {
  editingId = null
  renderTodos()
}

// Save the new text (empty text is ignored by updateTodoText) and leave edit mode
const saveEdit = (id: number, text: string): void => {
  todos = updateTodoText(todos, id, text)
  editingId = null
  renderTodos()
}

// Flip the completed status of a todo and redraw the list
const toggleCompleted = (id: number): void => {
  todos = toggleTodo(todos, id)
  renderTodos()
}

const createButton = (label: string, className: string, onClick: () => void): HTMLButtonElement => {
  const button = document.createElement('button')
  button.textContent = label
  button.className = className
  button.addEventListener('click', onClick)
  return button
}

// Normal view: text + Complete/Undo, Remove and Edit buttons
const renderViewMode = (li: HTMLLIElement, todo: Todo): void => {
  const span = document.createElement('span')
  span.textContent = todo.text
  // the "completed" class lets CSS style finished todos
  if (todo.completed) li.classList.add('completed')
  li.append(
    span,
    createButton(todo.completed ? 'Undo' : 'Complete', 'toggle-btn', () => toggleCompleted(todo.id)),
    createButton('Remove', 'remove-btn', () => removeTodo(todo.id)),
    createButton('Edit', 'edit-btn', () => startEdit(todo.id))
  )
}

// Edit view: text input + Save and Cancel buttons
const renderEditMode = (li: HTMLLIElement, todo: Todo): void => {
  const input = document.createElement('input')
  input.type = 'text'
  input.className = 'edit-input'
  input.value = todo.text
  input.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter') saveEdit(todo.id, input.value)
    if (event.key === 'Escape') cancelEdit()
  })
  li.append(
    input,
    createButton('Save', 'save-btn', () => saveEdit(todo.id, input.value)),
    createButton('Cancel', 'cancel-btn', cancelEdit)
  )
}

const renderTodos = (): void => {
  // clears the current list
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li')
    li.className = 'todo-item'
    if (todo.id === editingId) {
      renderEditMode(li, todo)
    } else {
      renderViewMode(li, todo)
    }
    todoList.appendChild(li)
  })

  // put the cursor in the edit field so the user can type right away
  const editInput = todoList.querySelector<HTMLInputElement>('.edit-input')
  editInput?.focus()
  editInput?.select()
}

renderTodos();

document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker();
});