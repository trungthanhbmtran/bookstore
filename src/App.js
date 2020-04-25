import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Detail from './pages/Detail';
import Checkout from './pages/Checkout';
import OrderReceived  from './pages/OrderReceived';
import { ProductsProvider } from './contexts/ProductsContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { OrderProvider } from './contexts/OrderContext';
import Alert from './components/Alert';
import AuthenticatedComponent from './components/AuthenticatedComponent';
import './App.css';
import TopMenu from './components/TopMenu';

const stripePromise = loadStripe('pk_test_UveTYJMSFhA9nBMhfj2AE6K600nYtR677m');

class App extends React.Component {
  render() {
    return(  
      <Router> 
        <ProductsProvider>
          <CartProvider>
            <AuthProvider>
              <OrderProvider>
                <div className="App">
                  <Alert />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/product/:title" component={Detail} />
                    <AuthenticatedComponent>
                      <TopMenu {...this.props}/>
                      <Elements stripe={stripePromise}>
                        <Route exact path="/checkout" component={Checkout} />
                      </Elements>
                      <Route exact path="/order-received/:id" component={OrderReceived} />
                    </AuthenticatedComponent>
                  </Switch>
                </div>
              </OrderProvider>
            </AuthProvider>
          </CartProvider>
        </ProductsProvider>
      </Router>
    )
  }
}

export default App;
