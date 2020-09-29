import { action, computed, observable } from "mobx";
import RootStore from "../../root-store";
import Todo from "./todo";

export default class TodoStore {
    @observable
    todoList: Todo[] = [];

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        // reaction(
        //     () => this.todoList.length,
        //     () => console.log(`Current Todo Count: ${this.todoList.length}, Done Todos: ${this.completeTodos}, Incomplete Todos ${this.incompleteTodos}`)
        // )

        // reaction, when 

        // when(
        //     () => this.todoList.length > 0 && this.todoList.every(todo => todo.isCompleted),
        //     () => console.log(`Congrats!`)
        // )
    }

    @action
    addTodo(name: string, userID: number) {
        this.todoList.push(new Todo(name, userID, this));
    }

    getUserTodos(userID: number) {
        return this.todoList.filter(todo => todo.userID === userID)
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
        return this.todoList.filter((todo) => todo.isCompleted);
    }

    @computed
    get incompleteTodos() {
        return this.todoList.filter((todo) => !todo.isCompleted);
    }
}
