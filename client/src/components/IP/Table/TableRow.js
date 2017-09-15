import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import '../Filters/Teams.css';

class TableRow extends React.Component {

    render() {
        const compareObject = {row: this.props.rowObject, columns: this.props.columns, filters: this.props.filters};

        const isChecked = this.props.compare.reduce((res, object) => {
            return res || window._.isEqual(object, compareObject);
        }, false);
        let isDisabled = this.props.compare.length >= 5 && !isChecked;

        let classNames = 'table-checkbox';
        let title = null;
        if (isDisabled) {
            classNames += ' disabled';
            title = 'You can compare up to 5 players. Please remove one before adding new player at compare screen.';
        }
        if (!this.props.premium) {
            isDisabled = true;
            title = 'Compare functionality is for premium users only.'
        }

        return (
            <tr className={(isChecked) ? 'check-checked' : null}>
                <td>
                    <input className={classNames} id={'table-check-' + this.props.rowObject['rownum']} type="checkbox"
                           checked={isChecked}
                           disabled={isDisabled}
                           onChange={(evt) => {
                               this.props.onCompareChange(compareObject, evt.target.checked);
                           }}
                    />
                    <label className="table-checkbox-label" data-toggle="tooltip" data-placement="right"
                           data-original-title={title} htmlFor={'table-check-' + this.props.rowObject['rownum']}>
                        <span className="sr-only">Toggle compare</span>
                    </label>
                </td>
                {this.props.columns.map((column, index) => {
                    const isName = (column.field === 'player') && false; // TODO: remove to enable player summary

                    const styles = {};
                    if (['player', 'date', 'gamedate'].includes(column.field)) {
                        styles.whiteSpace = 'nowrap';
                        styles.textAlign = 'left';
                    }

                    let children = (
                        <span style={styles}>{this.props.rowObject[column.field]}</span>
                    );
                    if (isName) {
                        children = (
                            <a style={styles}>{children}</a>
                        );
                    }

                    const isTeam = ['oppo', 'teams', 'team'].includes(column.field);
                    const isOrderedByCol = column.field === this.props.parameters.orderBy;
                    const classesObject = {
                        table_name: isName,
                        table_team: isTeam,
                        'ordered-by': isOrderedByCol
                    };
                    if(isTeam) {
                        classesObject[('teamFontColor-' + this.props.rowObject[column.field])] = isTeam;
                    }
                    const classNames = ClassNames(classesObject);

                    return (
                        <td key={column.field + '-' + index} style={styles} className={classNames}>
                            {children}
                        </td>
                    );
                })}
            </tr>
        );
    }
}

TableRow.propTypes = {
    premium: PropTypes.bool.isRequired,
    rowObject: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    parameters: PropTypes.object.isRequired,
    compare: PropTypes.array.isRequired,
    onCompareChange: PropTypes.func.isRequired,
};

export default TableRow;