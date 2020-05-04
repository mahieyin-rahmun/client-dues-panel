import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

import * as AppRoutes from "../routes";
import { compose } from 'redux';
import { connect } from 'react-redux';


class AddClientForm extends Component {
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			due: 0,
			dueDate: new Date()
		}

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this);
		this.onCalendarDatePicked = this.onCalendarDatePicked.bind(this);
	}

	onCalendarDatePicked(date) {
		this.setState({
			...this.state,
			dueDate: date
		});
	}

	onChangeHandler(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	onFormSubmitHandler(event) {
		event.preventDefault();

		let newClient = this.state;

		let { firestore, history, uid } = this.props;

		newClient.userId = uid;

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

				<hr />

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
							<div className="form-group">
								<label htmlFor="dueDate">Due Date</label>
								<Calendar className="Calendar mt-3 mb-3" onChange={this.onCalendarDatePicked} />
							</div>
							<input type="submit" className="btn btn-secondary btn-large btn-block" value="Create New Client" />
						</form>
					</div>
				</div>
			</div>
		)
	}
}

const matchStateToProps = (state, props) => ({
	uid: state.firebase.auth.uid
})

export default compose(
	firestoreConnect(),
	firebaseConnect(),
	connect(matchStateToProps)
)(AddClientForm);