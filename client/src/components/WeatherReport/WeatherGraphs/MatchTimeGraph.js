import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

import {temperatureConfig, chanceofpercipitationConfig, windConfig} from './ChartSettings';

import './MatchTimeGraph.css';

class MatchTimeGraph extends React.Component {


    componentDidMount() {
        this._initGraphs();
    }

    componentDidUpdate(oldProps) {
        if (this.props.records.length > 0) {
            const key = this.props.records[0].hometeamkey + '-' + this.props.records[0].awayteamkey;
            const oldKey = oldProps.records[0].hometeamkey + '-' + oldProps.records[0].awayteamkey;
            if(key !== oldKey)
                this._initGraphs();
        }

    }

    _initGraphs() {
        if (this.temperature) {
            this.temperature.destroy();
            this.temperature = null;
        }
        if (this.chanceofpercipitation) {
            this.chanceofpercipitation.destroy();
            this.chanceofpercipitation = null;
        }
        if (this.wind) {
            this.wind.destroy();
            this.wind = null;
        }

        const timeLabels = this.props.records.map((rec) => ('0' + rec.timeincrement.trim()).slice(-5));
        const temperatures = this.props.records.map((rec) => rec.temperature);
        const nightordays = this.props.records.map((rec) => rec.nightorday);
        const graphics = this.props.records.map((rec) => rec.graphic);
        const chanceofpercipitations = this.props.records.map((rec) => rec.chanceofpercipitation.slice(0, -1));
        const windspeeds = this.props.records.map((rec) => rec.windspeed);
        const winddirections = this.props.records.map((rec) => rec.winddirection);

        this.temperature = new Chart(this.charts__temperature.getContext('2d'),
            temperatureConfig(timeLabels, temperatures, nightordays, graphics));

        this.chanceofpercipitation = new Chart(this.charts__chanceofpercipitation.getContext('2d'),
            chanceofpercipitationConfig(timeLabels, chanceofpercipitations));
        this.wind = new Chart(this.charts__wind.getContext('2d'),
            windConfig(timeLabels, windspeeds, winddirections));
    }


    render() {
        const key = this.props.records[0].hometeamkey + 'vs' + this.props.records[0].awayteamkey;
        return (
            <div className="Comp-MatchTimeGraph">
                <canvas key={key + '_charts__temperature'}
                        ref={(charts__temperature) => this.charts__temperature = charts__temperature}
                        height="150"/>
                <canvas key={key + '_charts__chanceofpercipitation'}
                        ref={(charts__chanceofpercipitation) => this.charts__chanceofpercipitation = charts__chanceofpercipitation}
                        height="150"/>
                <canvas key={key + '_charts__wind'} ref={(charts__wind) => this.charts__wind = charts__wind}
                        height="100"/>
            </div>
        );
    }
}

MatchTimeGraph.propTypes = {
    records: PropTypes.array.isRequired
};

export default MatchTimeGraph;
