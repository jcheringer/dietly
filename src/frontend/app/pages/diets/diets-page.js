import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getDietList, removeDiet } from '../../store/actions/diets-action';

import CS from '../../../style/common.less'
import ConfirmationModal from '../../components/modal/confirmation-modal';

const dietsPage = (props) => {
    const history = useHistory();
    const [dietList, setDietList] = useState([]);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmClickHandler, setConfirmClickHandler] = useState(null);

    const moveToDiet = (dietId) => {
        history.push(`/diet/${ dietId }`);
    };

    const dietRemoveHandler = (dietId, event) => {
        event.stopPropagation();

        setConfirmClickHandler(() => {
            return () => {
                props.removeDiet(dietId);
                setShowConfirmation(false);
            }
        });

        setShowConfirmation(true);
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
            { showConfirmation && (
                <ConfirmationModal
                    confirmClickHandler={ confirmClickHandler }
                    cancelClickHandler={ () => setShowConfirmation(false) } />
            ) }

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

export default connect(mapStateToProps, mapDispatchToProps)(dietsPage);