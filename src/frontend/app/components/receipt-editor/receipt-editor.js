import React from 'react';

import CS from '../../../style/common.less';

export default function (props) {
    return (
        <div className={ CS.Pad02 }>
            <div>Receipt Editor</div>
            <button onClick={ props.cancelEditHandler }>Cancelar</button>
        </div>
    )
}