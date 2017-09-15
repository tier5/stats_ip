import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import WeatherStatIPButton from './WeatherStatIPButton';
import WeatherStatIPHeader from './WeatherStatIPHeader';
import WeatherStatIPStats from './WeatherStatIPStats/WeatherStatIPStats';


class WeatherStatIP extends React.Component {

    constructor() {
        super();

        this.state = {
            open: false
        };
    }

    render() {
        return (
            <div className="Comp-WeatherStatIP weather-report martop20">

                <WeatherStatIPHeader/>

                <WeatherStatIPStats visible={this.state.open}/>

                <WeatherStatIPButton
                    className={ClassNames({
                        clicked: this.state.open
                    })}
                    onClick={() => {
                        this.setState((oldState) => {
                            return {
                                open: !oldState.open
                            };
                        });
                    }}/>
            </div>
        );
    }
}

WeatherStatIP.propTypes = {};

export default WeatherStatIP;
