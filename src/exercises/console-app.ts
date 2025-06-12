// A todo list is an unordered list of items where each item has a string
// id and a string value.
type Todo = {
  id: string;
  value: string;
};
let todos: Todo[] = [];

// Modify Todo:
//     m <id> - <todo value>
//     Modifies an existing todo value or creates a new todo if no value exists for
//     the given id.
//     Note: everything after the ' - ' is the todo value excluding the first space.
function createOrModify(input: string) {
  const [id, value]  = input.split(' - ');
  const currentTodo = todos.filter((t) => t.id === id)?.[0];
  if (!currentTodo) {
    todos.push({id, value});
  } else {
    console.log('modify!')
    todos = todos.map((todo) => {
      if(todo.id === id) {
        return {
          id, value
        };
      }
      return todo;
    });
  }
  return todos;
}

// m foo - wash the dishes
// const input = 'foo - wash the dishes';
// const actual = createOrModify(input);
// const expected = [{id: 'foo', value: 'wash the dishes'}];
createOrModify('foo - wash the dishes');
createOrModify('baz - write more todos');
console.log(createOrModify('foo - wash the dishes again'));


function printTodo(id: string): void;
function printTodo(): void;
// Print Todo(s):
//     p <id>
//     Print a todo specified by id, format: <id> - <todo>
function printTodo(id?: string | undefined): void {
  const format = (todo: Todo) => `${todo.id} - ${todo.value}`;
  if (id) {
    const currentTodo = todos.filter((t) => t.id === id)?.[0];
    if (currentTodo) {
      console.log(format(currentTodo));
    } else {
      console.log(`no todo for id '${id}'`);
    }
  } else {
    todos.forEach((t) => {
      console.log(format(t));
    });
  }
}
printTodo('foo');
printTodo('bar');

//     p
//     The p command without an id will print all todos in the format: <id> - <todo>
//     Note: the print order does not matter
// function printTodo() {}
console.log('printing all todos: ');
printTodo();

// Delete Todo:
//     d <id>
//     Deletes the item
function deleteTodo(id: string) {
  todos = todos.filter((todo) => todo.id !== id);
}
deleteTodo('baz');
printTodo();

// Quit:
//     q
//     Quits the program
function quitTheProgram() {}




// Your last Plain Text code is saved below:
// Create a console application that allows the user to manage a todo list.
// A todo list is an unordered list of items where each item has a string
// id and a string value. For purposes of this exercise the todo list does not
// need to be persisted after program exit.


// The following commands are supported:
// - modify/create todo
// - print todo(s)
// - delete todo
// - quit

// ========================================================================

// Commands:

// Modify Todo:
//     m <id> - <todo value>
//     Modifies an existing todo value or creates a new todo if no value exists for
//     the given id.
//     Note: everything after the ' - ' is the todo value excluding the first space.

// Print Todo(s):
//     p <id>
//     Print a todo specified by id, format: <id> - <todo>

//     p
//     The p command without an id will print all todos in the format: <id> - <todo>
//     Note: the print order does not matter

// Delete Todo:
//     d <id>
//     Deletes the item

// Quit:
//     q
//     Quits the program


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
