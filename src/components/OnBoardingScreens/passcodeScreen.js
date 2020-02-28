import React, { Component } from 'react';
import { connect } from 'react-redux';
import CodeInput from 'react-native-confirmation-code-input';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    NetInfo,
    AsyncStorage,
    Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import commonStyle from '../Common/commonStyle';
import style from './onBoardingStyle';
import Constant from '../../utility/constants';
import { passcodeAction } from '../../actions/passcodeAction';
import Icons from '../../utility/iconConstant';
import AlertModal from '../Common/AlertModal';

class PasscodeScreen extends Component {
    constructor(props) {
        super(props);
        Keyboard.dismiss();
        this.state = {
            passcode: '',
            token: '',
            message: '',
            open: false,
        };
    }

    onFulfill= (passcode) => {
        this.setState({
            passcode,
        });
    }

    getToken = () => {
        AsyncStorage.getItem(Constant.TOKEN).then((token) => {
            this.setState({
                token,
            }, () => this.hitPasscodeAPI());
        });
    };

    savePasscode= () => {
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    this.getToken();
                }
            });
    }

    hitPasscodeAPI = () => {
        const passcode = this.state.passcode.trim();
        const { token } = this.state;
        const body = {
            passcode,
            token,
        };
        const { dispatch } = this.props.data.navigation;
        if (passcode) {
            dispatch(passcodeAction(body))
                .then(() => {
                    this.props.jump(1);
                })
                .catch(() => {
                });
        } else {
            this.setState({
                open: true,
                message: Constant.PASSCODE_LENGTH_INVALID
            });
        }
    };

    closeModal = () => {
        this.setState({
            open: false
        });
    };

    render() {
        return (
            <View style={style.container}>
                <View>
                    <Image
                        source={Icons.SAFE}
                        style={commonStyle.iconStyles}
                    />
                </View>
                <View style={commonStyle.headerBox}>
                    <Text style={[commonStyle.headerTextStyle, commonStyle.headerFontSize]}>WE KEEP YOUR MEMORIES SAFE</Text>
                    <Text style={[commonStyle.subHeadingText, { marginTop: 10 }]}>Set up your 4 digit passcode now.</Text>
                    <Text style={[commonStyle.subHeadingText, { marginTop: 10 }]}>Use this for quick entry on the app.</Text>
                </View>
                <View style={style.cardContainer}>
                    <CodeInput
                        secureTextEntry={false}
                        autoFocus={false}
                        codeLength={4}
                        className="border-b"
                        keyboardType="numeric"
                        size={70}
                        codeInputStyle={style.codeInput}
                        containerStyle={{ alignItems: 'center', marginBottom: 70 }}
                        onFulfill={(code) => this.onFulfill(code)}
                    />
                </View>
                <TouchableOpacity
                    style={style.nextStyle}
                    activeOpacity={0.8}
                    onPress={this.savePasscode}
                >
                    <Text style={[commonStyle.linkText, {
                        fontSize: 18,
                        padding: 10,
                    }]}
                    >SAVE
                    </Text>
                </TouchableOpacity>
                <AlertModal
                    message={this.state.message}
                    open={!!this.state.open}
                    close={this.closeModal}
                />
            </View>
        );
    }
}

PasscodeScreen.propTypes = {
    jump: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(PasscodeScreen);
