import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import AlertMessages from '../layouts/AlertMessage';
import { Link } from 'react-router-dom';
import * as AppRoutes from "../routes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ClientInfo extends Component {
	constructor() {
		super();
		this.state = {
			showEditDueForm: false,
			editDueFormData: {
				due: ""
			}
		};

		this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
		this.deleteClientHandler = this.deleteClientHandler.bind(this);
	}

	deleteClientHandler(clientId, event) {
		event.preventDefault();
		
		let { firestore } = this.props;

		firestore.delete({ collection: "clients", doc: clientId })
			.then(() => this.props.history.push(AppRoutes.DASHBOARD));
	}

	onUpdateSubmit(event)	{
		event.preventDefault();

		let { firestore, client } = this.props;
		let { editDueFormData } = this.state;

		const clientDueUpdate = {
			due: parseFloat(editDueFormData.due)
		};

		firestore.update({ collection: "clients", doc: client.id }, clientDueUpdate)			
			.then(() => this.setState({ ...this.state, showEditDueForm: !this.state.showEditDueForm }));
	}

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
						<div className="float-right">
							<input
								type="button"
								value="Delete Client"
								className="btn btn-sm btn-danger"
								onClick={this.deleteClientHandler.bind(this, this.props.client.id)}
							/>
						</div>
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
						Due Amount: $
									<span className={this.props.client.due > 0 ? "text-danger" : "text-success"}>
							{parseFloat(this.props.client.due).toFixed(2)} <FontAwesomeIcon icon="pen"
								onClick={() => this.setState({ ...this.state, showEditDueForm: !this.state.showEditDueForm })}
								style={{ "cursor": "pointer" }}
							/>
						</span>
							{
								this.state.showEditDueForm ? (
									// edit balance form
									<form className="form-inline" onSubmit={this.onUpdateSubmit}>
										<input
											type="text"
											name="updatedDue"
											className="form-control"											
											value={this.state.editDueFormData.due}
											placeholder="Update Due"
											onChange={(event) => this.setState({ ...this.state, editDueFormData: { due: event.target.value } })}
										/>
										<input type="submit" className="btn btn-sm btn-dark ml-3" value="Update Due" />
									</form>
									
								) : ""									
							}
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