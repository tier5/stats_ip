import React from 'react';
import PropTypes from 'prop-types';

import MatchWeatherGraph from './MatchWeatherGraph';
import MatchStadiumStats from './MatchStadiumStats';

class WeatherGraphs extends React.Component {

    render() {
        return (
                <div className="Comp-WeatherGraphs weather-graphs">
                    <MatchWeatherGraph
                        homeTeam={this.props.homeTeam}
                        awayTeam={this.props.homeTeam}
                        weatherKey={this.props.weatherKey}
                    />
                    <MatchStadiumStats
                        weatherKey={this.props.weatherKey}
                    />
                </div>
        );
    }
}

WeatherGraphs.propTypes = {
    week: PropTypes.number.isRequired,
    homeTeam: PropTypes.string,
    awayTeam: PropTypes.string,
    weatherKey: PropTypes.string,
};

export default WeatherGraphs;
