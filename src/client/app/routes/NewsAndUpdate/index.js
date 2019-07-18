// /**
//  * feedbacks listing component page route
//  */
// import React, { Component } from 'react';
// import { connect }  from 'react-redux';
// import { Row, Col, Card, Input, Button, Table } from 'reactstrap';
// import FontAwesome from 'react-fontawesome';
// import { toast, ToastContainer } from 'react-toastify';
// import {
// 	navigationIndexer,
// 	SERVER_BASE_URL,
// 	APPLICATION_ROUTES,
// 	ADMIN_USER,
// } from '../../constants';
// import LoadingOverlay from '../../components/LoadingOverlay';
// import {
// 	switchNavigation,
// 	genericToggle,
// 	genericCreateEntity,
// 	nullifyError,
// 	nullifySuccess,
// } from '../../redux/actions';
// import './index.scss';

// class NewsAndUpdate extends Component {

// 	constructor(props) {
// 		super(props);

// 	//	this.handlePaginationBack = this.handlePaginationBack.bind(this);
// 	//	this.handlePaginationNext = this.handlePaginationNext.bind(this);
// 		// this.navigate = this.navigate.bind(this);
// 	}

// 	componentWillMount() {
// 		const { triggerSwitchNavigation } = this.props;
// 		triggerSwitchNavigation(navigationIndexer.news);
// 	}

// 	componentDidUpdate() {
// 		document.title = 'NewsAndUpdate';
// 	}

// 	componentDidMount() {
// 		document.title = 'NewsAndUpdate';
// 	}
//     // navigate() {}

// 	render() {
// 		const {
// 			fetching,
// 			newsandupdates: {
// 				error,
// 				success,
// 			},
// 			triggerCreateEntity,
// 			triggerGenericToggle,
// 			triggerNullifyError,
// 			triggerNullifySuccess,
// 		} = this.props;

// 		if (error) {
// 			toast.dismiss();
// 			triggerNullifyError();
// 			toast.error(error);
// 		}
// 		if (success) {
// 			toast.dismiss();
// 			triggerNullifySuccess();
// 			toast.success(success);
// 		}

// 		return <section>
// 			{ LoadingOverlay({ show: fetching }) }
// 			<ToastContainer />
// 			<h2>News And Updates</h2>
//                 <h4>Add News</h4>
//                 <Row className="custum">
//                     <Col sm="5">Text</Col>
//                 </Row>
//                 <Row className="p">
//                     <Col xs="9"><textarea
//                         type="textArea"
//                         name="text"
//                         placeholder="Add text of news"
//                         id="exampleText"
//                         ref={text => this.text = text}
//                     />
//                     </Col>
//                 </Row>
//                 <Row className="custum">
//                     <Col sm="5">Link</Col>
//                 </Row>
//                 <Row className="p">
//                     <Col xs="9"><input
//                         type="text"
//                         name="text"
//                         placeholder="Type your message here"
//                         id="exampleText"
//                         ref={link => this.link = link}
//                     />
//                     </Col>
//                 </Row>
//                 <Row className="p">
//                     <Col xs="2">Picture</Col>
//                     <Col xs="1"><input type="file" onChange={this.onChange} />
//                     </Col>
//                 </Row>
//                 <Row className="p"><Col >
//                     <Button
//                         className='btn btn-sm btn-success'
//                         onClick={() => {
//                           //  e.preventDefault();
//                             const payload = {
//                                 text: this.text.value,
//                                 link: this.link.value,
//                             };
//                             triggerCreateEntity({ payload });
//                         }}>
//                         Create News
// 					</Button>
//                 </Col></Row>
// 			<br />
// 		</section>
// 	}
// }
// // handles the outgoing dispatches

// const mapDispatchToProps = dispatch => {
// 	return {
// 		triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
// 		triggerCreateEntity: ( payload) => dispatch(genericCreateEntity({
// 			payload: { payload: payload},
// 			endpoint: APPLICATION_ROUTES.NEWS_CREATE,
// 		})),
// 		triggerNullifyError: () => dispatch(nullifyError()),
// 		triggerNullifySuccess: () => dispatch(nullifySuccess()),
// 	};
// }

