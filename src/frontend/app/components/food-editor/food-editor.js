import React from 'react';

import CS from '../../../style/common.less';

export default function (props) {
    return (
        <div className={ CS.Pad02 }>
            <div>Food Editor</div>
            <button onClick={ props.cancelEditHandler }>Cancelar</button>
        </div>
    )
}