import React, { Component } from 'react'
import * as AppRoutes from "../routes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import AlertMessage from '../layouts/AlertMessage';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import timeConverter from '../../helpers/TimestampToDate'

class Clients extends Component {
	constructor() {
		super();
		this.state = {
			totalOwed: 0
		};
	}

	static getDerivedStateFromProps(props, state) {
		let { clients } = props;

		if (clients) {
			let total = 0;

			for (let i = 0; i < clients.length; i++) {
				total += parseFloat(clients[i].due);
			}

			return {
				totalOwed: parseFloat(total).toFixed(2)
			};
		}

		return null;
	}

	render() {
		if (isLoaded(this.props.clients)) {
			const { clients } = this.props;

			return (
				<div>
					<div className="row">
						<div className="col-md-6">
							<h2> <FontAwesomeIcon icon="users" /> {' '} Clients </h2>
						</div>
						<div className="col-md-6">
							Total Due: <span className="font-weight-bold text-info">${this.state.totalOwed} </span>
						</div>
					</div>
					
					<table className="table table-striped mt-4">
						<thead>
							<tr>
								<th>Name</th>
								<th>Due Date</th>
								<th>Dues</th>
								<th></th>
							</tr>
							</thead>
							<tbody>
								{
									clients.map(client => (
										<tr key={client.id}>
											<td>{client.firstName}{' '}{client.lastName}</td>
											<td>{timeConverter(client.dueDate.seconds)}</td>
											<td className="font-weight-bold">
												{
													parseFloat(client.due).toFixed(2) > 0 ?
														(<div className="text-danger">${parseFloat(client.due).toFixed(2)}</div>) :
														(<div className="text-success">${parseFloat(client.due).toFixed(2)}</div>)
												}
											</td>
											<td>
												<Link
													to={AppRoutes.INDIVIDUAL_CLIENT_ROUTE(client.id)}
													className="btn btn-secondary btn-sm">
													<FontAwesomeIcon icon="arrow-circle-right" /> Details
												</Link>
											</td>
										</tr>
									))
								}
							</tbody>
					</table>
				</div>
			);
		} else {
			return (
				<AlertMessage className="alert alert-info" message="Loading clients list..." />
			);
		}
	}
}

const mapStateToProps = (state, props) => ({
	clients: state.firestore.ordered.clients,
	uid: state.firebase.auth.uid
})

// need to wrap the component with both firestoreConnect and regular connect with mapStateToProps
export default compose(
	connect(mapStateToProps, {}),
	firestoreConnect((props) => {
		// only get due details for the person who added the data
		return [
			{	collection: "clients" },
			{
				collection: "clients",
				orderBy: [
					['dueDate', 'asc']
				],
				where: [
					['userId', '==', props.uid]
				]
			}
		]
	})	
)(Clients);
