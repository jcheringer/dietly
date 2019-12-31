import React from 'react';
import PropTypes from 'prop-types';

import CS from '../../../style/common.less';

const menuItemList = (props) => {
    return (
        <div>
            <div onClick={ () => props.editItemHandler() } className={ [CS.StrippedRow, CS.Action, CS.Mb02].join(' ') }>
                <span>{ props.includeText }</span>
                <i className={ ['fas fa-plus', CS.BorderedIcon].join(' ') } />
            </div>
            { props.itemList.map(item => {
                const name = props.showAmount ? `${ item.name } - ${ item.amountText }` : `${ item.name }`;
                return (
                    <div key={ item.id } className={ CS.StrippedRow }>
                        <span>{ name }</span>
                        <i onClick={ () => props.editItemHandler(item) } className={ ['fas fa-pencil-alt', CS.BorderedIcon].join(' ') } />
                        <i onClick={ () => props.removeItemHandler(item) } className={ ['far fa-trash-alt', CS.BorderedIcon, CS.RedIcon].join(' ') } />
                    </div>
                )
            }) }
        </div>
    )
};

menuItemList.defaultProps = {
    showAmount: false
};

menuItemList.propTypes = {
    includeText: PropTypes.string,
    showAmount: PropTypes.bool,
    editItemHandler: PropTypes.func
};

export default menuItemList;