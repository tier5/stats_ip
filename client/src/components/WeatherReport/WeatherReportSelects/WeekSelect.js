import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import NFLUtils from '../../../utils/NFLUtilsBrowser';


class WeekSelect extends React.Component {

    render() {
        const weeks = Array.from(new Array(NFLUtils.getCurrentNFLWeek()).keys()).map((week) => {
            const realWeek = week + 1;
            return {
                value: realWeek.toString(), label: 'Week ' + realWeek
            };
        });

        return (
            <div className="Comp-WeekSelect selectwrap">
                <Select searchable={false} clearable={false} placeholder="Week" options={weeks}
                        className="react-select"
                        value={this.props.week.toString()} onChange={(val) => this.props.onWeekChange(parseInt(val.value, 10))}/>
            </div>
        );
    }
}

WeekSelect.propTypes = {
    week: PropTypes.number.isRequired,
    onWeekChange: PropTypes.func.isRequired,
};

export default WeekSelect;
