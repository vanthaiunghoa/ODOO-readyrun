import React from 'react';
import {
    Image
} from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import {
    ScreenWrapper
} from '../../../components/index';

import {
    LogoImage,
    BusinessConsultingImage
} from '../../../assets/images/index';

const DELAY_TIME_OF_SCREEN = 2000;
const DURATION_TIME_OF_EFFECT = 500;
const DELAY_TIME_OF_EFFECT = 300;

class AuthLoadingScreen extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            if (this.props.AUTH.accountList.length === 0) {
                this.props.navigation.navigate('AuthenticationStack');
            } else {
                this.props.navigation.navigate('ApplicationStack');
            }
        }, DELAY_TIME_OF_SCREEN);
    }

    render() {
        return (
            <ScreenWrapper
                // Screen
                barStyle='light-content'
                hasBackgroundImage
                backgroundImage={BusinessConsultingImage}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}

                // Header
                hasHeader={false}
                forChat={false}

                hasLeftButton={false}
                leftIconName='arrow-back'
                onPressLeftButton={this.onClickLeftButton}

                hasRightButton={false}
                rightIconName='more-vert'
                onPressRightButton={() => { }}

                hasAvatar={false}
                fullName=''
                avatarUrl=''
                onPressAvatar={() => { }}

                color='#FFFFFF'

                title=''
                headerStyle={{}}
            >
                <Animatable.View
                    animation='fadeIn'
                    useNativeDriver
                    duration={DURATION_TIME_OF_EFFECT}
                    delay={DELAY_TIME_OF_EFFECT}
                >
                    <Image
                        resizeMode='cover'
                        source={LogoImage}
                        resizeMethod='scale'
                    />
                </Animatable.View>
            </ScreenWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    AUTH: state.AUTH
});

export default connect(mapStateToProps, null)(AuthLoadingScreen);
