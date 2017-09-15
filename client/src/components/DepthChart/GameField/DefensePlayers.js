import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Pos = (tpposition, grouprl = 'N') => {
    return {tpposition: tpposition, grouprl: grouprl};
};

class DefensePlayers extends React.Component {

    _filterAndSortPlayersByPosition(allPlayers, position) {
        return allPlayers.filter((player) => player.tpposition.trim() === position.tpposition)
            .filter((player) => player.grouprl.trim() === position.grouprl)
            .sort((playerA, playerB) => playerA.depthteam - playerB.depthteam);
    }

    render() {
        const is34 = (this.props.defTeam.players.length > 0 && this.props.defTeam.players[0].formationweek.includes('3-4'));

        const positions34 = {
            'DT': Pos('DT'),
            'LDE': Pos('DE', 'L'),
            'RDE': Pos('DE', 'R'),
            'LCB': Pos('CB', 'L'),
            'RCB': Pos('CB', 'R'),
            'LOLB': Pos('OLB', 'L'),
            'ROLB': Pos('OLB', 'R'),
            'LILB': Pos('ILB', 'L'),
            'RILB': Pos('ILB', 'R'),
            'SS': Pos('SS'),
            'FS': Pos('FS')
        };
        const positions43 = {
            'LDT': Pos('DT', 'L'),
            'RDT': Pos('DT', 'R'),
            'LDE': Pos('DE', 'L'),
            'RDE': Pos('DE', 'R'),
            'LCB': Pos('CB', 'L'),
            'RCB': Pos('CB', 'R'),
            'WSLB': Pos('WSLB'),
            'SSLB': Pos('SSLB'),
            'MLB': Pos('MLB'),
            'SS': Pos('SS'),
            'FS': Pos('FS')
        };

        const positions = (is34) ? positions34 : positions43;

        const classNames = ClassNames('Comp-DefensePlayers', 'team', 'team--defense', {
            'defense--3-4': is34,
            'defense--4-3': !is34,
        });
        return (
            <div className={classNames}>
                {Object.keys(positions).map((positionKey) => {
                    const position = positions[positionKey];
                    const classNames = ClassNames('team__position', 'position--' + positionKey.toLocaleLowerCase());
                    const players = this._filterAndSortPlayersByPosition(this.props.defTeam.players, position);
                    return (
                        <div key={positionKey} className={classNames}>
                            <div className="position__players">
                                {players.map((player, index) => {
                                    const classes = ClassNames('player', 'teamFontColor-' + player.team);
                                    return (
                                        <div key={index} className={classes}
                                             onClick={() => this.props.onPlayerCardOpen(player.playerid)}>
                                            {player.playername}
                                            {(player.injuryweek !== null) &&
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

DefensePlayers.propTypes = {
    defTeam: PropTypes.object.isRequired,
    onPlayerCardOpen: PropTypes.func.isRequired
};

export default DefensePlayers;