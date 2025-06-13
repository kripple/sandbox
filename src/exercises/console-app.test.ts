import { expect, test } from '@playwright/test';

import { createOrModify, deleteTodo } from '@/exercises/console-app';

// const inputSequence = [
//   { input: 'm foo - wash the dishes' },
//   { input: 'p foo', output: ['foo - wash the dishes'] },
//   { input: 'm foo - wash the dishes with hot water' },

//   { input: 'p foo', output: ['foo - wash the dishes with hot water'] },
//   { input: 'm bar - do the laundry' },
//   {
//     input: 'p',
//     output: ['foo - wash the dishes with hot water', 'bar - do the laundry'],
//   },
//   { input: 'd foo' },
//   {
//     input: 'p',
//     output: ['bar - do the laundry'],
//   },
//   { input: 'q', output: ['Exited Successfully!'] },
// ];

test.describe('console-app', () => {
  test('create todo', () => {
    createOrModify('foo - wash the dishes');
    const todos = createOrModify('baz - write more todos');
    expect(todos).toEqual({ foo: 'wash the dishes', baz: 'write more todos' });
  });

  test('modify todo', () => {
    createOrModify('foo - wash the dishes');
    createOrModify('baz - write more todos');
    const todos = createOrModify('foo - wash the dishes again');
    expect(todos).toEqual({
      foo: 'wash the dishes again',
      baz: 'write more todos',
    });
  });

  test('delete todo', () => {
    createOrModify('foo - wash the dishes');
    createOrModify('baz - write more todos');
    const todos = deleteTodo('baz');
    expect(todos).toEqual({ foo: 'wash the dishes' });
  });

  test.skip('console app responds correctly to command sequence', async () => {});
});
