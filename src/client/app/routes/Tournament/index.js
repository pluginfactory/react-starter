/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
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

class Tournament extends Component {

    constructor(props) {
        super(props);

        this.tournament = [];

        this.prepareBulkCSVData = this.prepareBulkCSVData.bind(this);
    }

    componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Tournaments';
        triggerSwitchNavigation(navigationIndexer.tournament);
    }

    componentDidMount() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Tournaments';
        triggerSwitchNavigation(navigationIndexer.tournament);
    }

    prepareBulkCSVData(data) {
        const { props: { triggerGenericCreateEntity } } = this;
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

    render() {
        const {
            fetching,
            tournaments: {
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
            <h2>Tournament</h2>
            <p>
                <CSVReader
                    cssClass='btn app-btn btn-sm'
                    onFileLoaded={this.prepareBulkCSVData}
                />
            </p>
            <br />
            <p><h3>Instructions for tournament upload</h3>
                <p>Make a csv file in given format</p>
                <Table responsive bordered dark striped>
                    <thead>
                        <tr>
                            <td>Index</td>
                            <td>noOfEvents</td>
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
                            <td>0</td>
                            <td>2</td>
                            <td></td>
                            <td></td>
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
                        <tr>
                            <td>1</td>
                            <td></td>
                            <td>zumba</td>
                            <td>pumma</td>
                            <td>1</td>
                            <td>1</td>
                            <td>2016</td>
                            <td>12</td>
                            <td>50</td>
                            <td>50,40</td>
                            <td>zumba</td>
                            <td>pubg</td>
                            <td>1</td>
                            <td>1</td>
                            <td>2</td>
                            <td>www.appknit</td>
                            <td>2</td>
                        </tr>	<tr>
                            <td>2</td>
                            <td></td>
                            <td>lumba</td>
                            <td>kumba</td>
                            <td>1</td>
                            <td>1</td>
                            <td>2018</td>
                            <td>11</td>
                            <td>30</td>
                            <td>30,40</td>
                            <td>kumba</td>
                            <td>qwerty</td>
                            <td>1</td>
                            <td>1</td>
                            <td>2</td>
                            <td>www.amazon</td>
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
    const { fetching, tournaments } = state;
    return { fetching, tournaments };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tournament);
