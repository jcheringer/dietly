import React from 'react';

export default function (props) {
    return (
        <select value={ props.value } onChange={ props.onChange }>
            <option value="0">À Vontade</option>
            <option value="1">Unidade(s)</option>
            <option value="2">Grama(s)</option>
            <option value="3">Colher(es)</option>
        </select>
    )
}