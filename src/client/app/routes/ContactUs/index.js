/**
 * feedbacks listing component page route
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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

const ContactUs = (props) => {
    const [tournament, setTournament] = useState([])

    useEffect(() => {
        const { triggerSwitchNavigation } = props;
        document.title = 'Contact Us';
        triggerSwitchNavigation(navigationIndexer.contactUs);

    }, [])

    const prepareBulkCSVData = (data) => {
        const { triggerGenericCreateEntity } = props;
        console.log(data);
        const refactoredRequestData = [];
        const mappings = {
            id: 0,
            noOfEvents: 1,
            teamHome: 2,
            teamAway: 3,
            day: 4,
            month: 5,
            year: 6,
            hours: 7,
            minutes: 8,
            coordinates: 9,
            location: 10,
            name: 11,
            competitionLevel: 12,
            genderOfSport: 13,
            ageGroup: 14,
            webAddress: 15,
            sport: 16,
        }
        data.map((tournament, index) => {
            if (index) {
                const instance = {};
                Object.keys(mappings).map(key => instance[key] = tournament[mappings[key]])
                refactoredRequestData.push(instance);
            }
        });
        console.log(refactoredRequestData);
        triggerGenericCreateEntity(refactoredRequestData);
    }
    const {
        fetching,
        contactus: {
            success,
            error,
        },
        triggerNullifyError,
        triggerNullifySuccess,
    } = props;

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
        This is the contact us page
    </section>;
}


const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerGenericCreateEntity: (tournaments, page, limit) => dispatch(genericCreateEntity({
            payload: { tournaments },
            page,
            limit,
            endpoint: APPLICATION_ROUTES.TOURNAMENT_CREATE,
        })),
        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
    };
}

const mapStateToProps = state => {
    const { fetching, contactus } = state;
    return { fetching, contactus };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactUs);
