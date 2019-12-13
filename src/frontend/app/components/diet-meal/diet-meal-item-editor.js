import React, { useState, useEffect } from 'react'

import Style from './diet-meal-editor.less';
import CommonStyle from '../../../style/common.less';

export default function (props) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    //const [name, setName] = useState(props.item.name);

    const dummyHandler = () => {

    };

    return (
        <div className={ Style.MealItemEditor }>
            <div>
                <div className={ CommonStyle.FloatingLabelContainer }>
                    <input type="text" placeholder="Nome" value={ name } onChange={ dummyHandler } />
                    <label>Nome</label>
                </div>
                <div className={ CommonStyle.FloatingLabelContainer }>
                    <input type="text" placeholder="Quantidade" value={ amount } onChange={ dummyHandler } />
                    <label>Quantidade</label>
                </div>
                <div className={ CommonStyle.FloatingLabelContainer }>
                    <input type="text" placeholder="Medida" />
                    <label>Medida</label>
                </div>
            </div>
            <button onClick={ props.cancelEditHandler }>Cancelar</button>
        </div>
    )
}