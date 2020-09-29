import { action, observable, reaction } from 'mobx'
import TodoStore from './todo-store';

let runningID = 0

export default class Todo {
    id: number;

    userID: number

    @observable
    name: string;

    @observable
    isCompleted: boolean = false;

    private readonly disposer: () => void;
    private store: TodoStore

    constructor(name: string, userID: number, store: TodoStore) {
        this.store = store
        this.id = runningID++
        this.name = name;
        this.userID = userID

        this.disposer = reaction(
            () => this.isCompleted,
            () =>
                console.log(
                    `Todo: ${this.name} changed to ${this.isCompleted ? "Done" : "Incomplete"
                    }`
                )
        );
    }

    remove() {
        this.store.removeTodo(this.name)
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
