import React from 'react';
import ReactDOM from 'react-dom';
import RootStore from './stores/root-store'
import Todo from './stores/data/todos/todo'
import './index.css';
import App from './App';

const rootStore = new RootStore()
rootStore.dataStores.usersStore.addUser('Douglas')
rootStore.dataStores.usersStore.addUser('Student 1')
rootStore.dataStores.usersStore.addUser('Student 2')
rootStore.dataStores.usersStore.addUser('Student 3')

const newUser = rootStore.dataStores.usersStore.getUser('Douglas')

rootStore.dataStores.todoStore.addTodo('Finish The Exercise', newUser.id)
rootStore.dataStores.todoStore.addTodo('Learn MobX!', newUser.id)

console.log(`${newUser.name} Todos: ${newUser.todos.map((todo: Todo) => todo.name)}`)

rootStore.dataStores.usersStore.removeUser('Douglas')

console.log(rootStore)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
