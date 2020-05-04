import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'; // the core library
import { fab, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';    // the icon library
import {
  faHamburger, faPlus, faUsers, faArrowCircleRight,
  faArrowCircleLeft, faSpinner, faPen, faLock, faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

import * as AppRoutes from "./components/routes";
import AppNavBar from "./components/layouts/AppNavBar";
import Dashboard from "./components/layouts/Dashboard";
import AddClientForm from "./components/clients/AddClientForm";
import ClientInfo from './components/clients/ClientInfo';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/AuthHelper';

library.add(fab, faHamburger, faPlus, faUsers,
  faArrowCircleRight, faArrowCircleLeft, faSpinner,
  faPen, faLock, faSignInAlt, faGoogle, faGithub);

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ "minWidth": "390px" }}>
          <AppNavBar />
          <div className="container container-fluid">
            <Switch>
              <Route exact path={AppRoutes.HOME} component={UserIsAuthenticated(Dashboard)} />
              <Route exact path={AppRoutes.DASHBOARD} component={UserIsAuthenticated(Dashboard)} />
              <Route exact path={AppRoutes.ADD_CLIENT} component={UserIsAuthenticated(AddClientForm)} />
              <Route exact path={AppRoutes.INDIVIDUAL_CLIENT_ROUTE_ID_PARAM} component={UserIsAuthenticated(ClientInfo)} />
              <Route exact path={AppRoutes.LOGIN} component={UserIsNotAuthenticated(Login)} />
              <Route exact path={AppRoutes.REGISTER} component={UserIsNotAuthenticated(Register)} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}


export default App;
