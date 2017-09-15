import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import teams from '../../../utils/parameters/teams';

const DefensiveValues = (props) => {
    return (
        <div className="sto">
            <ul>
                <li>
                    <span className="dleft">Fant. Pts/Gm:</span>
                    <span className="dright">{props.values.pointspg}</span>
                </li>
                <li>
                    <span className="dleft">Off. Yards/Gm:</span>
                    <span className="dright">{props.values.offensiveyardspg}</span>
                </li>
                <li>
                    <span className="dleft">Def. TDs/Gm:</span>
                    <span className="dright">{props.values.deftfdtspg}</span>
                </li>
            </ul>
            <ul>
                <li>
                    <span className="dleft">Fumbles/Gm:</span>
                    <span className="dright">{props.values.fumblesrecoveredpg}</span>
                </li>
                <li>
                    <span className="dleft">Pass INT/Gm:</span>
                    <span className="dright">{props.values.oppassingintpg}</span>
                </li>
                <li>
                    <span className="dleft">Sacks/Gm:</span>
                    <span className="dright">{props.values.oppsackspg}</span>
                </li>
            </ul>
        </div>
    );
};

class DefensiveTeamStats extends React.Component {

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
        if (oldProps.team !== this.props.team || oldProps.vsTeam !== this.props.vsTeam) {
            this._loadStatIpData();
        }
    }

    _loadStatIpData() {
        axios.get('/api/depth/statIp/defensive', {
            params: {
                defTeam: this.props.team,
                offTeam: this.props.vsTeam
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
                    className={'teamFontColor-' + this.props.team}>{teams[this.props.team].fullName}</strong> Defense</span>

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
                    {hasDataVsOpponent && <DefensiveValues values={this.state.vsOpponent}/>}
                </div>

                <div className="twocoldata">
                    <div className="dataheader">
                        Past 5 Seasons, Vs. OC
                        <span>GP: {(hasDataVsCoordinator) ? this.state.vsCoordinator.gplayed : 0}&nbsp;</span>
                    </div>
                    {isLoadingVsCoordinator && <div className="dataheader ">
                        Loading team statIP data...
                    </div>}
                    {!hasDataVsCoordinator && <div className="dataheader message">
                        No team statIP data available
                    </div>}
                    {hasDataVsCoordinator && <DefensiveValues values={this.state.vsCoordinator}/>}
                </div>

            </div>
        );
    }
}


DefensiveTeamStats.propTypes = {
    team: PropTypes.string.isRequired,
    vsTeam: PropTypes.string.isRequired
};

export default DefensiveTeamStats;
