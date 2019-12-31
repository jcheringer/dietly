import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { saveFood } from '../../store/actions/foods-action';

import MeasureUnitSelector from '../measure-unit-selector/measure-unit-selector';

import CS from '../../../style/common.less';
import Style from './food-editor.less';

const foodEditor = (props) => {
    const blankMeasure = { measureUnit: 1, multiplier: '' };

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [measureUnit, setMeasureUnit] = useState(0);
    const [relativeMeasures, setRelativeMeasures] = useState([]);

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    };

    const measureUnitChangeHandler = (e) => {
        setMeasureUnit(e.target.value);
    };

    const relativeMeasureAddHandler = () => {
        setRelativeMeasures([...relativeMeasures, { ...blankMeasure }])
    };

    const relativeMeasureRemoveHandler = (index) => {
        const newRelMeasures = [...relativeMeasures];
        newRelMeasures.splice(index, 1);
        setRelativeMeasures(newRelMeasures);
    };

    const relativeMeasureUnitChangeHandler = (index, event) => {
        const newRelativeMeasures = _.cloneDeep(relativeMeasures);
        newRelativeMeasures[index].id = event.target.value;
        setRelativeMeasures(newRelativeMeasures);
    };

    const relativeMeasureMultiplierChangeHandler = (index, event) => {
        const newRelativeMeasures = _.cloneDeep(relativeMeasures);
        newRelativeMeasures[index].multiplier = event.target.value;
        setRelativeMeasures(newRelativeMeasures);
    };

    const saveFoodHandler = () => {
        const food = {
            name: name,
            measureUnits: [
                { id: measureUnit, multiplier: 1 },
                ...relativeMeasures
            ]
        };

        if (id) {
            food.id = id;
        }

        props.saveFood(food);
        props.cancelEditHandler();
    };

    useEffect(() => {
        const measureUnit = props.food.measureUnits.find(m => m.multiplier === 1);
        const relativeUnits = props.food.measureUnits.filter(m => m.multiplier !== 1);

        if (measureUnit) {
            setMeasureUnit(measureUnit.id);
        }

        setId(props.food.id);
        setName(props.food.name);
        setRelativeMeasures(relativeUnits);
    }, [props.food]);

    return (
        <div className={ [Style.FoodEditor, CS.Pad02].join(' ') }>
            <div className={ [CS.FloatingLabelContainer, CS.Mb03].join(' ') }>
                <input type="text" placeholder="Nome" value={ name } onChange={ nameChangeHandler } />
                <label>Nome</label>
            </div>
            <div className={ [CS.FloatingLabelContainer].join(' ') }>
                <MeasureUnitSelector value={ measureUnit } onChange={ measureUnitChangeHandler } />
                <label>Medida Padrão</label>
            </div>
            <div className={ Style.RelativeMeasureContainer }>
                <div onClick={ relativeMeasureAddHandler } className={ [CS.StrippedRow, CS.Action, CS.Mb02].join(' ') }>
                    <span>Adicionar Medida Relativa</span>
                    <i className={ ['fas fa-plus', CS.BorderedIcon].join(' ') } />
                </div>
                { relativeMeasures.map((measure, index) => {
                    return (
                        <div key={ index } className={ [CS.DFlex, CS.AiCenter, CS.Pad01].join(' ') }>
                            <div className={ [CS.FloatingLabelContainer, CS.Wd50].join(' ') }>
                                <MeasureUnitSelector
                                    value={ measure.id }
                                    onChange={ (event) => relativeMeasureUnitChangeHandler(index, event) } />
                                <label>Medida Relativa</label>
                            </div>
                            <div className={ [CS.FloatingLabelContainer, CS.Wd50].join(' ') }>
                                <input
                                    type="number"
                                    placeholder="Multiplicador"
                                    value={ measure.multiplier }
                                    onChange={ (event) => relativeMeasureMultiplierChangeHandler(index, event) } />
                                <label>Multiplicador</label>
                            </div>
                            <i onClick={ () => relativeMeasureRemoveHandler(index) } className={ ['far fa-trash-alt', CS.BorderedIcon, CS.RedIcon].join(' ') } />
                        </div>
                    )
                }) }
            </div>
            <div className={ CS.ActionContainer }>
                <button onClick={ saveFoodHandler } className={ CS.BtnPrimary }>Salvar</button>
                <button onClick={ props.cancelEditHandler }>Cancelar</button>
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveFood: (food) => dispatch(saveFood(food))
    }
};

export default connect(null, mapDispatchToProps)(foodEditor);