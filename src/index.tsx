import React from 'react';
import ReactDOM from 'react-dom';
// import RootStore from './stores/root-store'
// import Todo from './stores/data/todos/todo'
import './index.css';
import App from './App';

// import 'mobx-react-lite/batchingForReactDom'
// import TestComponent from './test';
import { createStore } from './stores/helpers/create-store'
import { StoreProvider } from './stores/helpers/store-context';

// const rootStore = new RootStore()

// const newUser = rootStore.dataStores.usersStore.getUser('Douglas')

// rootStore.dataStores.todoStore.addTodo('Finish The Exercise', newUser.id)
// rootStore.dataStores.todoStore.addTodo('Learn MobX!', newUser.id)

// console.log(`${newUser.name} Todos: ${newUser.todos.map((todo: Todo) => todo.name)}`)

// rootStore.dataStores.usersStore.removeUser('Douglas')

// console.log(rootStore)

const rootStore = createStore()

rootStore.dataStores.usersStore.addUser('Douglas')
rootStore.dataStores.usersStore.addUser('Student 1')
rootStore.dataStores.usersStore.addUser('Student 2')
rootStore.dataStores.usersStore.addUser('Student 3')


ReactDOM.render(
  <React.StrictMode>
    <StoreProvider value={rootStore}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
