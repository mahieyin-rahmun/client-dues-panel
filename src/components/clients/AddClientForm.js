import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firestoreConnect } from 'react-redux-firebase';

import * as AppRoutes from "../routes";


class AddClientForm extends Component {
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			due: 0
		}

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this);
	}

	onChangeHandler(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	onFormSubmitHandler(event) {
		event.preventDefault();
		
		let newClient = this.state;

		let { firestore, history } = this.props;

		if (newClient.due === '') {
			newClient.due = 0;
		}

		firestore.add({ collection: 'clients' }, newClient)
			.then(() => history.push(AppRoutes.DASHBOARD));		
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-6">
						<Link to={AppRoutes.DASHBOARD}>
							<FontAwesomeIcon icon="arrow-circle-left" ></FontAwesomeIcon>
							{' '} Back to Dashboard
                    </Link>
					</div>
				</div>

				<hr/>

				<div className="card">
					<div className="card-header">New Client Form</div>
					<div className="card-body">
						<form onSubmit={this.onFormSubmitHandler}>
							<div className="form-group">
								<label htmlFor="firstName">First Name</label>
								<input type="text"
									className="form-control"
									name="firstName"
									minLength="3"
									required
									value={this.state.firstName}
									onChange={this.onChangeHandler}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="lastName">Last Name</label>
								<input type="text"
									className="form-control"
									name="lastName"
									minLength="3"
									required
									value={this.state.lastName}
									onChange={this.onChangeHandler}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input type="email"
									className="form-control"
									name="email"
									required
									value={this.state.email}
									onChange={this.onChangeHandler}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="phone">Phone</label>
								<input type="text"
									className="form-control"
									name="phone"
									required
									value={this.state.phone}
									onChange={this.onChangeHandler}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="due">Due</label>
								<input type="text"
									className="form-control"
									name="due"
									value={this.state.due}
									onChange={this.onChangeHandler}
								/>
							</div>
							<input type="submit" className="btn btn-secondary btn-large btn-block" value="Create New Client" />
						</form>
					</div>
				</div>
			</div>
		)
	}
}


export default firestoreConnect()(AddClientForm);