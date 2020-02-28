import React, { Component } from 'react';
import {
    Image,
    Keyboard,
    NetInfo,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import commonStyle from '../Common/commonStyle';
import style from './forgotPasscodeStyles';
import Constant from '../../utility/constants';
import Spinner from '../../components/Common/spinner';
import TextBox from '../../components/Common/textBox';
import ButtonBox from '../../components/Common/buttonBox';
import { validateEmail } from '../../utility/helperComponent';
import { generatePasscodeAction } from '../../actions/generatePasscodeAction';
import AlertModal from '../Common/AlertModal';

const LOGO = require('../../assets/logo.png');

class ForgotPasscodeScreen extends Component {
    static navigationOptions = () => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            open: false
        };
    }
    /**
     * Method to accept input values from TextInput as object.
     * @param field
     */
    handleTextChange = field => (text) => {
        const newState = {};
        newState[field] = text;
        this.setState(newState);
    };

    /**
     * Method for navigating to Login Screen.
     */
    navigateToSecureLogin = () => {
        const reset = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: 'SecureLoginScreen' })
            ]
        });
        this.props.navigation.dispatch(reset);
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        if (this.state.email.trim() === '') {
            this.showAlert(Constant.EMAIL_EMPTY);
        } else if (!validateEmail(this.state.email.trim())) {
            this.showAlert(Constant.EMAIL_INVALID);
        } else {
            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) { this.hitGeneratePasscodeAPI(); } else {
                    this.showAlert(Constant.NETWORK_ERROR);
                }
            });
        }
    };

    hitGeneratePasscodeAPI = () => {
        const { dispatch } = this.props.navigation;
        const body = {
            email: this.state.email.trim(),
        };
        dispatch(generatePasscodeAction(body))
            .then(res => {
                this.showAlert(res.message);
                this.setState({ email: '' });
            })
            .catch(err => {
                this.showAlert(err);
            });
    };

    closeModal = () => {
        this.setState({
            open: false
        });
    };

    showAlert = (message) => {
        this.setState({
            open: true,
            message
        });
    };

    render() {
        const { email } = this.state;
        return (
            <View style={commonStyle.container}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    alwaysBounceVertical={false}
                    bounces={false}
                >
                    <View style={commonStyle.centerContainer}>
                        <View>
                            <Image
                                source={LOGO}
                                style={commonStyle.iconStyle}
                            />
                        </View>
                        <View style={commonStyle.contentContainer}>
                            <View style={commonStyle.headerBox}>
                                <Text style={commonStyle.headerTextStyle}>FORGOT PASSCODE</Text>
                            </View>
                            <TextBox
                                placeholder="Email"
                                handleText={this.handleTextChange('email')}
                                value={email}
                                icon="email"
                                returnKeyType="go"
                                onSubmitEditing={() => {
                                    this.handleSubmit();
                                }}
                            />
                            <ButtonBox
                                buttonText="Send"
                                handleSubmit={this.handleSubmit}
                                isPillShapeStyle
                            />
                            <Text style={style.textStyle}>{Constant.FORGOT_PASSCODE_TEXT}</Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={this.navigateToSecureLogin}
                                style={style.linkContainer}
                            >
                                <MaterialIcons name="keyboard-backspace" size={23} color={Constant.TEXT_COLOR} />
                                <Text style={commonStyle.linkText}> Back to Passcode</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <AlertModal
                    message={this.state.message}
                    open={!!this.state.open}
                    close={this.closeModal}
                />
                <Spinner
                    animating={this.props.fetching}
                />
            </View>
        );
    }
}

ForgotPasscodeScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    fetching: state.generatePasscodeReducer.fetching,
    isConnected: state.checkNetworkReducer.isConnected
});

export default connect(mapStateToProps)(ForgotPasscodeScreen);
