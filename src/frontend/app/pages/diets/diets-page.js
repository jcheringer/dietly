import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getDietList } from '../../store/actions/diets-action';

import CS from '../../../style/common.less'

const dietsPage = (props) => {
    const history = useHistory();
    const newDietButtonClasses = [CS.BlockButton, CS.Mb02].join(' ');

    const moveToDiet = (dietId) => {
        history.push(`/diet/${ dietId }`);
    };

    useEffect(() => {
        props.getDietList();
    }, []);

    return (
        <div className={ CS.CommonPage }>
            <button onClick={ () => moveToDiet(0) } className={ newDietButtonClasses }>Criar Nova Dieta</button>
            { props.dietList.map(diet => {
                return (
                    <div key={ diet.id } onClick={ () => moveToDiet(diet.id) } className={ [CS.Box, CS.Pad02].join(' ') }>{ diet.name }</div>
                )
            }) }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        dietList: state.diet.dietList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDietList: () => dispatch(getDietList())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(dietsPage);