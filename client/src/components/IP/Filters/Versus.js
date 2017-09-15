import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import versusTypes from '../../../utils/parameters/versusTypes';
import teams from '../../../utils/parameters/teams';

class Versus extends React.Component {

    handleVersusChange(type, value, teamAbbr) {
        const newFilters = Object.assign({}, this.props.filters, {
            versus: type,
            versus_val: value,
            versus_team: teamAbbr
        });
        this.props.onFiltersChange(newFilters);
    }

    handleNewVersusChange(evt, type, value, teamAbbr) {
        if (evt.target.checked) {
            this.handleVersusChange(type, value, teamAbbr);
        } else {
            this.handleVersusChange('', '', '');
        }
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

        const classes = ClassNames('navwrap', {
            'nav_get_premium': !this.props.premium
        });

        return (
            <div className="Comp-Versus">
                <div className={classes}>
                    <a className="navwrap_main-a">VERSUS</a>
                    <div className="navcontent_1 versus-1">
                        <div className="col">
                            {Object.keys(versusTypes).map((versusTypeKey) => {
                                return (
                                    <div key={versusTypeKey} className="navwrap2">
                                        <div className="navwrap_main-a" key={versusTypeKey}>
                                            <input checked={this.props.filters.versus === versusTypeKey}
                                                   type="checkbox"/>
                                            <label>{versusTypes[versusTypeKey]}</label>
                                        </div>
                                        <div className="navcontent_2 halfline">
                                            <div className="col">
                                                <span className="slash-name">Afc</span>
                                                {afcTeams.map((teamAbr) => {
                                                    const text = (versusTypeKey === 'TEAM')
                                                        ? teams[teamAbr].fullName : (teams[teamAbr][versusTypeKey] + ', ' + teamAbr);
                                                    const value = (versusTypeKey === 'TEAM')
                                                        ? teamAbr : (teams[teamAbr][versusTypeKey]);
                                                    return (
                                                        <div key={teamAbr}>
                                                            <input checked={this.props.filters.versus_val === value}
                                                                   id={'vs' + versusTypeKey + '_' + teamAbr} value={teamAbr} type="checkbox"
                                                                   name="positions[]"
                                                                   onChange={(evt) => this.handleNewVersusChange(evt, versusTypeKey, value, teamAbr)}/>
                                                            <label className={'team-' + teamAbr} htmlFor={'vs' + versusTypeKey + '_' + teamAbr}>{text}</label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="col">
                                                <span className="slash-name">Nfc</span>
                                                {nfcTeams.map((teamAbr) => {
                                                    const text = (versusTypeKey === 'TEAM')
                                                        ? teams[teamAbr].fullName : (teams[teamAbr][versusTypeKey] + ', ' + teamAbr);
                                                    const value = (versusTypeKey === 'TEAM')
                                                        ? teamAbr : (teams[teamAbr][versusTypeKey]);
                                                    return (
                                                        <div key={teamAbr}>
                                                            <input checked={this.props.filters.versus_val === value}
                                                                   id={'vs' + versusTypeKey + '_' + teamAbr} value={teamAbr} type="checkbox"
                                                                   name="positions[]"
                                                                   onChange={(evt) => this.handleNewVersusChange(evt, versusTypeKey, value, teamAbr)}/>
                                                            <label className={'team-' + teamAbr} htmlFor={'vs' + versusTypeKey + '_' + teamAbr}>{text}</label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <button onClick={() => {
                                                // close
                                            }} className="ok-button">OK
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {this.props.filters.versus
                && <span className={'leftfilter teamColor-'+this.props.filters.versus_team}>vs. {(this.props.filters.versus === 'TEAM') ? teams[this.props.filters.versus_val].fullName : (this.props.filters.versus + ' ' + this.props.filters.versus_val)} <a
                    onClick={() => this.handleVersusChange('', '')}><span
                    className="sr-only">Remove Filter</span></a></span>}
            </div>
        );
    }
}

Versus.propTypes = {
    filters: PropTypes.object.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    premium: PropTypes.bool.isRequired,
};

export default Versus;