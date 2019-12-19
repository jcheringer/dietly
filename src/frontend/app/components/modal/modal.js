import React from 'react';

import Style from './modal.less';

export default function (props) {
    return (
        <div className={ Style.Modal }>
            <div className={ Style.ModalContainer }>
                { props.children }
            </div>
        </div>
    )
}