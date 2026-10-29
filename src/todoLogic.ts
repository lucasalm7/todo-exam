// structure of the data schema (moved here so it can be shared with tests)
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Returns a NEW list where the todo with the given id has the new text.
// Empty or whitespace-only text is rejected and the list is returned unchanged.
export const updateTodoText = (todos: Todo[], id: number, newText: string): Todo[] => {
  const text = newText.trim()
  if (text === '') return todos
  return todos.map(todo => (todo.id === id ? { ...todo, text } : todo))
}

export const toggleTodo = (todos: Todo[], id: number): Todo[] => {
  return todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
}

// Returns a new list containing only uncompleted todos
export const clearCompletedTodos = (todos: Todo[]): Todo[] => {
  return todos.filter(todo => !todo.completed)
}

// If all todos are completed, uncompletes all. Otherwise, completes all.
export const toggleAllTodos = (todos: Todo[]): Todo[] => {
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed)
  return todos.map(todo => ({ ...todo, completed: !allCompleted }))
}