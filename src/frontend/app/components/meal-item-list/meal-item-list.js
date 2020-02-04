import React from 'react';
import PropTypes from 'prop-types';

import CS from '../../../style/common.less';

const mealItemList = (props) => {
    const itemEditClickHandler = (item) => {
        if (!props.editItemHandler) {
            return;
        }

        props.editItemHandler(item);
    };

    const itemRemoveClickHandler = (item) => {
        if (!props.removeItemHandler) {
            return;
        }

        props.removeItemHandler(item);
    };

    return (
        <div>
            <div onClick={ () => props.editItemHandler() } className={ [CS.StrippedRow, CS.Action, CS.Mb02].join(' ') }>
                <span>{ props.includeText }</span>
                <i className={ ['fas fa-plus', CS.BorderedIcon].join(' ') } />
            </div>
            { props.itemList.map(item => {
                const name = props.showAmount ? `${ item.name } - ${ item.amountText }` : `${ item.name }`;
                return (
                    <div key={ `${ item.type }-${ item._id }` } className={ CS.StrippedRow }>
                        <span>{ name }</span>
                        <i onClick={ () => itemEditClickHandler(item) } className={ ['fas fa-pencil-alt', CS.BorderedIcon].join(' ') } />
                        <i onClick={ () => itemRemoveClickHandler(item) } className={ ['far fa-trash-alt', CS.BorderedIcon, CS.RedIcon].join(' ') } />
                    </div>
                )
            }) }
        </div>
    )
};

mealItemList.defaultProps = {
    showAmount: false
};

mealItemList.propTypes = {
    includeText: PropTypes.string,
    showAmount: PropTypes.bool,
    editItemHandler: PropTypes.func
};

export default mealItemList;