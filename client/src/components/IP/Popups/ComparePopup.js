import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransitionGroup} from 'react-transition-group';

import teams from '../../../utils/parameters/teams';
import GenerateTitleFromFilter from '../../../utils/GenerateTitleFromFilter';

import './CompatePopup.css';

const jQuery = window.jQuery;

class ComparePopup extends React.Component {

    render() {
        jQuery(this.popup).trigger('render.popups');

        return (
            <div className="popes-content" id="pop-compare" ref={(popup) => this.popup = popup}>
                <div className={'pop-inner compare-selected' + ((!this.props.premium) ? ' get_premium' : '')}>
                    <a className="popes-close"><span className="sr-only">Close popup</span></a>

                    {this.props.premium && <div className="getpremiumbox">
                        <div className="box">
                            <p>This awesome feature is available for <strong>Premium Users</strong> only. Want access?
                            </p>
                            <a href="#premium">GET PREMIUM</a>
                        </div>
                    </div>}

                    <CSSTransitionGroup
                        transitionName="compare-popup"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>

                        {this.props.compare.map((compareObject) => {
                            return (
                                <div key={compareObject.row.rownum} className="compare_box">
                                    <div className="name">
                                        <a onClick={(evt) => {
                                            this.props.onCompareChange(compareObject, false);
                                        }} className="box-close"><span
                                            className="sr-only">Remove from compare</span></a>
                                        <span>{compareObject.row.player}</span>
                                        <p>
                                            {compareObject.row.tpposition}{(teams[compareObject.row.teams]) && teams[compareObject.row.teams].fullName}<br/>
                                            Data Set Rank {compareObject.row.rownum}
                                        </p>
                                    </div>
                                    <div className="vs">
                                        <span>{GenerateTitleFromFilter(compareObject.filters)}</span>
                                    </div>
                                    <div className="data">
                                        {compareObject.columns.map((column) => {
                                            return (
                                                <div key={column.field} className="item">
                                                    <div className="left">{column.title}</div>
                                                    <div className="right">{compareObject.row[column.field]}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/*<a href="#add" className="add"><img src="images/add.png" alt="" title=""/> ADD TO MY
                                        LINEUP</a>*/}
                                </div>
                            );
                        })}
                    </CSSTransitionGroup>
                </div>
            </div>
        );
    }
}

ComparePopup.propTypes = {
    premium: PropTypes.bool.isRequired,
    compare: PropTypes.array.isRequired,
    onCompareChange: PropTypes.func.isRequired,
};

export default ComparePopup;