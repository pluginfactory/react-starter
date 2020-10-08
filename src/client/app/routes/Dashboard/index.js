import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { navigationIndexer } from '../../constants';
import { switchNavigation } from '../../redux/actions';
import './index.scss';


const Dashboard = (props) => {
    useEffect(() => {
        const { triggerSwitchNavigation } = props;
        document.title = 'Contact Us';
        triggerSwitchNavigation(navigationIndexer.dashboard);
    }, [])
    return (
        <section>
            <h1>This is the dashboard page.</h1>
        </section>
    );
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