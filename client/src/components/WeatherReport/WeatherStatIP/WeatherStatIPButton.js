import React from 'react';
import PropTypes from 'prop-types';

import './WeatherStatIPButton.css';

const WeatherStatIPButton = (props) => {
    return (
        <div className="Comp-WeatherStatIPButton moredata weather-padd">
            <div className="buttonwrap">
                <a className={props.className} onClick={props.onClick}>Stats ip</a>
            </div>
        </div>
    );
};

WeatherStatIPButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default WeatherStatIPButton;