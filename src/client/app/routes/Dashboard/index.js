import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigationIndexer } from '../../constants';
import { switchNavigation } from '../../redux/actions';
import './index.scss';

class Dashboard extends Component {

	constructor() {
		super();
	}

	componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Contact Us';
        triggerSwitchNavigation(navigationIndexer.dashboard);
    }

    componentDidMount() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Contact Us';
        triggerSwitchNavigation(navigationIndexer.dashboard);
    }

	render() {
		return (
			<section>
				<h1>This is the dashboard page.</h1>
			</section>
		);
	}
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
    };
}
const mapStateToProps = state => {
    const { fetching, dashboard } = state;
    return { fetching, dashboard };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);