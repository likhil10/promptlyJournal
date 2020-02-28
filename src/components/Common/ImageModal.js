import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Platform,
    AsyncStorage
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Modal from 'react-native-simple-modal';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import style from './commonStyle';
import Constant from '../../utility/constants';
import settingStyle from '../SettingScreen/settingStyle';
import { openCameraAndGallery } from '../../utility/helperComponent';
import { promptImageUpdateAction } from '../../actions/promptImageUpdateAction';
import { getJournalsAction } from '../../actions/getJournalsAction';
import AlertModal from './AlertModal';
import { mixpanelTrack } from '../../utility/mixpanelHelperComponent';

export default class ImageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAlert: false,
            message: '',
            email: '',
        };
    }

    getEmail = () => {
        AsyncStorage.getItem(Constant.EMAIL).then((email) => {
            this.setState({
                email,
            }, () => mixpanelTrack('Journal Image Uploaded', this.state.email));
        });
    }

    setPropertyPicturesData = (data) => {
        let promptImages = '';
        let imageLarge = false;
        if (Platform.OS === 'ios' && data.size < 11825280) {
            const pic = `data:${data.mime};base64,${data.data}`;
            promptImages = pic;
        } else if (Platform.OS === 'android' && data.size < 43000) {
            const pic = `data:${data.mime};base64,${data.data}`;
            promptImages = pic;
        } else {
            imageLarge = true;
        }
        if (imageLarge) {
            this.setState({
                openAlert: true,
                message: Constant.IMAGE_UPLOAD_SIZE_LIMIT
            });
        }

        if (promptImages) {
            this.hitPromptUpdateImageAPI(promptImages);
        }
    };

    requestCameraPermission = (index) => {
        if (index === 0 || index === 1) {
            openCameraAndGallery(index, false)
                .then(res => {
                    this.setPropertyPicturesData(res);
                })
                .catch(err => {
                    this.setState({
                        openAlert: true,
                        message: err
                    });
                });
        }
    };

    hitPromptUpdateImageAPI = (promptImages) => {
        const { dispatch } = this.props.data;
        const body = {
            journal_id: this.props.journal._id,
            journal_image: promptImages,
        };
        dispatch(promptImageUpdateAction(body))
            .then(() => {
                this.getEmail();
                this.props.openModal();
                this.hitGetJournalAPI();
            })
            .catch(err => {
                this.setState({
                    openAlert: true,
                    message: err
                });
            });
    };

    showActionSheet = () => {
        this.setState({}, () => this.ActionSheet.show());
    };

    modalDidClose = () => {
        this.props.close();
    };

    hitGetJournalAPI = () => {
        const { dispatch } = this.props.data;
        dispatch(getJournalsAction())
            .then(() => {
                this.setState({
                    openAlert: false,
                });
                this.props.close();
            })
            .catch(err => {
                this.setState({
                    openAlert: true,
                    message: err
                });
            });
    };
    closeModal = () => {
        this.setState({
            openAlert: false,
        });
    };

    render() {
        const { open } = this.props;
        return (
            <Modal
                open={open}
                modalStyle={[style.imageModal, style.padding10]}
                modalDidClose={this.modalDidClose}
            >
                <TouchableOpacity
                    onPress={() => this.props.close()}
                    style={style.saveImageButton}
                >
                    <Ionicons name="md-close" size={23} color={Constant.TEXT_COLOR} />
                </TouchableOpacity>
                <View style={[style.centeredItems]}>
                    <View>
                        <Image
                            source={{ uri: this.props.uri.uri }}
                            style={style.openedImage}
                        />
                        <TouchableOpacity
                            style={[settingStyle.trashIcon, { position: 'absolute', right: -20, bottom: -20 }]}
                            onPress={() => this.showActionSheet()}
                        >
                            <FontAwesomeIcons
                                name="pencil"
                                size={25}
                                color={Constant.TEXT_COLOR}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* <TouchableOpacity */}
                    {/* onPress={() => this.props.close()} */}
                    {/* style={style.saveImageButton}> */}
                    {/* <Text style={[style.buttonText, { */}
                    {/* textAlign: 'center', */}
                    {/* fontSize: 18, */}
                    {/* letterSpacing: 1 */}
                    {/* }]}>{"OK"}</Text> */}
                    {/* </TouchableOpacity> */}
                </View>
                <AlertModal
                    message={this.state.message}
                    open={!!this.state.openAlert}
                    close={this.closeModal}
                />
                <ActionSheet
                    ref={o => { this.ActionSheet = o; }}
                    title="Which one do you like?"
                    options={['Camera', 'Gallery', 'Cancel']}
                    cancelButtonIndex={2}
                    onPress={(index) => {
                        this.requestCameraPermission(index);
                    }}
                />
            </Modal>
        );
    }
}

ImageModal.propTypes = {
    dispatch: PropTypes.func,
    close: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    uri: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    journal: PropTypes.object.isRequired,
};

ImageModal.defaultProps = {
    dispatch: () => {},
};
