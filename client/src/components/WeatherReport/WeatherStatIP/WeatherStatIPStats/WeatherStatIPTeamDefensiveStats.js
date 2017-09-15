import React from 'react';
import PropTypes from 'prop-types';

class WeatherStatIPTeamDefensiveStats extends React.Component {

    render() {
        return (
            <div className="Comp-WeatherStatIPTeamDefensiveStats bottomdata weather-padd">
                <div className="twocoldata threecoldata">
                    <div className="dataheader">
                        Buffalo Defense
                        <span>GP: 10</span>
                    </div>
                    <div className="sto">
                        <ul>
                            <li>
                                <span className="dleft">Fant. Pts/Gm:</span>
                                <span className="dright">21.36</span>
                            </li>
                            <li>
                                <span className="dleft">Fant Floor:</span>
                                <span className="dright">11.25</span>
                            </li>
                            <li>
                                <span className="dleft">Fant. Ceiling:</span>
                                <span className="dright">33.50</span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span className="dleft">Yards/Gm:</span>
                                <span className="dright">1.569</span>
                            </li>
                            <li>
                                <span className="dleft">Rush/Gm:</span>
                                <span className="dright">16</span>
                            </li>
                            <li>
                                <span className="dleft">Pass/Gm:</span>
                                <span className="dright">8</span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span className="dleft">Sacks:</span>
                                <span className="dright">1.569</span>
                            </li>
                            <li>
                                <span className="dleft">FumbleR:</span>
                                <span className="dright">16</span>
                            </li>
                            <li>
                                <span className="dleft">INT:</span>
                                <span className="dright">8</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

WeatherStatIPTeamDefensiveStats.propTypes = {};

export default WeatherStatIPTeamDefensiveStats;
