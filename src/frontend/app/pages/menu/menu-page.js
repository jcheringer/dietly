import React, { useState, useEffect } from 'react'
import axios from 'axios';

import MenuItemList from './menu-item-list';
import Modal from '../../components/modal/modal';
import FoodEditor from '../../components/food-editor/food-editor';
import ReceiptEditor from '../../components/receipt-editor/receipt-editor';

import CS from '../../../style/common.less'
import Style from './menu-page.less';

export default function (props) {
    const TABS = { FOOD: 'food', RECEIPT: 'receipt' };
    const blankFood = { name: '', measureUnits: [] };
    const blankReceipt = { name: '' };

    const [currentTab, setCurrentTab] = useState(TABS.FOOD);
    const [foodList, setFoodList] = useState([]);
    const [receiptList, setReceiptList] = useState([]);
    const [isEditing, setEditing] = useState(false);
    const [editingFood, setEditingFood] = useState(null);
    const [editingReceipt, setEditingReceipt] = useState(null);

    const changeCurrentTab = (tab) => setCurrentTab(tab);

    const editFoodHandler = (food) => {
        setEditingFood(food || { ...blankFood });
        setEditing(true);
    };

    const editReceiptHandler = (receipt) => {
        setEditingReceipt(receipt || { ...blankReceipt });
        setEditing(true);
    };

    const cancelEditHandler = () => {
        setEditingReceipt(null);
        setEditingFood(null);
        setEditing(false);
    };

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
            { currentTab === TABS.FOOD ?
                <MenuItemList
                    itemList={ foodList }
                    includeText="Incluir Alimento"
                    editItemHandler={ editFoodHandler }
                /> : null }
            { currentTab === TABS.RECEIPT ?
                <MenuItemList
                    itemList={ receiptList }
                    includeText="Criar Receita"
                    editItemHandler={ editReceiptHandler }
                /> : null }
            { isEditing ? (
                <Modal>
                    { editingFood ? <FoodEditor food={ editingFood } cancelEditHandler={ cancelEditHandler } /> : null }
                    { editingReceipt ? <ReceiptEditor cancelEditHandler={ cancelEditHandler } /> : null }
                </Modal>
            ) : null }
        </div>
    )
}