import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import './WeatherStatIPPlayers.css';

class WeatherStatIPPlayers extends React.Component {

    constructor() {
        super();

        this.state = {
            value: null
        };
    }

    render() {

        const players = [
            {value: '1', label: 'Tom Brady'},
            {value: '2', label: 'Tom Brady'},
            {value: '3', label: 'Tom Brady'},
        ];

        return (
            <div className="Comp-WeatherStatIPPlayers twocoldata">
                <div className="dataheader">
                    <div className="position">QB</div>
                    <Select searchable={false} clearable={false} placeholder="Player" options={players}
                            className="react-select"
                            value={this.state.value} onChange={(val) => {
                                this.setState({
                                    value: val.value
                                });
                    }}
                    />
                    <span className="gp">GP: 10</span>
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
                            <span className="dleft">Ttl Yards:</span>
                            <span className="dright">1.569</span>
                        </li>
                        <li>
                            <span className="dleft">TD's</span>
                            <span className="dright">16</span>
                        </li>
                        <li>
                            <span className="dleft">INT:</span>
                            <span className="dright">8</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}


WeatherStatIPPlayers.propTypes = {};

export default WeatherStatIPPlayers;
