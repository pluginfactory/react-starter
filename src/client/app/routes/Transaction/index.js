/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect }  from 'react-redux';
import { Table } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import {
	navigationIndexer,
	SERVER_BASE_URL,
	APPLICATION_ROUTES,
	ADMIN_USER,
} from '../../constants';
import LoadingOverlay from '../../components/LoadingOverlay';
import Pagination from '../../components/Pagination';
import Image from '../../components/Image';
import {
	switchNavigation,
	fetchEntity,
	genericToggle,
	nullifyError,
	nullifySuccess,
} from '../../redux/actions';
import './index.scss';
import { SERVER_IMAGE_URL, } from '../../constants';

class Transaction extends Component {

	constructor(props) {
		super(props);

		this.handlePaginationBack = this.handlePaginationBack.bind(this);
		this.handlePaginationNext = this.handlePaginationNext.bind(this);
		// this.navigate = this.navigate.bind(this);
	}

	componentWillMount() {
		const { triggerSwitchNavigation, triggerFetchEntity } = this.props;
		triggerSwitchNavigation(navigationIndexer.transactions);
		triggerFetchEntity();
	}

	componentDidUpdate() {
		document.title = 'Transaction';
	}

	componentDidMount() {
		document.title = 'Transaction';
	}
    // navigate() {}

	handlePaginationNext(e) {
		e.preventDefault();
		const { transactions: { page, limit, length }, triggerFetchEntity } = this.props;
		toast.dismiss();
		if (length < limit) {
			// no more data
			toast.info('No more data');
		} else {
			// console.log(`fetch page ${page+1} with ${limit} items`);
			triggerFetchEntity(page+1, limit);
		}
	}

	handlePaginationBack(e){
		e.preventDefault();
		toast.dismiss();
		const { transactions: { length, page, limit }, triggerFetchEntity } = this.props;
		if (page > 1) {
			triggerFetchEntity(page-1, limit);
		} else {
			toast.info('Cannot go back anymore');
		}
	}


	render() {
		const {
			fetching,
			transactions: {
				editing,
				data,
				page,
				limit,
				length,
				error,
				success,
			},
			triggerFetchEntity,
			triggerGenericDeleteEntity,
			triggerGenericBlockEntity,
			triggerGenericToggle,
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
			{ LoadingOverlay({ show: fetching }) }
			<ToastContainer />
			<h2>Transaction</h2>
			{Pagination({
				page,
				limit,
				length,
				nextHandler: this.handlePaginationNext,
				previousHander: this.handlePaginationBack,
				alignment: 'text-right'
			})}
			<br />
			<Table responsive striped hover className='application-table' style={{ zoom: 0.8, cursor: 'pointer' }}>
				<thead>
					<tr>
						<th className='first-column'>#</th>
						<th>TransactionId</th>
						<th>Amount</th>
						<th>Receipt</th>
					</tr>
				</thead>
				<tbody className=''>
					{
						data ?
							data.map((transactions, index) => {
								return transactions && transactions && <tr key={`transactions-${limit * (page - 1) + (index + 1)}`}>
									<td>{limit * (page - 1) + (index + 1)}</td>
									<td>{transactions.displayName}</td>
									</tr>
								}
							) :
							<tr>
								<td colSpan="7">No data</td>
							</tr>
					}
				</tbody>
			</Table>
			{Pagination({
				page,
				limit,
				length,
				nextHandler: this.handlePaginationNext,
				previousHander: this.handlePaginationBack,
			})}
		</section>
	}
}
// handles the outgoing dispatches

const mapDispatchToProps = dispatch => {
	return {
		triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
		triggerFetchEntity: (page, limit, payload) => dispatch(fetchEntity({
			payload,
			page,
			limit,
			endpoint: APPLICATION_ROUTES.transactions_LIST,
		})),
		triggerNullifyError: () => dispatch(nullifyError()),
		triggerNullifySuccess: () => dispatch(nullifySuccess()),
	};
}

const mapStateToProps = state => {
	const { fetching, transactions } = state;
	return { fetching, transactions };
}
// handles incoming state changes

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Transaction);
