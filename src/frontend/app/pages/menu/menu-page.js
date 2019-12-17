import React, { useState, useEffect } from 'react'
import axios from 'axios';

import CS from '../../../style/common.less'
import Style from './menu-page.less';

export default function (props) {
    const TABS = { FOOD: 'food', RECEIPT: 'receipt' };
    const [currentTab, setCurrentTab] = useState(TABS.FOOD);
    const [foodList, setFoodList] = useState([]);
    const [receiptList, setReceiptList] = useState([]);

    const changeCurrentTab = (tab) => setCurrentTab(tab);

    let foodClass;
    let receiptClass;

    if (currentTab === TABS.FOOD) {
        foodClass = Style.ActiveTab;
    } else if (currentTab === TABS.RECEIPT) {
        receiptClass = Style.ActiveTab;
    }

    useEffect(() => {
        axios.get('api/food').then(response => {
            setFoodList(response.data);
        });

        axios.get('api/receipt').then(response => {
            setReceiptList(response.data);
        });
    }, []);

    return (
        <div>
            <ul className={ Style.MenuTabContainer }>
                <li onClick={ () => changeCurrentTab(TABS.FOOD) } className={ foodClass }>Alimentos</li>
                <li onClick={ () => changeCurrentTab(TABS.RECEIPT) } className={ receiptClass }>Receitas</li>
            </ul>
            { currentTab === TABS.FOOD ? (
                <div className={ CS.Pad02 }>
                    { foodList.map(food => {
                        return (
                            <div key={ food.id } className={ Style.MenuItem }>
                                <span>{ food.name }</span>
                                <i className={ ['fas fa-pencil-alt', CS.BorderedIcon].join(' ') } />
                                <i className={ ['far fa-trash-alt', CS.BorderedIcon, CS.RedIcon].join(' ') } />
                            </div>
                        )
                    }) }
                </div>
            ) : null }
            { currentTab === TABS.RECEIPT ? (
                <div className={ CS.Pad02 }>
                    { receiptList.map(receipt => {
                        return (
                            <div key={ receipt.id } className={ Style.MenuItem }>
                                <span>{ receipt.name }</span>
                                <i className={ ['fas fa-pencil-alt', CS.BorderedIcon].join(' ') } />
                                <i className={ ['far fa-trash-alt', CS.BorderedIcon, CS.RedIcon].join(' ') } />
                            </div>
                        )
                    }) }
                </div>
            ) : null }
        </div>
    )
}