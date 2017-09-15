import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import DepthNav from './DepthNav';
import DepthMoreData from './DepthMoreData/DepthMoreData';

import './DepthToggleNavs.css';

class DepthToggleNavs extends React.Component {

    constructor() {
        super();

        this.state = {
            navVisible: true,
            moreVisible: false
        };
    }

    render() {
        return (
            <div className="Comp-DepthToggleNavs">

                <button className={ClassNames('toggle-button', {clicked: this.state.navVisible})}
                        onClick={() => this.setState((oldState) => {
                            const newState = {
                                navVisible: !oldState.navVisible
                            };

                            if (!newState.navVisible && !oldState.moreVisible) {
                                newState.moreVisible = true;
                            }

                            return newState;
                        })}>Toggle
                </button>

                <h1>Depth chart</h1>

                <div className={ClassNames('toggle', {visible: this.state.navVisible})}>
                    <DepthNav week={this.props.week} defTeam={this.props.defTeam}
                              offTeam={this.props.offTeam} offLineTeam={this.props.offLineTeam}
                              onTeamsChange={this.props.onTeamsChange}
                    />
                    <div className="clearfix"/>
                </div>

                <div className={ClassNames('toggle', {visible: this.state.moreVisible})}>
                    <DepthMoreData premium={this.props.premium}
                                   defTeam={this.props.defTeam}
                                   offTeam={this.props.offTeam}
                    />
                    <div className="clearfix"/>
                </div>
                <div className="buttonwrap">
                    <a className={ClassNames({clicked: this.state.moreVisible})}
                       onClick={() => {
                           this.setState((oldState) => {
                               const newState = {
                                   moreVisible: !oldState.moreVisible
                               };
                               if (newState.moreVisible && oldState.navVisible) {
                                   newState.navVisible = false;
                               }
                               if (!newState.moreVisible && !oldState.navVisible) {
                                   newState.navVisible = true;
                               }

                               return newState;
                           });
                       }}
                    >{(this.props.premium) ? 'Stats ip' : 'Stats ip - Get premium'}</a>
                </div>

            </div>
        );
    }
}

DepthToggleNavs.propTypes = {
    premium: PropTypes.bool.isRequired,
    week: PropTypes.number.isRequired,
    defTeam: PropTypes.string.isRequired,
    offTeam: PropTypes.string.isRequired,
    offLineTeam: PropTypes.string.isRequired,
    onTeamsChange: PropTypes.func.isRequired
};

export default DepthToggleNavs;
