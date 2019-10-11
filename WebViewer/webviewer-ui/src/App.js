import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import StudiesComponent from './components/StudiesComponent';

import store from './store';
import './App.scss';
import Errors from './components/Errors';
import ViewerComponent from './components/ViewerComponent';

axios.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <div
              className='d-flex justify-content-center px-5 py-3 w-100 bg-dark'
              style={{ zIndex: 1000, position: 'relative' }}
            >
              <div className='align-items-center d-flex justify-content-between  w-75'>
                <div className='shop-isle-header-title-inner'>
                  <a
                    href='http://medytec.com.ar/'
                    className='logo'
                    rel='home'
                    itemProp='url'
                  >
                    <img
                      width='150'
                      height='18'
                      src='http://medytec.com.ar/wp-content/uploads/2018/02/medytec-logo-transparente-copy-e1508265191815.png'
                      className='custom-logo'
                      alt='Medytec'
                      itemProp='logo'
                    />
                  </a>
                </div>
                <div className='d-flex font-weight-bold w-50 justify-content-around'>
                  <Link to='/'>Studies</Link>
                </div>
                <div className='text-white'>Users</div>
              </div>
            </div>
            <Errors />
            <Route exact path='/' component={StudiesComponent} />
            <Route path='/viewer' component={ViewerComponent} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
