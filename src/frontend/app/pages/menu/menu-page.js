import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

import { getFoodList } from '../../store/actions/foods-action';

import MenuItemList from './menu-item-list';
import Modal from '../../components/modal/modal';
import FoodEditor from '../../components/food-editor/food-editor';
import ReceiptEditor from '../../components/receipt-editor/receipt-editor';

import CS from '../../../style/common.less'
import Style from './menu-page.less';

const menuPage = (props) => {
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
        props.getFoodList();

        axios.get('api/receipt').then(response => {
            setReceiptList(response.data);
        });
    }, []);

    useEffect(() => {
        console.log(props.foodList);
        setFoodList(props.foodList || []);
    }, [props.foodList]);

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
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        foodList: state.food.foodList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFoodList: () => dispatch(getFoodList())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(menuPage)