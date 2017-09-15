import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NFLUtils from '../../../utils/NFLUtilsBrowser';

import teams from '../../../utils/parameters/teams';

class DepthSelects extends Component {
    render() {
        const numberOfWeeks = NFLUtils.getCurrentNFLWeek();

        return (
            <div className="depth-selects">
                <div className="selwrap">
                    <span className="spanname">Week of</span>
                    <div className="nice-select" tabIndex="0">
                        <input type="text" className="current" readOnly={true} value={'Week ' + this.props.week}/>
                        <ul className="list">
                            {Array.from(new Array(numberOfWeeks + 1).keys()).map((week) => {
                                if(week === 0) return null;
                                const classes = classNames('option', {
                                    selected: this.props.week === week
                                });
                                return (
                                    <li key={week} className={classes} onClick={()=> {
                                        this.props.onWeekChange(week);
                                    }}>Week {week}</li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="selwrap">
                    <span className="spanname">NFL Defense</span>
                    <div className="nice-select" tabIndex="0">
                        <input type="text" className="current" readOnly={true} value={teams[this.props.defTeam].fullName}/>
                        <ul className="list">
                            {Object.keys(teams).map((teamAbbr) => {
                                const classes = classNames('option', {
                                    selected: teamAbbr === this.props.defTeam
                                });

                                return (
                                    <li key={teamAbbr} className={classes} onClick={() => {
                                        this.props.onTeamsChange(teamAbbr, this.props.offTeam, this.props.offLineTeam);
                                    }}>{teams[teamAbbr].fullName}</li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="selwrap">
                    <span className="spanname">NFL Offense</span>
                    <div className="nice-select" tabIndex="0">
                        <input type="text" className="current" readOnly={true} value={teams[this.props.offTeam].fullName}/>
                        <ul className="list">
                            {Object.keys(teams).map((teamAbbr) => {
                                const classes = classNames('option', {
                                    selected: teamAbbr === this.props.offTeam
                                });

                                return (
                                    <li key={teamAbbr} className={classes} onClick={() => {
                                        this.props.onTeamsChange(this.props.defTeam, teamAbbr, this.props.offLineTeam);
                                    }}>{teams[teamAbbr].fullName}</li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="selwrap">
                    <span className="spanname">NFL Offensive line</span>
                    <div className="nice-select" tabIndex="0">
                        <input type="text" className="current" readOnly={true} value={teams[this.props.offLineTeam].fullName}/>
                        <ul className="list">
                            {Object.keys(teams).map((teamAbbr) => {
                                const classes = classNames('option', {
                                    selected: teamAbbr === this.props.offLineTeam
                                });

                                return (
                                    <li key={teamAbbr} className={classes} onClick={() => {
                                        this.props.onTeamsChange(this.props.defTeam, this.props.offTeam, teamAbbr);
                                    }}>{teams[teamAbbr].fullName}</li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

DepthSelects.propTypes = {
    week: PropTypes.number.isRequired,
    defTeam: PropTypes.string.isRequired,
    offTeam: PropTypes.string.isRequired,
    offLineTeam: PropTypes.string.isRequired,
    onWeekChange: PropTypes.func.isRequired,
    onTeamsChange: PropTypes.func.isRequired
};

export default DepthSelects;