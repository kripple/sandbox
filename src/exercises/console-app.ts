import readline from 'readline';

// A todo list is an unordered list of items where each item has a string
// id and a string value.
type Todos = {
  [id: string]: string;
};
const todos: Todos = {};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Modify Todo:
//     m <id> - <todo value>
//     Modifies an existing todo value or creates a new todo if no value exists for
//     the given id.
//     Note: everything after the ' - ' is the todo value excluding the first space.
export function createOrModify(input?: string) {
  if (input === undefined) return todos; // fail silently
  const [id, value] = input.split(' - ');
  todos[id] = value;
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
  const format = ([id, value]: [id: string, value: string]) =>
    `${id} - ${value}`;

  if (id === undefined) {
    Object.entries(todos).forEach((todo) => {
      console.log(format(todo));
    });
  } else if (id in todos) {
    console.log(format([id, todos[id]]));
  } else {
    console.log(`no todo for id '${id}'`);
  }
}

// Delete Todo:
//     d <id>
//     Deletes the item
export function deleteTodo(id?: string) {
  id !== undefined && delete todos[id];
  return todos;
}

// Quit:
//     q
//     Quits the program
export function quitTheProgram() {
  rl.close();
  console.log('\nExited Successfully!\n');
}

const commands = {
  m: { action: createOrModify, label: 'modify/create todo' },
  p: { action: printTodo, label: 'print todo(s)' },
  d: { action: deleteTodo, label: 'delete todo' },
  q: { action: quitTheProgram, label: 'quit' },
} as const;

function listenForNextCommand() {
  rl.question('\nPlease enter a command:\n> ', (input) => {
    if (input.length < 1) {
      console.warn(`invalid input '${input}'`);
    }
    const command = input[0];
    const unsupportedCommand = !(command in commands);

    if (command === 'q' || unsupportedCommand) {
      if (unsupportedCommand) console.warn(`unsupported command '${command}'`);
      quitTheProgram();
    } else {
      const props = input.length > 2 ? input.substring(2) : undefined;
      commands[command as keyof typeof commands].action(props);
      listenForNextCommand();
    }
  });
}

// Create a console application that allows the user to manage a todo list.
// A todo list is an unordered list of items where each item has a string
// id and a string value. For purposes of this exercise the todo list does not
// need to be persisted after program exit.
listenForNextCommand();
