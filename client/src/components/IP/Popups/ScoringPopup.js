import React from 'react';
import PropTypes from 'prop-types';

class ScoringPopup extends React.Component {
    render() {
        return (
            <div className="popes-content" id="pop-scoring">
                <div className="pop-inner pop-normal">
                    <a className="popes-close"><span className="sr-only">Close popup</span></a>
                    <h2>scoring levers</h2>

                    <div className="selects">
                        <div className="sto">
                            <div className="tretina">
                                <span className="spanname">Rush Yards</span>
                                <select>
                                    <option>10</option>
                                    <option>12</option>
                                    <option>14</option>
                                </select>
                                <span className="select-info">YDS/Point</span>
                            </div>
                            <div className="tretina">
                                <span className="spanname">Receiving Yards</span>
                                <select>
                                    <option>20</option>
                                    <option>30</option>
                                    <option>40</option>
                                </select>
                                <span className="select-info">YDS/Point</span>
                            </div>
                            <div className="tretina">
                                <span className="spanname">Pass Yards</span>
                                <select>
                                    <option>25</option>
                                    <option>35</option>
                                    <option>45</option>
                                </select>
                                <span className="select-info">YDS/Point</span>
                            </div>
                        </div>
                        <div className="sto">
                            <div className="tretina">
                                <span className="spanname">Touchdowns</span>
                                <select>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                </select>
                                <span className="select-info">Points</span>
                            </div>
                            <div className="tretina">
                                <span className="spanname">Receptions</span>
                                <select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                                <span className="select-info">PPR</span>
                            </div>
                            <div className="tretina">
                                <span className="spanname">QB Interceptions</span>
                                <select>
                                    <option>-2</option>
                                    <option>-4</option>
                                    <option>-5</option>
                                </select>
                                <span className="select-info">Points</span>
                            </div>
                        </div>
                    </div>

                    <div className="sto">
                        <span className="spanname">Name Your League</span>
                        <div className="sto">
                            <p className="char-remaining"><strong>50</strong> char. remaining</p>
                        </div>
                        <input type="text" placeholder="All Teams, This Season, Selected Weather" />
                        <button type="button" className="cta1">SAVE YOUR DATA SET</button>
                    </div>
                </div>
            </div>
        );
    }
}

ScoringPopup.propTypes = {

};

export default ScoringPopup;