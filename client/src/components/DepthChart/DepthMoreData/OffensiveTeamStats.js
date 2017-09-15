import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import teams from '../../../utils/parameters/teams';

const OffensiveValues = (props) => {
    return (
        <div className="sto">
            <ul>
                <li>
                    <span className="dleft">Score/Gm:</span>
                    <span className="dright">{props.values.scorepg}</span>
                </li>
                <li>
                    <span className="dleft">Pass Att/Gm</span>
                    <span className="dright">{props.values.passattpg}</span>
                </li>
                <li>
                    <span className="dleft">Carries/Gm:</span>
                    <span className="dright">{props.values.carriespg}</span>
                </li>
            </ul>
            <ul>
                <li>
                    <span className="dleft">TDs/Gm:</span>
                    <span className="dright">{props.values.touchdownspg}</span>
                </li>
                <li>
                    <span className="dleft">Pass/Gm:</span>
                    <span className="dright">{props.values.passyardspg}</span>
                </li>
                <li>
                    <span className="dleft">Rush/Gm:</span>
                    <span className="dright">{props.values.rushyardspg}</span>
                </li>
            </ul>
        </div>
    );
};

class OffensiveTeamStats extends React.Component {

    constructor() {
        super();

        this.state = {
            vsOpponent: null,
            vsCoordinator: null
        };
    }

    componentDidMount() {
        this._loadStatIpData();
    }

    componentDidUpdate(oldProps) {
        if (oldProps.team !== this.props.team) {
            this._loadStatIpData();
        }
    }

    _loadStatIpData() {
        axios.get('/api/depth/statIp/offensive', {
            params: {
                offTeam: this.props.team,
                defTeam: this.props.vsTeam
            }
        }).then((res) => {
            const data = res.data.data;
            if(data.vsOpponent === null) data.vsOpponent = 'no data';
            if(data.vsCoordinator === null) data.vsCoordinator = 'no data';

            this.setState(res.data.data);
        }).catch(() => {
            this.setState({
                vsOpponent: 'no data',
                vsCoordinator: 'no data'
            });
        });
    }

    render() {
        const isLoadingVsOpponent = this.state.vsOpponent === null;
        const hasDataVsOpponent = !isLoadingVsOpponent && this.state.vsOpponent !== 'no data';

        const isLoadingVsCoordinator = this.state.vsCoordinator === null;
        const hasDataVsCoordinator = !isLoadingVsCoordinator && this.state.vsCoordinator !== 'no data';

        return (
            <div className="sto">

                <span className="offdef"><strong
                    className={'teamFontColor-' + this.props.team}>{teams[this.props.team].fullName}</strong> Offense</span>

                <div className="twocoldata">
                    <div className="dataheader">
                        Past 5 Seasons, Vs. Opponent
                        <span>GP: {(hasDataVsOpponent) ? this.state.vsOpponent.gplayed : 0}&nbsp;</span>
                    </div>
                    {isLoadingVsOpponent && <div className="dataheader message">
                        Loading team statIP data...
                    </div>}
                    {!hasDataVsOpponent && <div className="dataheader message">
                        No team statIP data available
                    </div>}
                    {hasDataVsOpponent && <OffensiveValues values={this.state.vsOpponent}/>}
                </div>

                <div className="twocoldata">
                    <div className="dataheader">
                        Past 5 Seasons, Vs. DC
                        <span>GP: {(hasDataVsCoordinator) ? this.state.vsCoordinator.gplayed : 0}&nbsp;</span>
                    </div>
                    {isLoadingVsCoordinator && <div className="dataheader message">
                        Loading team statIP data...
                    </div>}
                    {!hasDataVsCoordinator && <div className="dataheader message">
                        No team statIP data available
                    </div>}
                    {hasDataVsCoordinator && <OffensiveValues values={this.state.vsCoordinator}/>}
                </div>

            </div>
        );
    }
}


OffensiveTeamStats.propTypes = {
    team: PropTypes.string.isRequired,
    vsTeam: PropTypes.string.isRequired
};

export default OffensiveTeamStats;
