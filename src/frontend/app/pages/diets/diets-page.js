import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getDietList, removeDiet } from '../../store/actions/diets-action';

import withConfirmation from '../../hocs/with-confirmation';

import CS from '../../../style/common.less'

const dietsPage = (props) => {
    const history = useHistory();
    const [dietList, setDietList] = useState([]);

    const moveToDiet = (dietId) => {
        history.push(`/diet/${ dietId }`);
    };

    const dietRemoveHandler = (dietId, event) => {
        event.stopPropagation();

        props.showConfirmation({
            body: 'Tem certeza que deseja excluir a dieta?',
            confirmClickHandler: (setVisible) => {
                props.removeDiet(dietId);
                setVisible(false)
            }
        });
    };

    useEffect(() => {
        props.getDietList();
    }, []);

    useEffect(() => {
        setDietList(props.dietList || []);
    }, [props.dietList]);

    const newDietButtonClasses = [CS.BlockButton, CS.Mb02].join(' ');

    return (
        <div className={ CS.CommonPage }>
            <button onClick={ () => moveToDiet(0) } className={ newDietButtonClasses }>Criar Nova Dieta</button>
            { dietList.map(diet => {
                const cssClasses = [CS.Box, CS.Pad02, CS.DFlex, CS.AiCenter];

                return (
                    <div key={ diet._id } onClick={ () => moveToDiet(diet._id) } className={ cssClasses.join(' ') }>
                        <span className={ CS.Fgrow }>{ diet.name }</span>
                        <i onClick={ (event) => dietRemoveHandler(diet._id, event) } className={ ['far fa-trash-alt', CS.BorderedIcon, CS.RedIcon].join(' ') } />
                    </div>
                )
            }) }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        dietList: state.dietState.dietList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDietList: () => dispatch(getDietList()),
        removeDiet: (dietId) => dispatch(removeDiet(dietId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withConfirmation(dietsPage));