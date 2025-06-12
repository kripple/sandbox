import { expect, test } from '@playwright/test';

import {
  commandHandler,
  createOrModify,
  deleteTodo,
  printTodo,
} from '@/exercises/console-app';

// ========================================================================

// EXAMPLES:

//     Please enter a command:
//     > m foo - wash the dishes

//     Please enter a command:
//     > p foo
//     foo - wash the dishes

//     Please enter a command:
//     > m foo - wash the dishes with hot water

//     Please enter a command:
//     > p foo
//     foo - wash the dishes with hot water

//     Please enter a command:
//     > m bar - do the laundry

//     Please enter a command:
//     > p
//     foo - wash the dishes with hot water
//     bar - do the laundry

//     Please enter a command:
//     > d foo

//     Please enter a command:
//     > p
//     bar - do the laundry

//     Please enter a command:
//     > q
//     Exited Successfully!

test.describe('console-app', () => {
  test('create todo', () => {
    createOrModify('foo - wash the dishes');
    const todos = createOrModify('baz - write more todos');
    expect(todos).toEqual([
      { id: 'foo', value: 'wash the dishes' },
      { id: 'baz', value: 'write more todos' },
    ]);
  });

  test('modify todo', () => {
    createOrModify('foo - wash the dishes');
    createOrModify('baz - write more todos');
    const todos = createOrModify('foo - wash the dishes again');
    expect(todos).toEqual([
      { id: 'foo', value: 'wash the dishes again' },
      { id: 'baz', value: 'write more todos' },
    ]);
  });

  test('delete todo', () => {
    createOrModify('foo - wash the dishes');
    createOrModify('baz - write more todos');
    const todos = deleteTodo('baz');
    expect(todos).toEqual([{ id: 'foo', value: 'wash the dishes' }]);
  });
});
