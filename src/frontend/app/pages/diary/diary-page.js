import React from 'react'

import DietDiary from '../../components/diet-diary/diet-diary';

import CommonStyle from '../../../style/common.less';

export default function () {
    const cssClasses = [CommonStyle.Scrollable, CommonStyle.CommonPage];
    return (
        <div className={ cssClasses.join(' ') }>
            <DietDiary />
        </div>
    )
}