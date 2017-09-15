import React from 'react';
import PropTypes from 'prop-types';
import WeekSelect from './WeekSelect';
import GamesSelect from './GamesSelect';


class WeatherReportSelects extends React.Component {

    render() {
        return (
            <div className="Comp-WeatherReportSelects weather-selects">
                <WeekSelect week={this.props.week} onWeekChange={this.props.onWeekChange}/>

                <GamesSelect week={this.props.week} homeTeam={this.props.homeTeam} awayTeam={this.props.awayTeam}
                             weatherKey={this.props.weatherKey} onGameChange={this.props.onGameChange}/>
            </div>
        );
    }

}

WeatherReportSelects.propTypes = {
    week: PropTypes.number.isRequired,
    homeTeam: PropTypes.string,
    awayTeam: PropTypes.string,
    weatherKey: PropTypes.string,
    onWeekChange: PropTypes.func.isRequired,
    onGameChange: PropTypes.func.isRequired,
};

export default WeatherReportSelects;
