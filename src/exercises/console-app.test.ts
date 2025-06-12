import { expect, test } from '@playwright/test';

import {
  commandHandler,
  createOrModify,
  deleteTodo,
  printTodo,
} from '@/exercises/console-app';

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
});
