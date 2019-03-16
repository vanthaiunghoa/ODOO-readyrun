import React from 'react';
import { connect } from 'react-redux';

import {
    ScreenWrapper
} from '../../../components/index';

class NotificationListScreen extends React.Component {
    render() {
        const currentAccount = this.props.AUTH.accountList[this.props.AUTH.currentAccountIndex];
        const fullName = currentAccount ? currentAccount.name : '';
        const avatarUrl = currentAccount ? currentAccount.avatarUrl : '';

        return (
            <ScreenWrapper
                // Screen
                barStyle='dark-content'
                hasBackgroundImage={false}
                backgroundImage={-1}
                style={{}}

                // Header
                hasHeader
                forChat={false}

                hasLeftButton
                leftIconName='menu'
                onPressLeftButton={() => { }}

                hasRightButton={false}
                rightIconName='more-vert'
                onPressRightButton={() => { }}

                hasAvatar
                fullName={fullName}
                avatarUrl={avatarUrl}
                onPressAvatar={() => { this.props.navigation.navigate('ManageAccountsScreen'); }}

                color='#000000'

                title='Thông báo'
                headerStyle={{}}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    AUTH: state.AUTH
});

export default connect(mapStateToProps, null)(NotificationListScreen);
