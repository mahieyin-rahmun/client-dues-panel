import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as AppRoutes from "../routes";
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import logoutCleanup from '../../store/actions/action-creators/LogoutAction';

class AppNavBar extends Component {
	constructor() {
		super();
		this.state = {
			isAuthenticated: false
		};

		this.onLogoutClick = this.onLogoutClick.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		const { auth } = props;

		if (auth.uid) {
			return { isAuthenticated: true };
		}

		return { isAuthenticated: false };
	}

	onLogoutClick(event) {
		event.preventDefault();

		const { firebase } = this.props;
		firebase.logout();
		this.props.logoutCleanup();
	}

	render() {
		const { isAuthenticated } = this.state;
		const { auth } = this.props;

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
						{
							isAuthenticated ? (
								<ul className="navbar-nav">
									<li className="nav-item">
										<Link to={AppRoutes.DASHBOARD} className="nav-link"> Dashboard </Link>
									</li>
									<li className="nav-item">
										<Link to={AppRoutes.ADD_CLIENT} className="nav-link"> Add Client </Link>
									</li>
								</ul>) : null
						}
						{
							isAuthenticated ? (
								<ul className="navbar-nav ml-auto">
									<li className="nav-item">
										<a href="#!"
											className="nav-link disabled font-weight-bold"
										>Welcome, {auth.email}</a>
									</li>
									<li className="nav-item">
										<a href="#!" className="nav-link font-weight-bold" onClick={this.onLogoutClick}>Logout</a>
									</li>
								</ul>
							) : null
						}
						
						{
							!isAuthenticated ? (
								<ul className="navbar-nav mr-auto">
									<li className="nav-item">
										<Link to={AppRoutes.LOGIN} className="nav-link">Login</Link>
									</li>
									<li className="nav-item">
										<Link to={AppRoutes.REGISTER} className="nav-link">Register</Link>
									</li>
								</ul>
							) : null
						}

					</div>
				</div>
			</nav>
		)
	}
}

const matchStateToProp = (state, prop) => ({
	auth: state.firebase.auth
});


export default compose(
	firebaseConnect(),
	connect(matchStateToProp, { logoutCleanup })
)(AppNavBar);