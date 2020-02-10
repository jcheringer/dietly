import React from 'react';
import { connect } from 'react-redux';

import Style from './profile-image.less';

const profileImage = ({ user }) => {
    return (
        <div className={ Style.ProfileImage }>
            <div className={ Style.Container }>
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