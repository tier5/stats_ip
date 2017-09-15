import React from 'react';
import PropTypes from 'prop-types';

class IndoorFieldPopup extends React.Component {
    render() {
        return (
            <div className="popes-content" id="pop_error">
                <div className="pop-inner pop-normal">
                    <a className="popes-close"><span className="sr-only">Close popup</span></a>
                    <h2>Warning</h2>
                    <div className="sto cta1s">
                        <p>Selecting Indoor will de-select all Weather Filters</p>
                        <div className="sto">
                            <a href="" className="cta1 flleft" onClick={() => {
                                window.popesClose();
                            }}>Decline</a>
                            <a href="" className="cta1 flright" onClick={() => {
                                window.popesClose();
                                this.props.onFieldChange();
                            }}>Confirm</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

IndoorFieldPopup.propTypes = {
    onFieldChange: PropTypes.func.isRequired
};

export default IndoorFieldPopup;