// const mapStateToProps = state => {
// 	const { fetching, newsandupdates } = state;
// 	return { fetching, newsandupdates };
// }
// // handles incoming state changes

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(NewsAndUpdate);



import React, { Component } from 'react';
import { connect } from 'react-redux';
 import { Row, Col, Card, Input, Button } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import {
    navigationIndexer,
    APPLICATION_ROUTES,
} from '../../constants';
import LoadingOverlay from '../../components/LoadingOverlay';
import {
    switchNavigation,
    fetchEntity,
    genericToggle,
    genericCreateEntity,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class NewsAndUpdate extends Component {

    constructor(props) {
        super(props);
        this.handlePaginationBack = this.handlePaginationBack.bind(this);
        this.handlePaginationNext = this.handlePaginationNext.bind(this);
    }

    componentWillMount() {
        const { triggerSwitchNavigation, triggerFetchEntity } = this.props;
        triggerSwitchNavigation(navigationIndexer.newsandupdates);
    }

    componentDidUpdate() {
        document.title = 'newsandupdates';
    }

    componentDidMount() {
        document.title = 'newsandupdates';
    }

	/**
	 * handle the pagination next
	 */
    handlePaginationNext(e) {
        e.preventDefault();
        const { newsandupdates: { page, limit, length }, triggerFetchEntity } = this.props;
        toast.dismiss();
        if (length < limit) {
            // no more data
            toast.info('No more data');
        } else {
            // console.log(`fetch page ${page+1} with ${limit} items`);
            triggerFetchEntity(page + 1, limit);
        }
    }

	/**
	 * handle the pagination
	 * @param {*} e
	 */
    handlePaginationBack(e) {
        e.preventDefault();
        toast.dismiss();
        const { newsandupdates: { length, page, limit }, triggerFetchEntity } = this.props;
        if (page > 1) {
            triggerFetchEntity(page - 1, limit);
        } else {
            toast.info('Cannot go back anymore');
        }
    }

    render() {
        const {
            fetching,
            newsandupdates: {
                error,
                success,
            },
            triggerFetchEntity,
            triggerNullifyError,
            triggerNullifySuccess,
            triggerCreateEntity
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
		<h2>News And Updates</h2>
			<h5>Add News</h5>
			<Row className="custum">
				<Col sm="5">Text</Col>
			</Row>
			<Row className="p">
				<Col xs="12"><textarea
					type="text"
					name="text"
					placeholder="Add text of news"
                    id="exampleText"
					ref={text => this.text = text}
				/>
				</Col>
			</Row>
			<Row className="custum">
				<Col sm="5">Link</Col>
			</Row>
			<Row className="p">
				<Col xs="9"><input
					type="text"
					name="text"
					placeholder="Type your message here"
                    id="exampleText"
					ref={link => this.link = link}
				/>
				</Col>
			</Row>
			<Row className="p">
				<Col xs="2">Picture</Col>
			</Row>
			<Row className="p">
				<Col xs="1"><input type='file' onChange={({target}) => {
												if (target.file) {
													selectedImage = target.file;
												}
											}} accept='image/*'/>
				</Col>
			</Row>
			<Row className="p"><Col >
				<Button
					className='btn btn-sm btn-success'
					onClick={() => {
                      //  e.preventDefault();
                      const im = { i: this.selectedImage};
						const payload = {
							text: this.text.value,
							link: this.link.value,
						};
						triggerCreateEntity({ payload , im});
					}}>
					Create News
				</Button>
			</Col></Row>
		<br />
	</section>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerCreateEntity: ({ page = 1, limit = 30, payload, im }) => dispatch(genericCreateEntity({
            page,
            limit,
          // picture : { im },
            payload,
            endpoint: APPLICATION_ROUTES.NEWS_CREATE,
          // multipart : true,

        })),
        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
    };
}

const mapStateToProps = state => {
    const { fetching, newsandupdates } = state;
    return { fetching, newsandupdates };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsAndUpdate);


