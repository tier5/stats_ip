import React from 'react';
import PropTypes from 'prop-types';

class PresetPopup extends React.Component {
    render() {
        return (
            <div className="popes-content" id="pop-name-preset">
                <div className="pop-inner pop-normal">
                    <a className="popes-close"><span className="sr-only">Close popup</span></a>
                    <h2>Name Your Preset</h2>
                    <div className="sto">
                        <p className="char-remaining"><strong>{25 - this.props.name.length}</strong> char. remaining</p>
                    </div>
                    <input type="text" value={this.props.name} placeholder={this.props.placeholder} onChange={this.props.onNameChange}/>
                    <button type="button" className="cta1" onClick={this.props.onAddFilter}>SAVE YOUR DATA SET</button>
                </div>
            </div>
        );
    }
}

PresetPopup.propTypes = {
    onAddFilter: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default PresetPopup;