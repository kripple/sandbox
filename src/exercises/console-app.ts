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
export function createOrModify(input?: string) {
  if (input === undefined) return todos; // fail silently
  const [id, value] = input.split(' - ');
  const currentTodo = todos.filter((t) => t.id === id)?.[0];
  if (!currentTodo) {
    todos.push({ id, value });
  } else {
    console.log('modify!');
    todos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          id,
          value,
        };
      }
      return todo;
    });
  }
  return todos;
}

// Print Todo(s):
//     p <id>
//     Print a todo specified by id, format: <id> - <todo>
//     The p command without an id will print all todos in the format: <id> - <todo>
//     Note: the print order does not matter
export function printTodo(id: string): void;
export function printTodo(): void;
export function printTodo(id?: string | undefined): void {
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

// Delete Todo:
//     d <id>
//     Deletes the item
export function deleteTodo(id?: string) {
  if (id === undefined) return; // fail silently
  todos = todos.filter((todo) => todo.id !== id);
  return todos;
}

// Quit:
//     q
//     Quits the program
export function quitTheProgram() {}

// Create a console application that allows the user to manage a todo list.
// A todo list is an unordered list of items where each item has a string
// id and a string value. For purposes of this exercise the todo list does not
// need to be persisted after program exit.
export function commandHandler(command: string, input?: string) {
  const commands = {
    m: { action: createOrModify, label: 'modify/create todo' },
    p: { action: printTodo, label: 'print todo(s)' },
    d: { action: deleteTodo, label: 'delete todo' },
    q: { action: quitTheProgram, label: 'quit' },
  } as const;

  if (command in commands) {
    commands[command as keyof typeof commands].action(input);
  } else {
    console.warn(`unsupported command '${command}'`);
  }
}
