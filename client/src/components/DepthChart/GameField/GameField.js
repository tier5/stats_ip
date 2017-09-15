import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './GameField.css';
import DefensePlayers from "./DefensePlayers";
import OffensePlayers from "./OffensePlayers";
import DefensiveHeader from "./DefensiveHeader";
import OffensiveHeader from "./OffensiveHeader";

class GameField extends React.Component {

    constructor() {
        super();

        this.state = {
            game: null
        }
    }

    componentDidMount() {
        this._loadGame();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.week !== this.props.week
            || prevProps.defTeam !== this.props.defTeam
            || prevProps.offTeam !== this.props.offTeam
            || prevProps.offLineTeam !== this.props.offLineTeam)
            this._loadGame();
    }

    _loadGame() {
        const parameters = {};
        parameters.offTeam = this.props.offTeam;
        parameters.offLineTeam = this.props.offLineTeam;
        parameters.defTeam = this.props.defTeam;
        parameters.week = this.props.week;

        axios.get('/api/depth/gameField', {
            params: parameters
        }).then((res) => {
            console.log(res.data.data);
            this.setState({
                game: res.data.data
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <div className="Comp-GameField position_wrap">
                {this.state.game !== null
                && <DefensiveHeader defTeam={this.state.game.def} offTeam={this.state.game.off}/>}
                <div className="graphwrap">
                    <div className="canvas">
                        {this.state.game !== null
                        && <DefensePlayers defTeam={this.state.game.def}
                                           onPlayerCardOpen={this.props.onPlayerCardOpen}/>}
                        {this.state.game !== null
                        && <OffensePlayers offTeam={this.state.game.off} offLineTeam={this.state.game.offLine}
                                           onPlayerCardOpen={this.props.onPlayerCardOpen}/>}
                    </div>
                </div>
                {this.state.game !== null
                && <OffensiveHeader defTeam={this.state.game.def} offTeam={this.state.game.off}/>}
            </div>
        );
    }

}

GameField.propTypes = {
    week: PropTypes.number.isRequired,
    offTeam: PropTypes.string.isRequired,
    offLineTeam: PropTypes.string.isRequired,
    defTeam: PropTypes.string.isRequired,
    onPlayerCardOpen: PropTypes.func.isRequired
};

export default GameField;