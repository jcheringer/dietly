import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import moment from 'moment';

import Style from './diet-scheduler.less';
import CS from '../../../style/common.less';
import { getDietSchedule, saveDietSchedule } from '../../store/actions/diets-action';

const dietScheduler = (props) => {

    const weekDayClickHandler = (day) => {
        const dietId = props.dietId === props.dietSchedule[day] ? null : props.dietId;
        props.saveDietSchedule(day, dietId);
    };

    useEffect(() => {
        props.getDietSchedule();
    }, []);

    return (props.dietSchedule &&
        <div className={ [CS.Box, Style.DietScheduler].join(' ') }>
            { Object.keys(props.dietSchedule).map(day => {
                const classes = [Style.WeekDay];

                if (props.dietId === props.dietSchedule[day]) {
                    classes.push(Style.Checked);
                }

                return (
                    <span
                        key={ day }
                        className={ classes.join(' ') }
                        onClick={ () => weekDayClickHandler(day) }
                    >
                        { moment().isoWeekday(Number(day)).format('ddd') }
                    </span>
                )
            }) }
        </div>
    )
};

dietScheduler.propTypes = {
    dietId: propTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    dietSchedule: state.dietState.dietSchedule
});

const mapDispatchToProps = (dispatch) => ({
    getDietSchedule: () => dispatch(getDietSchedule()),
    saveDietSchedule: (day, dietId) => dispatch(saveDietSchedule(day, dietId))
});

export default connect(mapStateToProps, mapDispatchToProps)(dietScheduler);