import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform,
    Clipboard,
} from 'react-native';
import Share from 'react-native-share';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Modal from 'react-native-simple-modal';
import PropTypes from 'prop-types';
import style from './commonStyle';
import Styles from '../SubscriptionPlanScreen/subscriptionPlanStyle';
import constant from '../../utility/constants';
import { SearchPopover } from '../Common/searchPopover';

const REFERRAL_IMAGE_1 = require('../../assets/icons/referral1.jpg');
const REFERRAL_IMAGE_2 = require('../../assets/icons/referral2.png');

export default class ReferralModal extends Component {
    constructor(props) {
        super(props);
        // const photoUri = 'file://' + 'assets/icons/referral1.jpg';
        this.state = {
            shareContent: props.shareContent,
            clipboardContent: `Hey, check out this new app I'm loving. I'm excited to actually journal again!  ${props.shareLink}`,
            shareLink: props.shareLink,
            openPopover: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.shareContent !== this.state.shareContent || this.state.shareLink !== nextProps.shareLink) {
            this.setState({
                shareContent: nextProps.shareContent,
                shareLink: nextProps.shareLink,
                clipboardContent: `Hey, check out this new app I'm loving. I'm excited to actually journal again! ${nextProps.shareLink}`,
            });
        }
    }

    closePopover = () => {
        this.setState({
            openPopover: false,
        });
    };

    navigateToSettings = () => {
        this.props.close();
        this.props.data.navigation.navigate('SettingScreen', { shareContent: true });
    };

    modalDidClose = () => {
        this.props.close();
    };

    shareOnFacebook = (shareOptions) => {
        Share.shareSingle(Object.assign(shareOptions, { social: Share.Social.FACEBOOK }));
        this.modalDidClose();
    };

    writeToClipboard = async () => {
        this.setState({ openPopover: true });
        await Clipboard.setString(this.state.clipboardContent);
    };

    render() {
        const { open } = this.props;
        const { shareContent, openPopover } = this.state;
        const shareOptions = {
            title: 'Promptly Journals',
            message: 'Hey, check out this new app I\'m loving. I\'m excited to actually journal again! ',
            url: this.state.shareLink,
            // url: 'http://promptlyjournals.zibtekdev.com',
            // url: 'https://app.promptlyjournals.com',
        };
        return (
            <Modal
                open={open}
                modalStyle={shareContent ? [style.modalStyles, {
                    justifyContent: 'flex-start', margin: 0, padding: 0, backgroundColor: 'transparent'
                }] : [style.modalStyles, { justifyContent: 'flex-start', margin: 0, padding: 0 }]}
                modalDidClose={this.modalDidClose}
            >
                <View style={shareContent ? [style.containers] : style.containers}>
                    {shareContent &&
                    <View style={[style.topText]}>
                        <Text style={[style.giveGetText, {
                            color: '#fff',
                            paddingVertical: 20
                        }]}
                        >SHARE & SHOP
                        </Text>
                    </View>}
                    <View style={style.upperContainer}>
                        <Image
                            source={shareContent ? REFERRAL_IMAGE_2 : REFERRAL_IMAGE_1}
                            style={Platform.OS === 'ios' ? shareContent ? [style.topImage] : [style.topImage, { borderRadius: 20 }] : shareContent ? style.topImageAndroid : [style.topImageAndroid, {
                                borderRadius: 20,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0
                            }]}
                        />
                    </View>

                    <View style={style.centeredItems}>
                        {!shareContent &&
                    <View>
                        <View style={[style.marginTop10, style.centeredItems]}>
                            <Text style={style.text}>LOVING OUR PROMPTED</Text>
                            <Text style={[style.text, { marginVertical: 0 }]}>JOURNALING SUBSCRIPTION?</Text>
                        </View>
                        <View style={[Styles.underline, {

                            marginTop: 1,
                            alignSelf: 'center',
                            height: 1.5,
                            width: 40
                        }]}
                        />
                    </View>
                        }
                        {shareContent === false ?
                            <View style={[style.centeredItems, { width: '80%' }]}>
                                <Text style={[style.text, { textAlign: 'center', fontSize: 20, fontWeight: 'bold' }]}>SHARE & SHOP</Text>
                                <Text style={[style.texts, { textAlign: 'center' }]}>Invite friends and family and earn Amazon credit!</Text>
                            </View>
                            :
                            <View style={[style.centeredItems, { backgroundColor: '#ffffff', width: '100%' }]}>
                                <Text style={[style.texts, { textAlign: 'center' }]}>Share your link with friends and when they purchase a subscription, you will receive $3 per referral to Amazon (#winwin)!</Text>
                            </View>
                        }
                        {!shareContent &&
                        <View style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center'
                        }}
                        >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => this.navigateToSettings()}
                                style={[style.isPurple, {
                                    paddingHorizontal: 0,
                                    alignSelf: 'center',
                                    marginVertical: 20,
                                }]}
                            >
                                <View style={[style.buttonContent]}>
                                    <Text style={style.whiteTexts}>INVITE FRIENDS</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        }
                    </View>
                    {shareContent &&
                <View style={[style.topText]}>
                    <Text style={[style.giveGetText, {
                        color: '#fff',
                        paddingTop: 10
                    }]}
                    >SHARE YOUR LINK
                    </Text>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#fff', height: 50, width: 50, borderRadius: 25, marginVertical: 10, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center'
                            }}
                            onPress={() => this.writeToClipboard()}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="ios-link" size={30} color={constant.TEXT_COLOR} />
                        </TouchableOpacity>
                        <SearchPopover
                            openPopover={openPopover}
                            closePopover={this.closePopover}
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#fff', height: 50, width: 50, borderRadius: 25, marginVertical: 10, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center'
                            }}
                            activeOpacity={0.8}
                            onPress={() => this.shareOnFacebook(shareOptions)}
                        >
                            <FontAwesome name="facebook-f" size={25} color={constant.TEXT_COLOR} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity */}
                        {/* style={{ */}
                        {/* backgroundColor: '#fff', height: 50, width: 50, borderRadius: 25, marginVertical: 10, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' */}
                        {/* }} */}
                        {/* activeOpacity={0.8} */}
                        {/* // onPress={() => Share.shareSingle(Object.assign(shareOptions, { social: Share.Social.INSTAGRAM }))} */}
                        {/* > */}
                        {/* <Ionicons name="logo-instagram" size={35} color={constant.TEXT_COLOR} /> */}
                        {/* </TouchableOpacity> */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#fff', height: 50, width: 50, borderRadius: 25, marginVertical: 10, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center'
                            }}
                            activeOpacity={0.8}
                            onPress={() => Share.open(shareOptions)}
                        >
                            <EvilIcons name="share-apple" size={35} color={constant.TEXT_COLOR} />
                        </TouchableOpacity>
                    </View>
                </View>
                    }
                </View>
                <TouchableOpacity
                    style={[style.crossButton, style.centeredItems, { position: 'absolute', right: 0, top: 0 }]}
                    activeOpacity={0.8}
                    onPress={this.modalDidClose}
                >
                    <Text style={[style.isPurpleText, { fontSize: 20, paddingVertical: 0 }]}>X</Text>
                </TouchableOpacity>
            </Modal>
        );
    }
}

ReferralModal.propTypes = {
    close: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    shareContent: PropTypes.bool.isRequired,
    shareLink: PropTypes.string,
};

ReferralModal.defaultProps = {
    shareLink: ''
};
