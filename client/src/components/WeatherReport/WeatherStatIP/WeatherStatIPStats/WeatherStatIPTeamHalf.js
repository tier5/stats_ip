import React from 'react';
import PropTypes from 'prop-types';

import WeatherStatIPPlayers from './WeatherStatIPPlayers';
import WeatherStatIPTeamDefensiveStats from './WeatherStatIPTeamDefensiveStats';


class WeatherStatIPTeamHalf extends React.Component {

    render() {
        return (
            <div className="Comp-WeatherStatIPTeamHalf weather-graphs_half">
                <div className="temp-statip-data_half-title weather-padd">
                    New England Patriots <span className="gp">GP: 5</span> <span
                    className="pf">PF: <strong>113</strong></span> <span
                    className="pa">PA: <strong>155</strong></span>
                </div>

                <div className="linewrap weather-padd">
                    <WeatherStatIPPlayers/>

                    <WeatherStatIPPlayers/>
                </div>

                <div className="linewrap weather-padd">
                    <WeatherStatIPPlayers/>

                    <WeatherStatIPPlayers/>
                </div>

                <div className="linewrap weather-padd">
                    <WeatherStatIPPlayers/>

                    <WeatherStatIPPlayers/>
                </div>

                <WeatherStatIPTeamDefensiveStats/>

            </div>
        );
    }
}

WeatherStatIPTeamHalf.propTypes = {};

export default WeatherStatIPTeamHalf;
