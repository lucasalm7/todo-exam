import { describe, it, expect } from 'vitest'
import { clearCompletedTodos, toggleAllTodos, type Todo } from './todoLogic'

describe('clearCompletedTodos', () => {
  it('removes all completed todos', () => {
    const initial: Todo[] = [
      { id: 1, text: 'Task 1', completed: true },
      { id: 2, text: 'Task 2', completed: false }
    ]
    const result = clearCompletedTodos(initial)
    expect(result).toEqual([{ id: 2, text: 'Task 2', completed: false }])
  })
})

describe('toggleAllTodos', () => {
  it('marks all as completed if some are uncompleted', () => {
    const initial: Todo[] = [
      { id: 1, text: 'Task 1', completed: true },
      { id: 2, text: 'Task 2', completed: false }
    ]
    const result = toggleAllTodos(initial)
    expect(result.every(t => t.completed)).toBe(true)
  })

  it('marks all as uncompleted if all are already completed', () => {
    const initial: Todo[] = [
      { id: 1, text: 'Task 1', completed: true },
      { id: 2, text: 'Task 2', completed: true }
    ]
    const result = toggleAllTodos(initial)
    expect(result.every(t => !t.completed)).toBe(true)
  })
})