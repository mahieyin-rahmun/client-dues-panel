// oauth buttons

import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import notifyUser from '../../store/actions/action-creators/NotifyUser';

class OAuthProvider extends Component {
	constructor() {
		super();
		this.onOauthProviderButtonClicked = this.onOauthProviderButtonClicked.bind(this);
	}

	onOauthProviderButtonClicked(provider, event) {
		const { firebase } = this.props;

		firebase.login({
			provider: provider,
			type: 'popup'
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
				})
			});
	}

	render() {
		return (
			<div>
				<p className="text mt-4">Alternatively, you can sign in using one of the following providers: </p>
				<button type="submit" className="btn btn-danger btn-large btn-block" onClick={this.onOauthProviderButtonClicked.bind(this, "google")}>
					<FontAwesomeIcon className="mr-3" icon={["fab", "google"]}></FontAwesomeIcon> Sign In With Google
							</button>
				<button type="submit" className="btn btn-secondary btn-large btn-block" onClick={this.onOauthProviderButtonClicked.bind(this, "github")}>
					<FontAwesomeIcon className="mr-3" icon={["fab", "github"]}></FontAwesomeIcon> Sign In With Github
							</button>
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
)(OAuthProvider);