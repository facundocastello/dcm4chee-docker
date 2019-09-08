import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import SamplesComponent from './components/SamplesComponent';

import store from './store';
import './App.scss';
import Errors from './components/Errors';

  axios.defaults.headers.common['Content-Type'] ='application/x-www-form-urlencoded';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <div className='align-items-center d-flex justify-content-between px-5 w-100 bg-success'>
              <h1 className='mb-0'>Header</h1>
              <div className='d-flex font-weight-bold w-50 justify-content-around'>
                <Link to='/'>Bovines</Link>
              </div>
              <div>Users</div>
            </div>
            <Errors />
            <Route path='/' component={SamplesComponent} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
