import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import WeatherStatIPTeamHalf from './WeatherStatIPTeamHalf';

import './WeatherStatIPStats.css';

class WeatherStatIPStats extends React.Component {


    render() {
        return (
            <div className={ClassNames('Comp-WeatherStatIPStats', 'temp-statip-data', {
                visible: this.props.visible
            })}>
                <WeatherStatIPTeamHalf/>
                <WeatherStatIPTeamHalf/>
            </div>
        );
    }
}

WeatherStatIPStats.propTypes = {
    visible: PropTypes.bool.isRequired
};

export default WeatherStatIPStats;
