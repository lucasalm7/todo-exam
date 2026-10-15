// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { changeBackgroundColor, initializeColorPicker } from './colorPicker'
import { updateTodoText } from './todoLogic'

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

describe('color picker', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        document.body.style.backgroundColor = '';
    })

    it('changeBackgroundColor should set the body background color', () => {
        changeBackgroundColor('#ff0000');
        expect(document.body.style.backgroundColor).toBe('rgb(255, 0, 0)');
    })

    it('should change the background when the color picker input changes', () => {
        document.body.innerHTML = '<input type="color" id="colorPicker">';
        initializeColorPicker();

        const picker = document.getElementById('colorPicker') as HTMLInputElement;
        picker.value = '#00ff00';
        picker.dispatchEvent(new Event('input'));

        expect(document.body.style.backgroundColor).toBe('rgb(0, 255, 0)');
    })

    it('should log an error if the color picker element is missing', () => {
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        initializeColorPicker();
        expect(errorSpy).toHaveBeenCalledWith('Color picker element not found');
        errorSpy.mockRestore();
    })
})

describe('updateTodoText', () => {
    const todos: Todo[] = [
        { id: 1, text: 'First todo', completed: false },
        { id: 2, text: 'Second todo', completed: true }
    ];

    it('should update the text of the todo with the given id', () => {
        const result = updateTodoText(todos, 1, 'Updated todo');
        expect(result[0].text).toBe('Updated todo');
        expect(result[1].text).toBe('Second todo');
    })

    it('should keep the other fields of the edited todo', () => {
        const result = updateTodoText(todos, 2, 'Changed');
        expect(result[1].id).toBe(2);
        expect(result[1].completed).toBe(true);
    })

    it('should trim whitespace from the new text', () => {
        const result = updateTodoText(todos, 1, '  spaced  ');
        expect(result[0].text).toBe('spaced');
    })

    it('should ignore empty or whitespace-only text', () => {
        expect(updateTodoText(todos, 1, '')).toEqual(todos);
        expect(updateTodoText(todos, 1, '   ')).toEqual(todos);
    })

    it('should leave the list unchanged if the id does not exist', () => {
        expect(updateTodoText(todos, 99, 'Nope')).toEqual(todos);
    })

    it('should not mutate the original list', () => {
        updateTodoText(todos, 1, 'Changed');
        expect(todos[0].text).toBe('First todo');
    })
})