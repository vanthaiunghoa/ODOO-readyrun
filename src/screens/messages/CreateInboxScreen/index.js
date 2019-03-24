import React from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
    ScreenWrapper,
    SearchInput,
    AccountItem
} from '../../../components/index';

import styleConfigs from '../../../config/style.config';
import * as appHelpers from '../../../helpers/appHelpers';

import * as accountServices from '../../../services/accountServices';

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        paddingBottom: 8 + 54 + styleConfigs.screen.paddingHorizontal
    },
    addButton: {
        position: 'absolute',
        right: styleConfigs.screen.paddingHorizontal,
        bottom: styleConfigs.screen.paddingHorizontal,
        justifyContent: 'center',
        alignItems: 'center',
        width: 54,
        height: 54,
        backgroundColor: styleConfigs.color.main,
        borderRadius: 27,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 1
    }
});

class CreateInboxScreen extends React.Component {
    constructor(props) {
        super(props);

        this.onPressItem = this.onPressItem.bind(this);
        this.createInbox = this.createInbox.bind(this);
        this.clickLeftButton = this.clickLeftButton.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.keyExtractor = this.keyExtractor.bind(this);
        this.renderList = this.renderList.bind(this);
        this.renderItem = this.renderItem.bind(this);

        this.state = {
            isLoading: true,
            accountList: [],
            selectedIdList: [],
            searchText: ''
        };
    }

    componentDidMount() {
        accountServices.getAccountList()
            .then(payload => {
                if (payload.success) {
                    this.setState({
                        isLoading: false,
                        accountList: payload.data.map(item => (
                            {
                                partnerId: item.partnerId,
                                domain: '',
                                name: item.name,
                                email: item.email,
                                avatarUrl: ''
                            }
                        ))
                    });

                    console.log(payload);
                } else {
                    setTimeout(() => {
                        Alert.alert('Thông bá0', payload.data.msg);
                    }, 500);
                }
            })
            .catch(error => {
                setTimeout(() => {
                    Alert.alert('Thông bá0', error.message);
                }, 500);
            });
    }

    onPressItem(partnerId) {
        const arr = this.state.selectedIdList;

        const index = arr.indexOf(partnerId);

        if (index > -1) {
            arr.splice(index, 1);
        } else {
            arr.push(partnerId);
        }

        this.setState({ selectedIdList: arr });
    }

    createInbox() {

    }

    clickLeftButton() {
        this.props.navigation.goBack();
    }

    searchItem(arr, str) {
        const re = new RegExp(str, 'i');
        return arr.filter(item => item.name.search(re) >= 0);
    }

    keyExtractor(item) {
        return item.partnerId.toString();
    }

    renderList(_accountList, _searchText) {
        let accountList = _accountList;

        if (_searchText) {
            accountList = this.searchItem(_accountList, _searchText);
        }

        return (
            <FlatList
                data={accountList}
                extraData={this.state}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                style={{ marginTop: 20 }}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        );
    }

    renderItem({ item, index }) {
        return (
            <AccountItem
                partnerId={item.partnerId}
                domain={item.email}
                fullName={item.name}
                email={item.email}
                avatarUrl={item.avatarUrl}

                isSelected={
                    this.state.selectedIdList.indexOf(item.partnerId) > -1
                }
                onPress={() => this.onPressItem(item.partnerId)}

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

                title='Tạo tin nhắn mới'
                headerStyle={{}}
            >
                <SearchInput
                    backgroundColor='#EEEEEE'
                    borderColor='#D5D5D5'
                    getValue={value => this.setState({ searchText: value })}

                    style={{ marginTop: 10 }}
                />

                {
                    this.state.isLoading
                        ?
                        <View style={styles.loading}>
                            <ActivityIndicator />
                        </View>
                        :
                        this.renderList(this.state.accountList, this.state.searchText)
                }

                <TouchableOpacity
                    onPress={this.createInbox}
                    style={styles.addButton}
                >
                    <MaterialIcons
                        size={25}
                        name='check'
                        color='#FFFFFF'
                    />
                </TouchableOpacity>
            </ScreenWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    AUTH: state.AUTH
});

export default connect(mapStateToProps, null)(CreateInboxScreen);
