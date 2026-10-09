import './style.css'

// structure of the data schema
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = [];

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


const addRemoveButtonListener = (li:HTMLLIElement, id:number):void => {
  const removeButton = li.querySelector('.remove-btn');
  removeButton?.addEventListener('click', () => removeTodo(id))
}

const removeTodo = (id:number):void => {
  todos = todos.filter(todo => todo.id !== id)
  renderTodos()
}

const addEditButtonListener = (li:HTMLLIElement, id:number):void => {
  const editButton = li.querySelector('.edit-btn')
  editButton?.addEventListener('click', () => editTodo(id))
}

const editTodo = (id:number):void => {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    const text = prompt('Edit todo', todo.text)?.trim()
    if (text) {
      todo.text = text
      renderTodos()
    }
  }
}

const renderTodos = ():void => {
  // clears the current list
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li')
    li.className = 'todo-item'
    li.innerHTML = `
      <span>${todo.text}</span>
      <button class="remove-btn">Remove</button>
      <button class="edit-btn">Edit</button>

    `

    addEditButtonListener(li, todo.id);
    addRemoveButtonListener(li, todo.id);
    todoList.appendChild(li)
  })
}

renderTodos();