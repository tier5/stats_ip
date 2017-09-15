import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import WeatherReportSelects from './WeatherReportSelects/WeatherReportSelects';
import WeatherGraphs from './WeatherGraphs/WeatherGraphs';
import WeatherStatIP from './WeatherStatIP/WeatherStatIP';

import NFLUtils from '../../utils/NFLUtilsBrowser';

class WeatherReport extends React.Component {

    constructor() {
        super();

        this.state = {
            week: NFLUtils.getCurrentNFLWeek(),
            homeTeam: null,
            awayTeam: null,
            weatherKey: null
        };
    }

    handleWeekChange(week) {
        this.setState({
            week: week
        });
    }

    handleTeamsChange(homeTeam, awayTeam, weatherKey) {
        this.setState({
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            weatherKey: weatherKey
        });
    }

    render() {
        return (
            <DocumentTitle title="Weather report - StatRoute">
                <div className="weather-report_wrap">

                    <div className="weather-report">

                        <div className="weather-head weather-padd">
                            <h1>Weather report</h1>

                            <WeatherReportSelects
                                week={this.state.week} weatherKey={this.state.weatherKey}
                                homeTeam={this.state.homeTeam} awayTeam={this.state.awayTeam}
                                onWeekChange={this.handleWeekChange.bind(this)}
                                onGameChange={this.handleTeamsChange.bind(this)}
                            />

                        </div>

                        <WeatherGraphs
                            week={this.state.week} weatherKey={this.state.weatherKey}
                            homeTeam={this.state.homeTeam} awayTeam={this.state.awayTeam}
                        />

                    </div>

                    <WeatherStatIP/>

                </div>
            </DocumentTitle>
        );
    }
}

WeatherReport.propTypes = {
    user: PropTypes.object.isRequired,
};

export default WeatherReport;