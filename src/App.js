import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'; // the core library
import { fab } from '@fortawesome/free-brands-svg-icons';    // the icon library
import { faHamburger, faPlus, faUsers, faArrowCircleRight, faArrowCircleLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';

import * as AppRoutes from "./components/routes";
import AppNavBar from "./components/layouts/AppNavBar";
import Dashboard from "./components/layouts/Dashboard";
import AddClientForm from "./components/clients/AddClientForm";
import ClientInfo from './components/clients/ClientInfo';

library.add(fab, faHamburger, faPlus, faUsers, faArrowCircleRight, faArrowCircleLeft,faSpinner);

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ "minWidth": "390px"}}>
          <AppNavBar />
          <div className="container container-fluid">
            <Switch>
              <Route exact path={AppRoutes.DASHBOARD} component={Dashboard} />
              <Route exact path={AppRoutes.ADD_CLIENT} component={AddClientForm} />
              <Route exact path={AppRoutes.INDIVIDUAL_CLIENT_ROUTE_ID_PARAM} component={ClientInfo} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}


export default App;
