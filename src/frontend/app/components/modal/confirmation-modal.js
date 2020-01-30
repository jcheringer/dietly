import React from 'react';
import PropTypes from 'prop-types';

import Modal from './modal';

import CS from '../../../style/common.less';
import Style from './confirmation-modal.less';

const confirmationModal = (props) => {

    const confirmClickHandler = () => {
        props.confirmClickHandler && props.confirmClickHandler();
    };

    const cancelClickHandler = () => {
        props.cancelClickHandler && props.cancelClickHandler();
    };

    return (
        <Modal>
            <div className={ Style.ConfirmationModal }>
                <h3>{ props.title }</h3>
                <p>{ props.body }</p>
                <div className={ [CS.ActionContainer, Style.Actions].join(' ') }>
                    <button onClick={ confirmClickHandler } className={ CS.BtnPrimary }>{ props.confirmText }</button>
                    <button onClick={ cancelClickHandler }>{ props.cancelText }</button>
                </div>
            </div>
        </Modal>
    )
};

confirmationModal.defaultProps = {
    title: 'Confirmação',
    body: 'Tem certeza que deseja continuar?',
    confirmText: 'Continuar',
    cancelText: 'Cancelar'
};

confirmationModal.propTypes = {
    confirmClickHandler: PropTypes.func,
    cancelClickHandler: PropTypes.func,
};

export default confirmationModal;