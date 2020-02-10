import React from 'react';
import { connect } from 'react-redux';

import Style from './profile-image.less';

const profileImage = (props) => {
    const user = props.user;

    const profileClickHandler = () => {
        props.onClick && props.onClick();
    };

    return (
        <div className={ Style.ProfileImage }>
            <div className={ Style.Container } onClick={ profileClickHandler }>
                { user && user.image ?
                    <img src={ user.image } />
                    :
                    <i className="fas fa-user-circle" />
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.userState.user
});

export default connect(mapStateToProps)(profileImage);