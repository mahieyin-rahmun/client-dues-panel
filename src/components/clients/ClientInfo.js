import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import AlertMessages from '../layouts/AlertMessage';
import { Link } from 'react-router-dom';
import * as AppRoutes from "../routes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ClientInfo extends Component {
	render() {
		if (this.props.client) {
			return (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to={AppRoutes.DASHBOARD}>
								<FontAwesomeIcon icon="arrow-circle-left"></FontAwesomeIcon>
								{' '} Back to Dashboard
                    </Link>
						</div>
					</div>

					<hr />
					<div className="card-header text-muted rounded">
						Client ID: {this.props.client.id}
					</div>

					<div className="card">
						<h3 className="card-header">
							{this.props.client.firstName} {this.props.client.lastName}
						</h3>
						<div className="card-body">
							<div>Email Address: {this.props.client.email}</div>
						</div>
						<div className="card-body">
							<div>Phone Number: {this.props.client.phone}</div>
						</div>
					</div>
					<div className="card-footer text-muted">
						Due Amount: $<span className={this.props.client.due > 0 ? "text-danger" : "text-success"}>
							{parseFloat(this.props.client.due).toFixed(2)}
						</span>
					</div>					
				</div>
			);
		} else {
			return (
				<div>
					<AlertMessages className="alert alert-info" message="Fetching data..."></AlertMessages>
				</div>
			);
		}
	}
}

// store by client-clientID prop so that data lag does not occur
const matchStateToProps = (state, props) => ({
	client: state.firestore.ordered[`client-${props.match.params.id}`] &&
		state.firestore.ordered[`client-${props.match.params.id}`][0]
});

export default compose(
	firestoreConnect(props => [
		{
			collection: "clients",
			storeAs: `client-${props.match.params.id}`,
			doc: props.match.params.id,
		}
	]),
	connect(matchStateToProps)
)(ClientInfo);