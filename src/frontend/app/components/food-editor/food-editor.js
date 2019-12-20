import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import CS from '../../../style/common.less';
import Style from './food-editor.less';


export default function (props) {
    const blankMeasure = { measureUnit: 1, multiplier: '' };

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

    useEffect(() => {
        const measureUnit = props.food.measureUnits.find(m => m.multiplier === 1);
        const relativeUnits = props.food.measureUnits.filter(m => m.multiplier !== 1);

        if (measureUnit) {
            setMeasureUnit(measureUnit.id);
        }

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
                <select value={ measureUnit } onChange={ measureUnitChangeHandler }>
                    <option value="0">À Vontade</option>
                    <option value="1">Unidade(s)</option>
                    <option value="2">Grama(s)</option>
                    <option value="3">Colher(es)</option>
                </select>
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
                                <select
                                    value={ measure.id }
                                    onChange={ (event) => relativeMeasureUnitChangeHandler(index, event) }>
                                    <option value="0">À Vontade</option>
                                    <option value="1">Unidade(s)</option>
                                    <option value="2">Grama(s)</option>
                                    <option value="3">Colher(es)</option>
                                </select>
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
                <button className={ CS.BtnPrimary }>Salvar</button>
                <button onClick={ props.cancelEditHandler }>Cancelar</button>
            </div>
        </div>
    )
}