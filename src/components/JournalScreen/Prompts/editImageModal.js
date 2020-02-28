import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Keyboard,
    Image,
    TextInput,
    NetInfo,
    Dimensions,
    Platform
} from 'react-native';
import Modal from 'react-native-simple-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import KeyboardAwareScrollView from 'react-native-keyboard-aware-scrollview/src/KeyboardAwareScrollView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import commonStyle from '../../Common/commonStyle';
import Config from '../../../utility/config';
import styles from '../journalStyle';
import promptStyles from './promptStyle';
import Constant from '../../../utility/constants';
import { deletePromptImageAction } from '../../../actions/deletePromptImageAction';
import { editPromptImageAction } from '../../../actions/editPromptImageAction';
import { rotateImageAction } from '../../../actions/rotateImageAction';
import Spinner from '../../Common/spinner';

const deviceHeight = Dimensions.get('window').height;

export default class EditImageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rotate: 0,
            imageData: '',
            caption: this.props.imageSelected.imageDescription,
            loading: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.imageSelected && nextProps.imageSelected !== this.props.imageSelected) {
            this.setState({ caption: nextProps.imageSelected.imageDescription });
        }
    }

    /**
     * Method to set state of the text input value.
     */
    handleTextChange = field => (text) => {
        const newState = {};
        newState[field] = text;
        this.setState(newState);
    };

    rotateImage = () => {
        this.setState({ rotate: (this.state.rotate + 90) % 360 });
    };

    saveImage = () => {
        const { imageSelected, showSpinner, hideSpinner } = this.props;
        const { dispatch } = this.props.navigation;
        showSpinner();
        dispatch(rotateImageAction(`${Config.BASE_URL}${imageSelected.image}`, this.state.rotate))
            .then(res => {
                this.setState({ imageData: res.image }, () => this.hitEditPromptImageAPI());
            })
            .catch(err => {
                hideSpinner();
                this.props.openAlertModalMessage(err);
            });
    };

    hitEditPromptImageAPI = () => {
        const {
            editPromptSelected, journal_id, imageSelected, hideSpinner
        } = this.props;
        const { imageData, caption } = this.state;
        const { dispatch } = this.props.navigation;
        const body = {
            image_description: caption,
            image_id: imageSelected._id,
            orientation: 'portrait',
            is_pixelated: false,
            image: imageData
        };
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    dispatch(editPromptImageAction(journal_id, editPromptSelected._id, body))
                        .then(() => {
                            hideSpinner();
                            this.closeModal();
                            this.props.hitGetPromptsAPI();
                        })
                        .catch(err => {
                            hideSpinner();
                            this.props.openAlertModalMessage(err);
                        });
                } else {
                    hideSpinner();
                    this.props.openAlertModalMessage(Constant.NETWORK_ERROR);
                }
            });
    };

    closeModal = () => {
        Keyboard.dismiss();
        this.setState({
            rotate: 0,
            imageData: '',
            caption: this.props.imageSelected.imageDescription
        }, () => this.props.close());
    };

    modalDidClose = () => {
        this.closeModal();
    };

    hitDeletePromptImageAPI = () => {
        const { editPromptSelected, journal_id, imageSelected } = this.props;
        const { dispatch } = this.props.navigation;
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    dispatch(deletePromptImageAction(journal_id, editPromptSelected._id, imageSelected._id))
                        .then(() => {
                            this.closeModal();
                            this.props.openAlertModalMessage(Constant.IMAGE_DELETE_SUCCESS);
                            this.props.hitGetPromptsAPI();
                        })
                        .catch(err => {
                            this.props.openAlertModalMessage(err);
                        });
                } else {
                    this.props.openAlertModalMessage(Constant.NETWORK_ERROR);
                }
            });
    };

    render() {
        const { open, imageSelected } = this.props;
        return (
            <Modal
                open={open}
                closeOnTouchOutside={false}
                modalStyle={commonStyle.welcomeModalStyle}
                modalDidClose={this.modalDidClose}
            >
                <View style={commonStyle.modelContainer}>
                    <View style={commonStyle.leftContainer}>
                        <TouchableOpacity
                            onPress={() => this.closeModal()}
                        >
                            <IonIcons name="md-close" size={23} color={Constant.WHITE_COLOR} />
                        </TouchableOpacity>
                    </View>
                    <KeyboardAwareScrollView
                        keyboardShouldPersistTaps="handled"
                        alwaysBounceVertical={false}
                        bounces={false}
                    >
                        <View style={[commonStyle.modalCenterContainer, commonStyle.padding10]}>
                            <View style={[promptStyles.editImageContainer, { height: deviceHeight * 0.38 }]}>
                                <Image
                                    source={{ uri: `${Config.BASE_URL}${imageSelected.image}` }}
                                    style={[commonStyle.flexContainer, commonStyle.imageContain, { transform: [{ rotate: `${this.state.rotate}deg` }] }]}
                                    onLoadStart={() => this.setState({ loading: true })}
                                    onLoadEnd={() => {
                                        this.setState({ loading: false });
                                    }}
                                />
                                <Spinner
                                    animating={this.state.loading}
                                    backgroundColor="transparent"
                                />
                            </View>
                            <View
                                style={[commonStyle.flexContainer, commonStyle.width100, { height: deviceHeight * 0.32 }]}
                            >
                                <View style={[commonStyle.flexRow, commonStyle.paddingTop10]}>
                                    <View style={[promptStyles.centerContainer, commonStyle.padding10]}>
                                        <TouchableOpacity
                                            onPress={() => this.rotateImage()}
                                        >
                                            <MaterialIcons name="rotate-right" size={25} color={Constant.WHITE_COLOR} />
                                        </TouchableOpacity>
                                        <Text
                                            style={[commonStyle.subHeaderTextStyle, styles.iconLabel]}
                                        >{'ROTATE'}
                                        </Text>
                                    </View>
                                    <View style={[promptStyles.centerContainer, commonStyle.padding10]}>
                                        <TouchableOpacity>
                                            <MaterialIcons name="zoom-in" size={25} color={Constant.WHITE_COLOR} />
                                        </TouchableOpacity>
                                        <Text
                                            style={[commonStyle.subHeaderTextStyle, styles.iconLabel]}
                                        >{'ZOOM IN'}
                                        </Text>
                                    </View>
                                    <View style={[promptStyles.centerContainer, commonStyle.padding10]}>
                                        <TouchableOpacity>
                                            <MaterialIcons name="zoom-out" size={25} color={Constant.WHITE_COLOR} />
                                        </TouchableOpacity>
                                        <Text
                                            style={[commonStyle.subHeaderTextStyle, styles.iconLabel]}
                                        >{'ZOOM OUT'}
                                        </Text>
                                    </View>
                                </View>
                                <View style={commonStyle.flexRow}>
                                    <View style={[promptStyles.centerContainer, commonStyle.padding10, { flex: 2 }]}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity style={commonStyle.marginHorizontal5}>
                                                <MaterialCommunityIcons
                                                    name="crop-landscape"
                                                    size={28}
                                                    color={Constant.WHITE_COLOR}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={commonStyle.marginHorizontal5}>
                                                <MaterialCommunityIcons
                                                    name="crop-portrait"
                                                    size={28}
                                                    color={Constant.WHITE_COLOR}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={commonStyle.marginHorizontal5}>
                                                <MaterialCommunityIcons
                                                    name="crop-square"
                                                    size={28}
                                                    color={Constant.WHITE_COLOR}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <Text
                                            style={[commonStyle.subHeaderTextStyle, styles.iconLabel]}
                                        >{'ORIENTATION'}
                                        </Text>
                                    </View>
                                    <View style={[promptStyles.centerContainer, commonStyle.padding10]}>
                                        <TouchableOpacity
                                            onPress={() => this.hitDeletePromptImageAPI()}
                                        >
                                            <MaterialIcons name="delete" size={28} color={Constant.WHITE_COLOR} />
                                        </TouchableOpacity>
                                        <Text
                                            style={Platform.OS === 'android' ? [commonStyle.subHeaderTextStyle, styles.iconLabel] :
                                                [commonStyle.subHeaderTextStyle, styles.iconLabel, commonStyle.paddingTop5]}
                                        >{'DELETE'}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[commonStyle.flexContainer, { marginTop: 10 }]}>
                                    <Text
                                        style={[commonStyle.subHeaderTextStyle, styles.iconLabel]}
                                    >{'PHOTO CAPTION:'}
                                    </Text>
                                    <TextInput
                                        style={[styles.textInput]}
                                        maxLength={80}
                                        autoCorrect={false}
                                        spellCheck={false}
                                        autoCapitalize="none"
                                        value={this.state.caption}
                                        onChangeText={this.handleTextChange('caption')}
                                        underlineColorAndroid="transparent"
                                    />
                                    <View style={[promptStyles.endContainer]}>
                                        <TouchableOpacity
                                            disabled={this.props.fetching}
                                            onPress={() => this.saveImage()}
                                        >
                                            <Text
                                                style={[commonStyle.subHeaderTextStyle, styles.iconLabel, commonStyle.textFont14]}
                                            >{'Save'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </Modal>
        );
    }
}

EditImageModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    hitGetPromptsAPI: PropTypes.func.isRequired,
    journal_id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    showSpinner: PropTypes.func.isRequired,
    hideSpinner: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    imageSelected: PropTypes.string.isRequired,
    openAlertModalMessage: PropTypes.func.isRequired,
    editPromptSelected: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};
