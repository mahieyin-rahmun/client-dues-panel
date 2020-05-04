// login form
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase'; // for authentication
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlertMessage from '../layouts/AlertMessage';

import notifyUser from '../../store/actions/action-creators/NotifyUser';

import OAuthProvider from '../auth/OAuthProvider';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: ""
		};

		this.onChange = this.onChange.bind(this);
		this.onLoginCredentialsSubmitted = this.onLoginCredentialsSubmitted.bind(this);
	}

	onLoginCredentialsSubmitted(event) {
		event.preventDefault();

		let { firebase } = this.props;
		let { email, password } = this.state;

		firebase.login({
			email,
			password
		})
			.then((res) => {
				this.props.notifyUser({
					messageType: "success",
					body: ""
				});
			})
			.catch((err) => {
				this.props.notifyUser({
					messageType: "error",
					body: err.message
				});
			});
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-6 mx-auto">
					<div className="card">
						<div className="card-body">
							<h1 className="text-center pb-4 pt-3">
								<span className="text-primary">
									<FontAwesomeIcon icon="lock" className="mr-3" />
									Login
								</span>
							</h1>
							{
								this.props.notify.message && this.props.notify.message.messageType === "error" ? (
									<AlertMessage className="alert alert-danger" message={this.props.notify.message.body} />
								) : null
							}
							<form onSubmit={this.onLoginCredentialsSubmitted}>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input type="email" name="email" className="form-control" onChange={this.onChange} required/>
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input type="password" name="password" className="form-control" onChange={this.onChange} required/>
								</div>
								<input type="submit" value="Login" className="btn btn-primary btn-large btn-block"/>
							</form>
							<OAuthProvider />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const matchStateToProps = (state, props) => ({
	notify: state.notify
});

export default compose(
	firebaseConnect(),
	connect(matchStateToProps, { notifyUser })
)(Login);
