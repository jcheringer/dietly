import React, { useState } from 'react';

import ConfirmationModal from '../components/modal/confirmation-modal';

export default (Component) => {
    return (props) => {
        const [isVisible, setVisible] = useState(false);
        const [options, setOptions] = useState({});

        const showConfirmation = (options) => {
            if (options.confirmClickHandler) {
                options.confirmClickHandler = options.confirmClickHandler.bind(null, setVisible);
            }

            setOptions({ ...options });
            setVisible(true);
        };

        const hideConfirmation = () => {
            setVisible(false);
        };

        const newProps = {
            ...props,
            showConfirmation
        };

        return (
            <React.Fragment>
                { isVisible && (
                    <ConfirmationModal { ...options } cancelClickHandler={ hideConfirmation } />
                ) }
                <Component { ...newProps } />
            </React.Fragment>
        )
    }
}