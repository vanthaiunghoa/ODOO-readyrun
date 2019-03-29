import React from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Alert,  
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RNRestart from 'react-native-restart';

import {
    ScreenWrapper,
    OverlayLoading,
    AuthButton,
    AccountItem
} from '../../../components/index';

import * as authActions from '../../../store/actions/authActions';

const styles = StyleSheet.create({
    list: {
        flexGrow: 0,
        marginTop: 30
    },
    buttons: {
        paddingVertical: 30
    },
    touchStyle:{
        marginTop: 15,

    }
});

class ManageAccountsScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.clickLeftButton = this.clickLeftButton.bind(this);
        this.keyExtractor = this.keyExtractor.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.changeAccount = this.changeAccount.bind(this);
        this.addNewAccount = this.addNewAccount.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            isLoading: false
        };
    }

    changeAccount(accountIndex) {
        if (accountIndex === this.props.AUTH.currentAccountIndex) return;

        this.props.authActions.changeAccount(accountIndex);
//đã sữa
        setTimeout(() => {
            RNRestart.Restart()
        }, 5);
    }

    addNewAccount() {
        this.props.navigation.navigate('AddNewAccountScreen');
    }


    logout(){
        this.props.authActions.logout();
        //đã sữa
        setTimeout(() => {
            RNRestart.Restart() ;
        }, 5);
    }


    clickLeftButton() {
        this.props.navigation.goBack();
    }

    keyExtractor(item) {
        return item.id.toString();
    }

    renderItem({ item, index }) {
        return (
            <AccountItem
                partnerId={item.partnerId}
                domain={item.domain}
                fullName={item.name}
                email={item.username}
                avatarUrl={item.avatarUrl}

                isSelected={this.props.AUTH.currentAccountIndex === index}
                onPress={() => { this.changeAccount(index); }}

                style={{}}
            />
        );
    }

    render() {
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
                leftIconName='arrow-back'
                onPressLeftButton={this.clickLeftButton}

                hasRightButton={false}
                rightIconName='more-vert'
                onPressRightButton={() => { }}

                hasAvatar={false}
                avatarUrl=''
                onPressAvatar={() => { }}

                color='#000000'

                title='Danh sách tài khoản'
                headerStyle={{}}
            >
                <OverlayLoading
                    visible={this.state.isLoading}
                    onRequestClose={() => { }}
                />

                <FlatList
                    data={this.props.AUTH.accountList}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    style={styles.list}
                />

                <View style={styles.buttons}>
                    <AuthButton
                        title='Thêm tài khoản'
                        color='#FFFFFF'
                        backgroundColor='#39B54A'
                        borderColor='#33A242'
                        onPress={this.addNewAccount}

                        style={{}}
                    />

                    <AuthButton
                        title='Đăng xuất'
                        color='#000000'
                        backgroundColor='#E9EDF1'
                        borderColor='#D1D4D8'
                        onPress={this.logout}
                        
                        

                        style={{ marginTop: 15 }}
                    />

        
                </View>
            </ScreenWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    AUTH: state.AUTH
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccountsScreen);
