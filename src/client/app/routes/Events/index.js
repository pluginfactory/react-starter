/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import CSVReader from 'react-csv-reader';
import { APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import {
	switchNavigation,
	genericCreateEntity,
	nullifyError,
	nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class Events extends Component {

	constructor(props) {
		super(props);

		this.events = [];

		this.prepareBulkCSVData = this.prepareBulkCSVData.bind(this);
	}

	componentDidUpdate() {
		const { triggerSwitchNavigation } = this.props;
		document.title = 'Events';
		triggerSwitchNavigation(navigationIndexer.events);
	}

	componentDidMount() {
		const { triggerSwitchNavigation } = this.props;
		document.title = 'Events';
		triggerSwitchNavigation(navigationIndexer.events);
	}

	prepareBulkCSVData(data) {
		const { props: { triggerGenericCreateEntity } } = this;
		const refactoredRequestData = [];
		const mappings = {
			id: 0,
			teamHome: 1,
			teamAway: 2,
			day: 3,
			month: 4,
			year: 5,
			hours: 6,
			minutes: 7,
			coordinates: 8,
			location: 9,
			name: 10,
			competitionLevel: 11,
			genderOfSport: 12,
			ageGroup: 13,
			webAddress: 14,
			sport: 15,

		}
		data.map((event, index) => {
			if (index) {
				const instance = {};
				Object.keys(mappings).map(key => instance[key] = event[mappings[key]])
				refactoredRequestData.push(instance);
			}
		});
		console.log(refactoredRequestData);
		triggerGenericCreateEntity(refactoredRequestData);
	}

	render() {
		const {
			fetching,
			events: {
				success,
				error,
			},
			triggerNullifyError,
			triggerNullifySuccess,
		} = this.props;

		if (error) {
			toast.dismiss();
			triggerNullifyError();
			toast.error(error);
		}
		if (success) {
			toast.dismiss();
			triggerNullifySuccess();
			toast.success(success);
		}
		return <section>
			<ToastContainer />
			<h2>Events</h2>
			<p>
				<CSVReader
					cssClass='btn app-btn btn-sm'
					onFileLoaded={this.prepareBulkCSVData}
				/>
			</p>
			<br />
			<p><h3>Instructions for events upload</h3>
				<p>Make a csv file in given format</p>
				<Table responsive bordered dark striped>
					<thead>
					<tr>
							<td>index</td>
							<td>teamHome</td>
							<td>teamAway</td>
							<td>day</td>
							<td>month</td>
							<td>year</td>
							<td>hours</td>
							<td>minutes</td>
							<td>coordinates</td>
							<td>location</td>
							<td>name</td>
							<td>competitionLevel
<ul>
									<li>YOUTH: 1</li>
									<li>HIGH: 2</li>
									<li>COLLEGE: 3</li>
									<li>PROFFESSIONAL: 4</li>
								</ul>
							</td>
							<td>genderOfSport
 <ul>
									<li>MALE: 1</li>
									<li>FEMALE: 2</li>
									<li>COED: 3</li>
								</ul>
							</td>
							<td>ageGroup
 <ul>
									<li>    U_17: 1</li>
									<li>U_19: 2</li>
									<li>U_21: 3</li>
								</ul>
							</td>
							<td>webAddress</td>
							<td>sport
 <ul>
									<li>SOCCER: 1</li>
									<li>FOOTBALL: 2</li>
									<li>SOFTBALL: 3</li>
									<li>HANDBALL: 4</li>
									<li>BASKETBALL: 5</li>
								</ul>
							</td>
						</tr>
						<tr>
							<td>1</td>
							<td>delhi</td>
							<td>chandigarh</td>
							<td>1</td>
							<td>1</td>
							<td>2015</td>
							<td>11</td>
							<td>30</td>
							<td>30,40</td>
							<td>delhi</td>
							<td>tup</td>
							<td>1</td>
							<td>1</td>
							<td>2</td>
							<td>www.google</td>
							<td>2</td>
						</tr>
					</thead>
				</Table></p>

		</section>
	}
}

const mapDispatchToProps = dispatch => {
	return {

		triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
		triggerGenericCreateEntity: (events, page, limit) => dispatch(genericCreateEntity({
			payload: { events },
			page,
			limit,
			endpoint: APPLICATION_ROUTES.BULK_UPLOAD,
		})),
		triggerNullifyError: () => dispatch(nullifyError()),
		triggerNullifySuccess: () => dispatch(nullifySuccess()),
	};
}

const mapStateToProps = state => {
	const { fetching, events } = state;
	return { fetching, events };
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Events);
