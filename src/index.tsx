import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from './stores/helpers/create-store'
import { StoreProvider } from './stores/helpers/store-context';


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
