import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';

import WeatherUtils from '../../../utils/WeatherUtils';
import teams from '../../../utils/parameters/teams';

import legendAirTemp from '../../../resources/basic/images/legend_air-temp.png';
import legendPrecipitation from '../../../resources/basic/images/legend_precipitation.png';
import legendWind from '../../../resources/basic/images/legend_wind.png';
import MatchTimeGraph from './MatchTimeGraph';

const weatherNight = WeatherUtils.importAll(require.context('../../../resources/basic/images/weather/night', false, /\.(png|jpe?g|svg)$/));
const weatherDay = WeatherUtils.importAll(require.context('../../../resources/basic/images/weather/day', false, /\.(png|jpe?g|svg)$/));


const MatchWeatherStats = (props) => {

    const dateString = props.data.dateofgame.substring(0, 10) + ' ' + props.data.starthour.trim() + ':' + props.data.startminute.trim() + ' ' + props.data.ampm;
    const start = moment(dateString, 'YYYY-MM-DD h:m A');

    const kickoffGraphicKey = props.data.graphic.replace(/\.(png|jpe?g|svg)$/, '');
    const highTemp = props.records.reduce((val, record) => {
       return (val < record.temperature) ? record.temperature : val;
    }, -1000);

    const lowTemp = props.records.reduce((val, record) => {
        return (val > record.temperature) ? record.temperature : val;
    }, 1000);

    const maxChanceofpercipitation = props.records.reduce((val, record) => {
        const number = parseInt(record.chanceofpercipitation.slice(0, -1), 10);
        return (val < number) ? number : val;
    }, 0);

    return (
        <div className="Comp-MatchWeatherStats">
            <div className="temp-header">
                <div className="temp-header_left">
                    <h2>{teams[props.data.hometeamkey].fullName} @ {teams[props.data.awayteamkey].fullName}</h2><br/>
                    <p>
                        {start.format('dddd, MMMM Do, YYYY')}
                        <span>{start.format('hh:mm A zz')} EDT</span>
                    </p>
                </div>
                <div className="kickoff-temp">
                    <span className="name">kickoff temp</span>
                    <div className="ico" style={{backgroundImage: 'url(' + ((props.data.nightorday === 'night') ? weatherNight[kickoffGraphicKey] : weatherDay[kickoffGraphicKey]) + ')'}}>
                    </div>
                    <div className="text">
                        <span className="big">{props.data.temperature}° F</span>
                        {/*<span className="small">Feels Like: <strong>50.0 F</strong></span>*/}
                    </div>
                </div>
            </div>
            <div className="infoline">
                <span className="high">high <strong>{highTemp}</strong></span>
                <span className="low">low <strong>{lowTemp}</strong></span>
                <span className="chance"><strong>{maxChanceofpercipitation}%</strong> Chance of precip.</span>
            </div>
        </div>
    );
};

MatchWeatherStats.propTypes = {
    data: PropTypes.object.isRequired,
    records: PropTypes.array.isRequired,
};

const MatchWeatherGraphLegend = () => {
    return (
        <div className="Comp-MatchWeatherGraphLegend graphlegend">
            <span><img src={legendAirTemp} alt="Air Temp" title="Air Temp"/> Air Temp (F)</span>
            <span><img src={legendPrecipitation} alt="Precipitation" title="Precipitation"/> % of Precipitation</span>
            <span><img src={legendWind} alt="Wind Speed & Direction"
                       title="Wind Speed & Direction"/> Wind Speed & Direction</span>
        </div>
    );
};

MatchWeatherGraphLegend.propTypes = {
    data: PropTypes.object.isRequired
};

class MatchWeatherGraph extends React.Component {

    constructor() {
        super();

        this.state = {
            records: null
        };
    }

    componentDidMount() {
        this._loadRecords();
    }

    componentDidUpdate(oldProps) {
        if (oldProps.weatherKey !== this.props.weatherKey) this._loadRecords();
    }

    _loadRecords() {
        if (this.props.weatherKey === null) return;

        axios.get('/api/weather/gameGraphData', {
            params: {
                weatherKey: this.props.weatherKey
            }
        }).then((res) => {
            this.setState({
                records: res.data.data.records
            });
        }, () => {
            this.setState({
                records: null
            });
        });
    }

    render() {
        return (
            <div className="Comp-MatchWeatherGraph weather-graphs_left weather-padd">
                {this.state.records !== null && <MatchWeatherStats
                    data={this.state.records[0]} records={this.state.records}
                />}

                {this.state.records !== null && <MatchTimeGraph
                    records={this.state.records}
                />}

                {this.state.records !== null && <MatchWeatherGraphLegend
                    data={this.state.records[0]}
                />}
            </div>
        );
    }
}

MatchWeatherGraph.propTypes = {
    homeTeam: PropTypes.string,
    awayTeam: PropTypes.string,
    weatherKey: PropTypes.string,
};

export default MatchWeatherGraph;
