import React, { useState, useEffect } from 'react'

import Style from './diet-meal-editor.less';
import CS from '../../../style/common.less';

export default function (props) {
    const [name, setName] = useState(props.item.name);
    const [amount, setAmount] = useState(props.item.amount);
    const [measureUnit, setMeasureUnit] = useState(props.item.measureUnit);

    const dummyHandler = () => {

    };

    useEffect(() => {
        setName(props.item.name);
        setAmount(props.item.amount || '');
        setMeasureUnit(props.item.measureUnit);
    }, [props.item]);

    return (
        <div className={ Style.MealItemEditor }>
            <div>
                <div className={ [CS.FloatingLabelContainer, CS.Mb03].join(' ') }>
                    <input type="text" placeholder="Nome" value={ name } onChange={ dummyHandler } />
                    <label>Nome</label>
                </div>
                <div className={ CS.DFlex }>
                    <div className={ [CS.FloatingLabelContainer, CS.Wd25].join(' ') }>
                        <input type="text" placeholder="Quantidade" value={ amount } onChange={ dummyHandler } />
                        <label>Quantidade</label>
                    </div>
                    <div className={ [CS.FloatingLabelContainer, CS.Wd75].join(' ') }>
                        <select value={ measureUnit } onChange={ dummyHandler }>
                            <option value="0">À Vontade</option>
                            <option value="1">Unidade(s)</option>
                            <option value="2">Grama(s)</option>
                            <option value="3">Colher(es)</option>
                        </select>
                        <label>Medida</label>
                    </div>
                </div>
            </div>
            <button onClick={ props.cancelEditHandler }>Cancelar</button>
        </div>
    )
}