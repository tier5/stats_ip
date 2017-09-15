import React from 'react';
import PropTypes from 'prop-types';

import teams from '../../../utils/parameters/teams';

import './Teams.css';

class Teams extends React.Component {

    handleTeamChange(team) {
        const newFilters = Object.assign({}, this.props.filters, {
            team: team
        });
        this.props.onFiltersChange(newFilters);
    }

    handleNewTeamChange(evt) {
        const newTeam = (evt.target.checked) ? evt.target.value : '';
        this.handleTeamChange(newTeam);
    }

    render() {
        const afcTeams = Object.keys(teams).filter((teamAbr) => {
            return teams[teamAbr].AFC;
        }).sort((teamAbr1, teamAbr2) => {
            return teams[teamAbr1].index - teams[teamAbr2].index;
        });

        const nfcTeams = Object.keys(teams).filter((teamAbr) => {
            return !teams[teamAbr].AFC;
        }).sort((teamAbr1, teamAbr2) => {
            return teams[teamAbr1].index - teams[teamAbr2].index;
        });

        return (
            <div className="Comp-Teams">
                <div className="navwrap">
                    <a className="navwrap_main-a">TEAMS</a>
                    <div className="navcontent_1 teams-1 halfline">
                        <div className="col">
                            <span className="slash-name">Afc</span>
                            {afcTeams.map((teamAbbr) => {
                                return (
                                    <div key={teamAbbr}>
                                        <input checked={this.props.filters.team === teamAbbr}
                                               id={'team_' + teamAbbr} value={teamAbbr} type="checkbox"
                                               name="positions[]" onChange={this.handleNewTeamChange.bind(this)}/>
                                        <label className={'team-' + teamAbbr} htmlFor={'team_' + teamAbbr}>{teams[teamAbbr].fullName}</label>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="col">
                            <span className="slash-name">Nfc</span>
                            {nfcTeams.map((teamAbbr) => {
                                return (
                                    <div key={teamAbbr}>
                                        <input checked={this.props.filters.team === teamAbbr}
                                               id={'team_' + teamAbbr} value={teamAbbr} type="checkbox"
                                               name="positions[]" onChange={this.handleNewTeamChange.bind(this)}/>
                                        <label className={'team-' + teamAbbr} htmlFor={'team_' + teamAbbr}>{teams[teamAbbr].fullName}</label>
                                    </div>
                                );
                            })}
                        </div>
                        <button onClick={() => {
                            // close menu
                        }} className="ok-button">OK
                        </button>
                    </div>
                </div>
                {this.props.filters.team
                && <span className={'leftfilter teamColor-'+this.props.filters.team}>{teams[this.props.filters.team].fullName} <a
                    onClick={() => this.handleTeamChange('')}><span
                    className="sr-only">Remove Filter</span></a></span>}
            </div>
        );
    }
}

Teams.propTypes = {
    filters: PropTypes.object.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
};

export default Teams;