import { observable, autorun, action, when, computed } from "mobx";

interface IPerson {
    firstName: string;
    lastName: string;
}

// const waitForPromise = async () =>
//     new Promise((resolve) => setTimeout(resolve, 1000));

class Person {
    @observable
    firstName: string = "Mobx";

    @observable
    lastName: string = "React";

    @observable
    age: number = 20;

    @observable
    isAlive: boolean = true;

    @observable
    dollars: number = 5;

    constructor(props: IPerson) {
        Object.assign(this, props);

        when(
            () => this.age > 99,
            () => this.bury()
        );
    }

    @action
    bury() {
        this.isAlive = false;
    }

    @action
    setAge(age: number) {
        this.age = age;
    }

    @action
    updateFullName(fname: string, lname: string) {
        this.firstName = fname;
        this.lastName = lname;
    }

    @action
    withdrawal() {
        this.dollars -= 1;
    }

    @computed
    get euros() {
        console.log(`Calculating Euros!`);
        return this.dollars * 2;
    }
}

const ourPerson = new Person({
    firstName: "Mobx",
    lastName: "React"
});

autorun(async () => {
    // await waitForPromise
    console.log(ourPerson.dollars);
});

ourPerson.withdrawal();
ourPerson.withdrawal();
