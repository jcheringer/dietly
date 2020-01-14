import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ReactSelect from 'react-select';

import { MEAL_TYPE, MEASURE_UNITS } from '../../util/constants';

import Style from './diet-meal-editor.less';
import CS from '../../../style/common.less';
import { getFoodList } from '../../store/actions/foods-action';
import { getReceiptList } from '../../store/actions/receipts-action';
import MeasureUnitSelector from '../measure-unit-selector/measure-unit-selector';

const dietMealItemEditor = (props) => {
    const [amount, setAmount] = useState(props.item.amount);
    const [measureUnit, setMeasureUnit] = useState(props.item.measureUnit);
    const [mealItem, setMealItem] = useState(null);
    const [options, setOptions] = useState([]);

    const mealItemChangeHandler = (item) => {
        setMealItem(item);
    };

    const mealItemSaveHandler = () => {
        if (!props.saveItemHandler) {
            return;
        }

        const [type, id] = mealItem.value.split('|');
        const list = type === MEAL_TYPE.FOOD ? props.foodList : props.receiptList;
        const item = list.find(i => i.id === Number(id));
        const name = item.name;
        const measureUnitName = MEASURE_UNITS[measureUnit];
        const amountText = Number(measureUnit) !== 0 ? `${ amount } ${ measureUnitName }` : `${ measureUnitName }`;

        props.saveItemHandler({
            id: Number(id),
            name: name,
            measureUnit: Number(measureUnit),
            amount: Number(amount),
            amountText: amountText,
            type: type
        });
    };

    useEffect(() => {
        props.getFoodList();
        props.getReceiptList();
    }, []);

    useEffect(() => {
        const foods = props.foodList.map(food => {
            return {
                label: food.name,
                value: `${ MEAL_TYPE.FOOD }|${ food.id }`
            }
        });

        const receipts = props.receiptList.map(receipt => {
            return {
                label: receipt.name,
                value: `${ MEAL_TYPE.RECEIPT }|${ receipt.id }`
            }
        });

        setOptions([
            { label: 'Alimentos', options: foods, type: MEAL_TYPE.FOOD },
            { label: 'Receitas', options: receipts, type: MEAL_TYPE.RECEIPT }
        ])
    }, [props.foodList, props.receiptList]);

    useEffect(() => {
        let selectedItem = null;

        if (props.item.id) {
            const group = options.find(o => o.type === props.item.type);
            const itemId = `${ props.item.type }|${ props.item.id }`;
            selectedItem = group.options.find(item => item.value === itemId);
        }

        setMealItem(selectedItem);
        setAmount(props.item.amount);
        setMeasureUnit(props.item.measureUnit);
    }, [props.item]);

    return (
        <div>
            <div>
                <div className={ [CS.FloatingLabelContainer, CS.Mb03].join(' ') }>
                    <ReactSelect
                        options={ options }
                        value={ mealItem }
                        onChange={ mealItemChangeHandler }
                        placeholder="Selecione"
                        className="ReactSelect"
                        classNamePrefix="ReactSelect" />
                    <label>Nome</label>
                </div>
                <div className={ CS.DFlex }>
                    <div className={ [CS.FloatingLabelContainer, CS.Wd75].join(' ') }>
                        <MeasureUnitSelector value={ measureUnit } onChange={ (e) => setMeasureUnit(e.target.value) } />
                        <label>Medida</label>
                    </div>
                    <div className={ [CS.FloatingLabelContainer, CS.Wd25].join(' ') }>
                        <input type="number" placeholder="Quantidade" value={ amount } onChange={ (e) => setAmount(e.target.value) } />
                        <label>Quantidade</label>
                    </div>
                </div>
            </div>
            <div className={ CS.ActionContainer }>
                <button onClick={ mealItemSaveHandler } className={ CS.BtnPrimary }>Salvar</button>
                <button onClick={ props.cancelEditHandler }>Cancelar</button>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        foodList: state.food.foodList || [],
        receiptList: state.receipt.receiptList || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFoodList: () => dispatch(getFoodList()),
        getReceiptList: () => dispatch(getReceiptList())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(dietMealItemEditor);