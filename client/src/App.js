import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';

// import './App.css';
import './styles/Auth.css';
import './styles/orders.css';


import Header from './containers/Header';
import Register from './containers/Register';
import Home from './containers/Home';

import OrderComponent from './components/OrderComponent';
import OrdersComponent from './components/OrdersComponent';



class App extends Component {
  constructor(props) {
    super(props);  //This function is to get all the properties to our component from Component that we inherit from.
    this.state = {
      loggedIn: false
    };
  }
  /*
    1. Mount methods.
      a) ComponentWillMount
      b) ComponentDidMount
  */
  // componentDidMount() {
  //   axios.get('/check')
  //       .then(data => {
  //         store.dispatch(loginAction());
  //       })
  //       .catch(error => {
  //         console.log(error.response)
  //     });
  // };

  
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/orders" component={OrdersComponent} />
        <Route exact path="/orders/:orderId" component={OrderComponent} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Register} />
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}

export default App;
