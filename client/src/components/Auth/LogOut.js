import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

class LogOut extends React.Component {

    componentDidMount() {
        this.props.onUserLogOut().then(() => {
            this.props.history.push('/');
        }, () => {
            this.props.history.push('/');
        });
    }

    render() {
        return null;
    }
}

LogOut.propTypes = {
    onUserLogOut: PropTypes.func.isRequired
};

export default withRouter(LogOut);
