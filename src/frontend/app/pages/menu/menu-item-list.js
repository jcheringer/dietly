import React from 'react';

import CS from '../../../style/common.less';
import Style from './menu-page.less';

export default function (props) {
    return (
        <div className={ CS.Pad02 }>
            <div onClick={ () => props.editItemHandler() } className={ [Style.MenuItem, Style.AddItem].join(' ') }>
                <span>{ props.includeText }</span>
                <i className={ ['fas fa-plus', CS.BorderedIcon].join(' ') } />
            </div>
            { props.itemList.map(item => {
                return (
                    <div key={ item.id } className={ Style.MenuItem }>
                        <span>{ item.name }</span>
                        <i onClick={ () => props.editItemHandler(item) } className={ ['fas fa-pencil-alt', CS.BorderedIcon].join(' ') } />
                        <i className={ ['far fa-trash-alt', CS.BorderedIcon, CS.RedIcon].join(' ') } />
                    </div>
                )
            }) }
        </div>
    )
}