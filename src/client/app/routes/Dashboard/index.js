import React,  { Component } from 'react';
import {
	CardColumns,
	Card,
	CardBody,
	CardTitle,
	CardText,
} from 'reactstrap';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import LoadingOverlay from '../../components/LoadingOverlay';
import { fetchStatistics } from '../../redux/actions';

import './index.scss';
class Dashboard extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		document.title = 'Dashboard';

		const { fetching, triggerFetchStatistics } = this.props;
		// fetch on mounting or tranistioning among pages
		triggerFetchStatistics();
	}

	componentDidUpdate() {
		document.title = 'Dashboard';
		const { fetching, statistics, triggerFetchStatistics } = this.props;

		// console.log(fetching, statistics, triggerFetchStatistics);
		if (!fetching && !statistics) {
			console.log('stats fetching');
			triggerFetchStatistics();
		}
	}

	render() {
		const { statistics, fetching } = this.props;
		return statistics ? <section className='dashboard-container'>
			{ LoadingOverlay({ show: fetching }) }
			<h2>Dashboard</h2>
			<hr/>
			<CardColumns>
				<Card inverse color="danger">
					<CardBody className='text-center'>
						<CardTitle>Users</CardTitle>
						<CardText>
                            <p>Active</p>
							<h1>
								{statistics.users.active}
							</h1>
                            <p>Deleted</p>
                            <h1>
                            {statistics.users.deleted}
                            </h1>
                            <p>Blocked</p>
                            <h1>
                                {statistics.users.blocked}
                            </h1>
						</CardText>
					</CardBody>
				</Card>
				
				
			</CardColumns>
		</section>:
			fetching ? <p>Loading....</p>: <p>Nothing found.</p>;
	}
};

const mapDispatchToProps = dispatch => {
	return {
		triggerFetchStatistics: () => dispatch(fetchStatistics({})),
	};
};

const mapStateToProps = state => {
	const { fetching, dashboard: { statistics } } = state;
	return { fetching, statistics };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);