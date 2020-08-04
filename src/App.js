import React from 'react';
import logo from './logo.svg';
import PaypalCheckoutButton from './components/PaypalCheckoutButton';
import './App.css';

function App() {

  // esta es la orden que se genera en la app real y se envia al componente
  const order = {
    customer: '123456', // id del cliente
    total: '50.00',     // total de la transaccion de todos los productos seleccinados
    items: [
      {
        sku: '112',           // id del producto
        name: 'Producto #1',  // nombre del producto
        price: '10.00',       // precio del producto
        quantity: 1,          // cantidad de productos
        currency: 'EUR'       // moneda
      },
      {
        sku: '113',           // id del producto
        name: 'Producto #2',  // nombre del producto
        price: '20.00',       // precio del producto
        quantity: 2,          // cantidad de productos
        currency: 'EUR'       // moneda
      },
    ]
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <PaypalCheckoutButton order={order} />

      </header>
    </div>
  );
}

export default App;
