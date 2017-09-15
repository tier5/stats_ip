import React from 'react';
import PropTypes from 'prop-types';

import weather from '../../../utils/parameters/weather';

class Weather extends React.Component {


    handleWeatherChange(weather) {
        const newFilters = Object.assign({}, this.props.filters, {
            weather: weather
        });
        this.props.onFiltersChange(newFilters);
    }

    handleInputConditionsChange(evt) {
        const cond = this.props.filters.weather.CONDITIONS.slice();

        if(cond.length >= 0 && cond.includes('ALL')) {
            cond.splice(cond.indexOf('ALL'), 1);
        }

        if (cond.includes(evt.target.value)) {
            if (!evt.target.checked) {
                cond.splice(cond.indexOf(evt.target.value), 1);
            }
        } else if (evt.target.checked) {
            if(evt.target.value === 'ALL') {
                cond.splice(0, cond.length);
            }
            cond.push(evt.target.value);
        }
        cond.sort((a, b) => {
            const keys = Object.keys(weather.CONDITIONS);
            return keys.indexOf(a) - keys.indexOf(b);
        });

        if(cond.length === 0) {
            cond.push('ALL');
        }

        this.handleWeatherChange({TEMPERATURES: this.props.filters.weather.TEMPERATURES, CONDITIONS: cond});
    }

    handleInputTemperaturesChange(evt) {
        const temp = this.props.filters.weather.TEMPERATURES.slice();

        if(temp.length >= 0 && temp.includes('ALL')) {
            temp.splice(temp.indexOf('ALL'), 1);
        }

        if (temp.includes(evt.target.value)) {
            if (!evt.target.checked) {
                temp.splice(temp.indexOf(evt.target.value), 1);
            }
        } else if (evt.target.checked) {
            if(evt.target.value === 'ALL') {
                temp.splice(0, temp.length);
            }
            temp.push(evt.target.value);
        }
        temp.sort((a, b) => {
            const keys = Object.keys(weather.TEMPERATURES);
            return keys.indexOf(a) - keys.indexOf(b);
        });

        if(temp.length === 0) {
            temp.push('ALL');
        }

        this.handleWeatherChange({TEMPERATURES: temp, CONDITIONS: this.props.filters.weather.CONDITIONS});
    }

    render() {
        return (
            <div>
                <div className="navwrap">
                    <a className="navwrap_main-a">WEATHER</a>
                    <div className={'navcontent_1 weather-1 halfline' + ((this.props.premium) ? '' : ' disabled_premium')}>
                        <div className="col">
                            <form id="temperaturesForm">
                                {Object.keys(weather.TEMPERATURES).map((temperatureKey) => {
                                    return (
                                        <div key={temperatureKey}>
                                            <input
                                                checked={this.props.filters.weather.TEMPERATURES.includes(temperatureKey)}
                                                id={'temperatures_' + temperatureKey} value={temperatureKey} type="checkbox"
                                                name="temperatures[]" onChange={this.handleInputTemperaturesChange.bind(this)}/>
                                            <label
                                                htmlFor={'temperatures_' + temperatureKey}>{weather.TEMPERATURES[temperatureKey]}</label>
                                        </div>
                                    );
                                })}
                            </form>
                        </div>
                        <div className="col">
                            <form id="conditionsForm">
                                {Object.keys(weather.CONDITIONS).map((conditionKey) => {
                                    return (
                                        <div key={conditionKey}>
                                            <input
                                                checked={this.props.filters.weather.CONDITIONS.includes(conditionKey)}
                                                id={'conditions_' + conditionKey} value={conditionKey} type="checkbox"
                                                name="conditions[]" onChange={(evt) => {
                                                //const target = window.$(evt.target);
                                                if (!this.props.premium) {
                                                    evt.target.checked = false;
                                                }
                                                this.handleInputConditionsChange(evt);
                                            }}/>
                                            <label htmlFor={'conditions_' + conditionKey}>{weather.CONDITIONS[conditionKey]}</label>
                                        </div>
                                    );
                                })}
                            </form>
                            <div className="getpremiumbox">
                                <div className="box">
                                    <p>This awesome feature<br/> is available for<br/> <strong>Premium Users</strong> only.<br/> Want access?</p>
                                    <a>GET PREMIUM</a>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => {
                            // close
                        }} className="ok-button">OK
                        </button>
                    </div>
                </div>
                {!this.props.filters.weather.TEMPERATURES.includes('ALL')
                && <span className="leftfilter">Clear Temperatures
                    <a onClick={() => {
                        const weather = this.props.filters.weather;
                        weather.TEMPERATURES = ['ALL'];
                        this.handleWeatherChange(weather);
                    }}><span className="sr-only">Remove Filter</span></a>
                </span>
                }
                {!this.props.filters.weather.CONDITIONS.includes('ALL')
                && <span className="leftfilter">Clear Conditions
                    <a onClick={() => {
                        const weather = this.props.filters.weather;
                        weather.CONDITIONS = ['ALL'];
                        this.handleWeatherChange(weather);
                    }}><span className="sr-only">Remove Filter</span></a>
                </span>
                }
            </div>
        );
    }
}

Weather.propTypes = {
    filters: PropTypes.object.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    premium: PropTypes.bool.isRequired,
};

export default Weather;