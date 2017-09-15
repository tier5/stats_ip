import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import WeatherUtils from '../../../utils/WeatherUtils';

import windDirection from '../../../resources/basic/images/wind-direction.png';

const stadiums = WeatherUtils.importAll(require.context('../../../resources/basic/images/stadiums', false, /\.(png|jpe?g|svg)$/));


const StadiumValues = (props) => {
    const windDeg = WeatherUtils.getWindDegrees(props.stadium.winddirection);
    const stadiumDeg = props.stadium.stadiumorientation + 90;

    return (
        <div className="Comp-StadiumValues">
            <h2>{props.stadium.stadiumname}</h2>
            <span className="place">Nashville, TN</span>
            <p className="place_info">
                ELEV. <strong>551</strong> ft
                <span><strong>36.14</strong> N, <strong>86.80</strong> W</span>
            </p>

            <div className="sto">
                <div className="weather_wind">
                                        <span><strong>WIND:</strong> {props.stadium.windspeed} mph <img alt="wind" style={{
                                            transform: 'rotate('+windDeg+'deg)',
                                            'msTransform': 'rotate('+windDeg+'deg)',
                                            'WebkitTransform': 'rotate('+windDeg+'deg)',
                                            'MozTransform': 'rotate('+windDeg+'deg)'
                                        }} src={windDirection} title={props.stadium.winddirection}/></span>
                    <p>
                        From the South Gusts<br/>
                        up to 14 mph
                    </p>
                </div>
            </div>

            <div className="stadion">
                <img alt="stadion" style={{
                    maxWidth: '100%',
                    transform: 'rotate('+stadiumDeg+'deg)',
                    'msTransform': 'rotate('+stadiumDeg+'deg)',
                    'WebkitTransform': 'rotate('+stadiumDeg+'deg)',
                    'MozTransform': 'rotate('+stadiumDeg+'deg)'
                }} src={stadiums[props.stadium.stadiumgraphic]} title={props.stadium.stadiumgraphic}/>
            </div>

            <span className="uploaded">Uploaded 13 minutes ago</span>
        </div>
    );
};

StadiumValues.propTypes = {
    stadium: PropTypes.object.isRequired
};


class MatchStadiumStats extends React.Component {

    constructor() {
        super();

        this.state = {
            stadium: null
        };
    }

    componentDidMount() {
        this._loadGameStadium();
    }

    componentDidUpdate(oldProps) {
        if (oldProps.weatherKey !== this.props.weatherKey) this._loadGameStadium();
    }

    _loadGameStadium() {
        if (this.props.weatherKey === null) return;

        axios.get('/api/weather/gameStadium', {
            params: {
                weatherKey: this.props.weatherKey
            }
        }).then((res) => {
            this.setState({
                stadium: res.data.data.stadium
            });
        }, () => {
            this.setState({
                stadium: null
            });
        });
    }


    render() {
        return (
            <div className="Comp-MatchStadiumStats weather-graphs_right weather-padd">

                {this.state.stadium === null
                && <h2>Loading...</h2>}

                {this.state.stadium !== null
                && <StadiumValues stadium={this.state.stadium}/>}
            </div>
        );
    }
}

MatchStadiumStats.propTypes = {
    weatherKey: PropTypes.string,
};

export default MatchStadiumStats;
