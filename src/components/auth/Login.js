import React, { Component } from 'react';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase'; // for authentication
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
			.then((res) => console.log(res.user.user.uid))
			.catch((err) => alert(err.message));
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
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default firebaseConnect()(Login);
