import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import AlertMessage from '../layouts/AlertMessage';

import notifyUser from '../../store/actions/action-creators/NotifyUser';

import OAuthProvider from '../auth/OAuthProvider'


class Register extends Component {
	constructor() {
		super();
		this.state = {
			formData: {
				email: "",
				password: "",
				confirmPassword: ""
			},
			ui: {
				submitButtonHasBeenClicked: false
			}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
		this.onRegistrationCredentialsSubmitted = this.onRegistrationCredentialsSubmitted.bind(this);
		this.toggleSubmitButtonClickedStatus = this.toggleSubmitButtonClickedStatus.bind(this);
	}

	onChange(event) {
		this.setState({
			...this.state,
			formData: {
				...this.state.formData,
				[event.target.name]: event.target.value
			}	
		});
	}

	toggleSubmitButtonClickedStatus() {
		this.setState({
			...this.state,
			ui: !this.state.ui.submitButtonHasBeenClicked
		});
	}

	onSubmitButtonClick(event) {
		this.toggleSubmitButtonClickedStatus();
	}

	onRegistrationCredentialsSubmitted(event) {
		event.preventDefault();

		const { firebase } = this.props;
		const { email, password, confirmPassword } = this.state.formData;

		if (password !== confirmPassword) {
			this.props.notifyUser({
				messageType: "error",
				body: "Passwords do not match"
			});

			this.toggleSubmitButtonClickedStatus();
		} else {
				firebase.createUser({
				email,
				password
			}).then((res) => {
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

				this.toggleSubmitButtonClickedStatus();
			});
		}
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-6 mx-auto">
					<div className="card">
						<div className="card-body">
							<h1 className="text-center pb-4 pt-3">
								<span className="text-primary">
									<FontAwesomeIcon icon="sign-in-alt" className="mr-3" />
									Register
								</span>
							</h1>
							{
								this.props.notify.message && this.props.notify.message.messageType === "error" ? (
									<AlertMessage className="alert alert-danger" message={this.props.notify.message.body} />
								) : null
							}
							<form onSubmit={this.onRegistrationCredentialsSubmitted}>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input type="email" name="email" className="form-control" onChange={this.onChange} required />
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input type="password" name="password" className="form-control" onChange={this.onChange} required />
								</div>
								<div className="form-group">
									<label htmlFor="confirmPassword">Confirm Password</label>
									<input type="password" name="confirmPassword" className="form-control" onChange={this.onChange} required />
								</div>
								<input
									type="submit"
									value="Register"
									className={this.state.ui.submitButtonHasBeenClicked ? "btn btn-primary btn-large btn-block disabled" : "btn btn-primary btn-large btn-block"}
									onClick={this.onSubmitButtonClick}
								/>
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
)(Register);