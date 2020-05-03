import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'; // the core library
import { fab } from '@fortawesome/free-brands-svg-icons';    // the icon library
import { faHamburger } from '@fortawesome/free-solid-svg-icons';

import AppNavBar from "./components/layouts/AppNavBar";

library.add(fab, faHamburger);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <AppNavBar />
          <div className="container container-fluid">
            <h1>Client Dues Panel</h1>
          </div>
        </div>
      </Router>
    )
  }
}


export default App;
