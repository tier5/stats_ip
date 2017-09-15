import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';


const ScoringInputs = (props) => {
    const classes = ClassNames('selectwrap', {
        'selectwrap_get_premium': !props.premium
    });

    return (
        <div className={classes}>
            <div className="nice-select" tabIndex="0">
                {/*<input type="text" className="current" readOnly={true} value="Scoring inputs"/>*/}
                <span className="current">Scoring inputs</span>

                <ul className="list">
                    <li className="option selected">Scoring inputs</li>
                    <li className="option">Default</li>
                    <li className="option">Work League</li>

                    <li className="option nice-sel-custom">CUSTOMIZE SCORING</li>
                </ul>
            </div>
        </div>
    );
};

ScoringInputs.propTypes = {
    premium: PropTypes.bool.isRequired
};

export default ScoringInputs;