import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import Popups from './Popups/Popups';
import DepthSelects from './DepthSelects/DepthSelects';

import NFLUtils from '../../utils/NFLUtilsBrowser';
import GameField from './GameField/GameField';

import './DepthChart.css';
import DepthToggleNavs from './DepthToggleNavs';

class DepthChart extends React.Component {

    constructor() {
        super();

        this.state = {
            week: NFLUtils.getCurrentNFLWeek(),
            offTeam: 'ARI',
            offLineTeam: 'ARI',
            defTeam: 'ARI'
        };
    }

    handleWeekChange(week) {
        this.setState({
            week: week
        });
    }

    handleTeamsChange(defTeam, offTeam, offLineTeam) {
        this.setState({
            offTeam: offTeam,
            defTeam: defTeam,
            offLineTeam: offLineTeam
        });
    }

    render() {
        return (
            <DocumentTitle title="Depth chart - StatRoute">
                <div className="Comp-DepthChart depth-chart_wrap">

                    <div className="depth-chart">

                        <div className="depth-chart-left">

                            <DepthToggleNavs premium={this.props.user.premium} week={this.state.week}
                                             defTeam={this.state.defTeam} offTeam={this.state.offTeam}
                                             offLineTeam={this.state.offLineTeam}
                                             onTeamsChange={this.handleTeamsChange.bind(this)}/>

                            {false && <a href="" className="popes-open" data-popid="playercard_malik-jackson"
                               style={{width: '100%', float: 'left', margin: '30px 0'}}>Malik Jackson - Player card</a>}

                        </div>

                        <div className="depth-chart-right">

                            <DepthSelects week={this.state.week} offTeam={this.state.offTeam}
                                          defTeam={this.state.defTeam} offLineTeam={this.state.offLineTeam}
                                          onWeekChange={this.handleWeekChange.bind(this)}
                                          onTeamsChange={this.handleTeamsChange.bind(this)}
                            />

                            <GameField  week={this.state.week} offTeam={this.state.offTeam} offLineTeam={this.state.offLineTeam}
                                       defTeam={this.state.defTeam} onPlayerCardOpen={(playerId) => console.log(playerId)}/>

                        </div>

                    </div>

                    <Popups/>
                </div>
            </DocumentTitle>
        );
    }
}

DepthChart.propTypes = {
    user: PropTypes.object.isRequired
};

export default DepthChart;

