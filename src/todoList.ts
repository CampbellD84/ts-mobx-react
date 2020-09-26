import { action, computed, observable, reaction, when } from "mobx";

let runningID = 0;

class Todo {
    id: number = runningID++;

    @observable
    name: string;

    @observable
    isCompleted: boolean = false;

    private disposer: () => void;

    constructor(name: string) {
        this.name = name;

        this.disposer = reaction(
            () => this.isCompleted,
            () =>
                console.log(
                    `Todo: ${this.name} changed to ${this.isCompleted ? "Done" : "Incomplete"
                    }`
                )
        );
    }

    @action
    toggleTodo() {
        this.isCompleted = !this.isCompleted;
    }

    @action
    updateName(name: string) {
        this.name = name;
    }

    dispose() {
        this.disposer();
    }
}

class TodoList {
    @observable
    todoList: Todo[] = [];

    constructor() {
        reaction(
            () => this.todoList.length,
            () =>
                console.log(
                    `Current Todo Count: ${this.todoList.length}, Done Todos: ${this.completeTodos}, Incomplete Todos ${this.incompleteTodos}`
                )
        );

        when(
            () =>
                this.todoList.length > 0 &&
                this.todoList.every((todo) => todo.isCompleted),
            () => console.log(`Congrats!`)
        );
    }

    addTodo(name: string) {
        this.todoList.push(new Todo(name));
    }

    getTodo(name: string) {
        return this.todoList.find((todo) => todo.name === name);
    }

    @action
    removeTodo(name: string) {
        const todoToRemove = this.getTodo(name);

        if (todoToRemove) {
            todoToRemove.dispose();
            const todoToRemoveIdx = this.todoList.indexOf(todoToRemove);
            this.todoList.splice(todoToRemoveIdx, 1);
        }
    }

    @computed
    get completeTodos() {
        return this.todoList.filter((todo) => todo.isCompleted).length;
    }

    @computed
    get incompleteTodos() {
        return this.todoList.filter((todo) => !todo.isCompleted).length;
    }
}

const list = new TodoList();

list.addTodo("Learn MobX");
list.addTodo("Finish Course");
list.addTodo("Build Own App");
list.addTodo("Eat and Sleep");

list.getTodo("Learn MobX")?.toggleTodo();
list.getTodo("Finish Course")?.toggleTodo();
list.getTodo("Build Own App")?.toggleTodo();

list.removeTodo("Eat and Sleep");
