import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import { getFoodList, removeFood } from '../../store/actions/foods-action';
import { getReceiptList, removeReceipt } from '../../store/actions/receipts-action';

import MealItemList from '../../components/meal-item-list/meal-item-list';
import Modal from '../../components/modal/modal';
import FoodEditor from '../../components/food-editor/food-editor';
import ReceiptEditor from '../../components/receipt-editor/receipt-editor';

import Style from './menu-page.less';
import CS from '../../../style/common.less';

const menuPage = (props) => {
    const TABS = { FOOD: 'food', RECEIPT: 'receipt' };
    const blankFood = { name: '', measureUnits: [] };
    const blankReceipt = { name: '', ingredients: [] };

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

    const removeFoodHandler = (food) => {
        props.removeFood(food.id);
    };

    const editReceiptHandler = (receipt) => {
        setEditingReceipt(receipt || { ...blankReceipt });
        setEditing(true);
    };

    const removeReceiptHandler = (receipt) => {
        props.removeReceipt(receipt.id);
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
        props.getReceiptList();
    }, []);

    useEffect(() => {
        setFoodList(props.foodList || []);
    }, [props.foodList]);

    useEffect(() => {
        setReceiptList(props.receiptList || []);
    }, [props.receiptList]);

    return (
        <div>
            <ul className={ Style.MenuTabContainer }>
                <li onClick={ () => changeCurrentTab(TABS.FOOD) } className={ foodClass }>Alimentos</li>
                <li onClick={ () => changeCurrentTab(TABS.RECEIPT) } className={ receiptClass }>Receitas</li>
            </ul>
            <div className={ CS.Pad02 }>
                { currentTab === TABS.FOOD ?
                    <MealItemList
                        itemList={ foodList }
                        includeText="Incluir Alimento"
                        editItemHandler={ editFoodHandler }
                        removeItemHandler={ removeFoodHandler }
                    /> : null }
                { currentTab === TABS.RECEIPT ?
                    <MealItemList
                        itemList={ receiptList }
                        includeText="Criar Receita"
                        editItemHandler={ editReceiptHandler }
                        removeItemHandler={ removeReceiptHandler }
                    /> : null }
            </div>
            { isEditing ? (
                <Modal>
                    { editingFood ? <FoodEditor food={ editingFood } cancelEditHandler={ cancelEditHandler } /> : null }
                    { editingReceipt ?
                        <ReceiptEditor receipt={ editingReceipt } cancelEditHandler={ cancelEditHandler } /> : null }
                </Modal>
            ) : null }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        foodList: state.food.foodList,
        receiptList: state.receipt.receiptList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFoodList: () => dispatch(getFoodList()),
        getReceiptList: () => dispatch(getReceiptList()),
        removeFood: (foodId) => dispatch(removeFood(foodId)),
        removeReceipt: (receiptId) => dispatch(removeReceipt(receiptId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(menuPage)