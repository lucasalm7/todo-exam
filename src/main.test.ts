import { describe, it, expect } from 'vitest'

interface Todo {
    id:number,
    text:string,
    completed:boolean
}

const addTodo = (todos: Todo[], text:string) => {
    const newTodo:Todo = {
        id:123,
        text,
        completed:false
    }
    return[...todos, newTodo]
}

const removeTodo = (todos: Todo[], id:number) => {
    return todos.filter(todo => todo.id !== id);
}

describe('AddTodo', () => {
    it('should add new todo to the list', () => {
        const todos: Todo[] = [];
        const result = addTodo(todos, 'Test todo');
        expect(result.length).toBe(1)
        expect(result[0].text).toBe('Test todo')
        expect(result[0].completed).toBe(false)
    })
})

describe('removeTodo', () => {
    it('should remove the todo with the given id', () => {
        const todos: Todo[] = [
            { id: 1, text: 'First todo', completed: false },
            { id: 2, text: 'Second todo', completed: true }
        ];
        const result = removeTodo(todos, 1);
        expect(result.length).toBe(1);
        expect(result[0].id).toBe(2);
    })

    it('should leave the list unchanged if the id does not exist', () => {
        const todos: Todo[] = [{ id: 1, text: 'First todo', completed: false }];
        const result = removeTodo(todos, 99);
        expect(result).toEqual(todos);
    })

    it('should not mutate the original list', () => {
        const todos: Todo[] = [{ id: 1, text: 'First todo', completed: false }];
        removeTodo(todos, 1);
        expect(todos.length).toBe(1);
    })
})