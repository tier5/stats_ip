import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


class Pagination extends React.Component {

    render() {
        const pages = Math.ceil(this.props.count / 50);

        const pagesChildren = Array.from(new Array(pages).keys()).map((page) => {
            const classNames = classnames({
                'active': this.props.parameters['_page'] === page
            });
            return (
                <a key={page} className={classNames} style={{cursor: 'pointer'}} onClick={() => {
                    this.props.onParametersChange({
                       '_page': page
                    });
                }}>
                    {page * 50 + 1} - {(page * 50 + 50 > this.props.count) ? this.props.count : page * 50 + 50}
                </a>
            );
        });

        return (
            <div className="moredata stat-padd">
                <div className="pocet_vysledku">
                    <strong>{this.props.count}</strong> Records
                </div>

                <div className="buttonwrap buttonwrap_statip">
                    {pagesChildren}
                </div>
            </div>
        );
    }
}

Pagination.propTypes = {
    count: PropTypes.number.isRequired,
    parameters: PropTypes.object.isRequired,
    onParametersChange: PropTypes.func.isRequired
};

Pagination.defaultProps = {
    count: 0
};

export default Pagination;