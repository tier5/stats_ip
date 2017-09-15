import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import axios from 'axios';

import teams from '../../../utils/parameters/teams';

class GamesSelect extends React.Component {

    constructor() {
        super();

        this.state = {
            games: []
        };
    }

    componentDidMount() {
        this._loadGames();
    }

    componentDidUpdate(oldProps) {
        if (oldProps.week !== this.props.week) this._loadGames();
    }

    _loadGames() {
        axios.get('/api/weather/games', {
            params: {
                week: this.props.week
            }
        }).then((res) => {
            this.setState({
                games: res.data.data.games
            }, () => {
                if (this.props.weatherKey === null) {
                    this._changeGame(res.data.data.games[0]);
                }
            });
        }).catch(() => {
            this.setState({
                games: []
            });
        });
    }

    _changeGame(gameObject) {
        this.props.onGameChange(gameObject.homeTeam, gameObject.awayTeam, gameObject.weatherKey);
    }

    render() {
        const options = this.state.games.map((game) => {
            return Object.assign({
                value: game.weatherKey,
                label: teams[game.homeTeam].fullName + ' @ ' + teams[game.awayTeam].fullName
            }, game);
        });


        return (
            <div className="Comp-GamesSelect selectwrap">
                <Select options={options} value={this.props.weatherKey} searchable={false} clearable={false}
                        className="react-select" placeholder="Week Matchups" onChange={(option) => {
                    this._changeGame(option);
                }}
                />
            </div>
        );
    }
}

GamesSelect.propTypes = {
    week: PropTypes.number.isRequired,
    homeTeam: PropTypes.string,
    awayTeam: PropTypes.string,
    weatherKey: PropTypes.string,
    onGameChange: PropTypes.func.isRequired,
};

export default GamesSelect;
