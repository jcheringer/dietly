import React from 'react';

import CS from '../../../style/common.less';

export default function (props) {
    return (
        <div className={ CS.Pad02 }>
            <div onClick={ () => props.editItemHandler() } className={ [CS.StrippedRow, CS.Action, CS.Mb02].join(' ') }>
                <span>{ props.includeText }</span>
                <i className={ ['fas fa-plus', CS.BorderedIcon].join(' ') } />
            </div>
            { props.itemList.map(item => {
                return (
                    <div key={ item.id } className={ CS.StrippedRow }>
                        <span>{ item.name }</span>
                        <i onClick={ () => props.editItemHandler(item) } className={ ['fas fa-pencil-alt', CS.BorderedIcon].join(' ') } />
                        <i className={ ['far fa-trash-alt', CS.BorderedIcon, CS.RedIcon].join(' ') } />
                    </div>
                )
            }) }
        </div>
    )
}