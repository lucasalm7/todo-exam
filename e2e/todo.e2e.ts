import { Selector, ClientFunction } from 'testcafe'

const PAGE = 'http://localhost:4173/todo-exam/'

const todoItems = Selector('.todo-item')
const itemText = (index: number) => todoItems.nth(index).find('span')

const addTodo = async (t: TestController, text: string): Promise<void> => {
  await t.typeText('#todo-input', text).click('.todo-form button[type="submit"]')
}

fixture('Add todo').page(PAGE)

test('adds a todo to the list and clears the input', async t => {
  await addTodo(t, 'Buy milk')
  await t
    .expect(todoItems.count).eql(1)
    .expect(itemText(0).innerText).eql('Buy milk')
    .expect(Selector('#todo-input').value).eql('')
})

test('does not add an empty todo', async t => {
  await t.click('.todo-form button[type="submit"]')
  await t.expect(todoItems.count).eql(0)
})

fixture('Remove todo').page(PAGE)

test('removes a todo', async t => {
  await addTodo(t, 'Temporary')
  await t.click('.remove-btn')
  await t.expect(todoItems.count).eql(0)
})

test('removes only the selected todo', async t => {
  await addTodo(t, 'First')
  await addTodo(t, 'Second')
  await t.click(todoItems.nth(0).find('.remove-btn'))
  await t
    .expect(todoItems.count).eql(1)
    .expect(itemText(0).innerText).eql('Second')
})

fixture('Edit todo').page(PAGE)

test('saves the edited text', async t => {
  await addTodo(t, 'Old text')
  await t
    .click('.edit-btn')
    .typeText('.edit-input', 'New text', { replace: true })
    .click('.save-btn')
  await t.expect(itemText(0).innerText).eql('New text')
})

test('cancel keeps the original text', async t => {
  await addTodo(t, 'Keep me')
  await t
    .click('.edit-btn')
    .typeText('.edit-input', 'Changed', { replace: true })
    .click('.cancel-btn')
  await t.expect(itemText(0).innerText).eql('Keep me')
})

fixture('Background color picker').page(PAGE)

// TestCafé cannot operate the native color dialog, so set the value and fire the input event
const setColor = ClientFunction((color: string) => {
  const picker = document.getElementById('colorPicker') as HTMLInputElement
  picker.value = color
  picker.dispatchEvent(new Event('input'))
})
const bodyBackground = ClientFunction(() => document.body.style.backgroundColor)

test('changes the page background', async t => {
  await setColor('#ff0000')
  await t.expect(bodyBackground()).eql('rgb(255, 0, 0)')
})

test('updates the background when the color changes again', async t => {
  await setColor('#ff0000')
  await setColor('#00ff00')
  await t.expect(bodyBackground()).eql('rgb(0, 255, 0)')
})

fixture('Toggle completed').page(PAGE)

test('marks a todo as completed', async t => {
  await addTodo(t, 'Finish me')
  await t.click('.toggle-btn')
  await t
    .expect(todoItems.nth(0).hasClass('completed')).ok()
    .expect(Selector('.toggle-btn').innerText).eql('Undo')
})

test('undo reopens a completed todo', async t => {
  await addTodo(t, 'Finish me')
  await t.click('.toggle-btn').click('.toggle-btn')
  await t
    .expect(todoItems.nth(0).hasClass('completed')).notOk()
    .expect(Selector('.toggle-btn').innerText).eql('Complete')
})