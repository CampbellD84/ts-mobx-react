import { action, observable, reaction } from 'mobx'

let runningID = 0

class Todo {
    id: number = runningID++;

    userID: number

    @observable
    name: string;

    @observable
    isCompleted: boolean = false;

    private disposer: () => void;

    constructor(name: string, userID: number) {
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

export default Todo