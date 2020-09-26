import { computed, observable } from "mobx"
import RootStore from "../../root-store"

let runningID = 0

export default class User {
    id: number

    @observable
    name: string

    private rootStore: RootStore

    constructor(name: string, rootStore: RootStore) {
        this.id = runningID++
        this.name = name
        this.rootStore = rootStore

        rootStore.dataStores.todoStore.addTodo('Finish the Course!', this.id)
    }

    @computed
    get todos() {
        return this.rootStore.dataStores.todoStore.getUserTodos(this.id)
    }
}