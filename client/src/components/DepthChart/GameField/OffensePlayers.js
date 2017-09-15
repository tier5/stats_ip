import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Pos = (tpposition, grouprl = 'N') => {
    return {tpposition: tpposition, grouprl: grouprl};
};

class OffensePlayers extends React.Component {

    _filterAndSortPlayersByPosition(allPlayers, position) {
        return allPlayers.filter((player) => player.tpposition.trim() === position.tpposition)
            .filter((player) => player.grouprl.trim() === position.grouprl)
            .sort((playerA, playerB) => playerA.depthteam - playerB.depthteam);
    }

    render() {

        const positions = {
            'C': Pos('C'),
            'LG': Pos('LG'),
            'RG': Pos('RG'),
            'LT': Pos('LT'),
            'RT': Pos('RT'),
            'QB1': Pos('QB'),
            'WR1': Pos('WR'),
            'WR2': Pos('WR'),
            'WR3': Pos('WR'),
            'TE': Pos('TE'),
            'FB': Pos('FB'),
            'RB2': Pos('RB'),
            'K': Pos('K'),
            'P': Pos('P')
        };
        const offLinePositions = ['C', 'LG', 'RG', 'LT', 'RT'];

        const classNames = ClassNames('Comp-OffensePlayers', 'team', 'team--offense', {
            'offense--standard': true
        });
        return (
            <div className={classNames}>
                {Object.keys(positions).map((positionKey) => {
                    const position = positions[positionKey];
                    const classNames = ClassNames('team__position', 'position--' + positionKey.toLocaleLowerCase());


                    const players = this._filterAndSortPlayersByPosition(
                        ((offLinePositions.includes(positionKey))
                            ? this.props.offLineTeam : this.props.offTeam).players, position);
                    return (
                        <div key={positionKey} className={classNames}>
                            <div className="position__players">
                                {players.map((player, index) => {
                                    const classes = ClassNames('player', 'teamFontColor-' + player.team);
                                    return (
                                        <div key={index} className={classes}
                                             onClick={() => this.props.onPlayerCardOpen(player.playerid)}>
                                            {player.playername}
                                            {player.injuryweek !== null &&
                                            <span className="injury">{player.injuryweek}</span>}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="position__title">
                                {positionKey}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

OffensePlayers.propTypes = {
    offTeam: PropTypes.object.isRequired,
    offLineTeam: PropTypes.object.isRequired,
    onPlayerCardOpen: PropTypes.func.isRequired
};

export default OffensePlayers;