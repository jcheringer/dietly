import React from 'react'

import DietSchedule from '../../components/diet-schedule/diet-schedule';

import CommonStyle from '../../../style/common.less';

export default function () {
    const cssClasses = [CommonStyle.Scrollable, CommonStyle.CommonPage];
    return (
        <div className={ cssClasses.join(' ') }>
            <DietSchedule />
        </div>
    )
}