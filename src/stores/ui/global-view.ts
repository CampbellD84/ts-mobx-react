import { autorun, computed } from "mobx";
import User from "../data/users/user";
import RootStore from "../root-store";

export default class GlobalView {
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        autorun(() => console.log(this.stats))
    }

    @computed
    get stats() {
        return `
        User Names ${this.rootStore.dataStores.usersStore.users.map((user: User) => user.name)},
        Total Todos: ${this.rootStore.dataStores.todoStore.todoList.length}`
    }
}
