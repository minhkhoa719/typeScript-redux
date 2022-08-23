import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import Cart from './Cart/Cart';
import ProductsForm from './Products/ProductsForm';
import ProductsList from './Products/ProductsList';
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <ProductsList />
      <ProductsForm />
      <Cart />
    </div>
    </Provider>
  );
}

export default App;
