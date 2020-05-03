import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as AppRoutes from "../routes";

class AppNavBar extends Component {
	render() {
		return (
			<nav className="navbar-expand-md navbar navbar-dark bg-primary mb-4">
				<div className="container">
					<Link to={AppRoutes.HOME} className="navbar-brand">Client Dues Panel</Link>

					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain">
						<span className="navbar-toggler-icon">
							<FontAwesomeIcon icon="hamburger" />
						</span>
					</button>

					<div className="collapse navbar-collapse" id="navbarMain">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<Link to={AppRoutes.DASHBOARD} className="nav-link"> Dashboard </Link>
							</li>

							<li className="nav-item">
								<Link to={AppRoutes.ADD_CLIENT} className="nav-link"> Add Client </Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}


export default AppNavBar;