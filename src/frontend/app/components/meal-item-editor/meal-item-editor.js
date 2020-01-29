import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ReactSelect from 'react-select';

import { MEAL_TYPE, MEASURE_UNITS } from '../../util/constants';

import { getFoodList } from '../../store/actions/foods-action';
import { getRecipeList } from '../../store/actions/recipes-action';
import MeasureUnitSelector from '../measure-unit-selector/measure-unit-selector';

import CS from '../../../style/common.less';

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
        const list = type === MEAL_TYPE.FOOD ? props.foodList : props.recipeList;
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
        props.getRecipeList();
    }, []);

    useEffect(() => {
        const foods = props.foodList.map(food => {
            return {
                label: food.name,
                value: `${ MEAL_TYPE.FOOD }|${ food.id }`
            }
        });

        const recipes = props.recipeList.map(recipe => {
            return {
                label: recipe.name,
                value: `${ MEAL_TYPE.RECIPE }|${ recipe.id }`
            }
        });

        setOptions([
            { label: 'Alimentos', options: foods, type: MEAL_TYPE.FOOD },
            { label: 'Receitas', options: recipes, type: MEAL_TYPE.RECIPE }
        ])
    }, [props.foodList, props.recipeList]);

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
        foodList: state.foodState.foodList || [],
        recipeList: state.recipeState.recipeList || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFoodList: () => dispatch(getFoodList()),
        getRecipeList: () => dispatch(getRecipeList())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(dietMealItemEditor);