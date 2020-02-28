import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    NetInfo,
    AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Constant from '../../../utility/constants';
import commonStyle from '../../Common/commonStyle';
import styles from '../journalStyle';
import Config from '../../../utility/config';
import { deletePromptImageAction } from '../../../actions/deletePromptImageAction';
import Spinner from '../../Common/spinner';
import { mixpanelTrackWithProperties } from '../../../utility/mixpanelHelperComponent';

export default class PromptsImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calculatedWidth: 100,
            loading: false,
            email: '',
            journalType: '',
        };
    }

    componentDidMount() {
        const { image } = this.props;
        Image.getSize(`${Config.BASE_URL}${image.image}`, (width, height) => {
            this.setState({ calculatedWidth: 100 * (width / height) });
        }, () => {
            this.setState({ calculatedWidth: 100 });
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { image } = nextProps;
        if (this.props.image !== image) {
            Image.getSize(`${Config.BASE_URL}${image.image}`, (width, height) => {
                this.setState({ calculatedWidth: 100 * (width / height) });
            }, () => {
                this.setState({ calculatedWidth: 100 });
            });
        }
    }

    getEmail = () => {
        AsyncStorage.getItem(Constant.EMAIL).then((email) => {
            this.setState({
                email,
            }, () => mixpanelTrackWithProperties(this.state.email, 'Image Deleted', { 'Journal Type': this.state.journalType }));
        });
    };

    hitDeletePromptImageAPI = () => {
        const { item, journal_id, image } = this.props;
        const { dispatch } = this.props.navigation;
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    dispatch(deletePromptImageAction(journal_id, item._id, image._id))
                        .then(res => {
                            this.setState({
                                journalType: res[0].journalType,
                            }, () => this.getEmail());
                            this.props.hitGetPromptsAPI();
                        })
                        .catch(() => {
                            //  Error Handling
                        });
                } else {
                    // this.setState({
                    //     open: true,
                    //     message: Constant.NETWORK_ERROR
                    // });
                }
            });
    };

    render() {
        const { image, editImage, item } = this.props;
        return (
            <View style={[styles.imageContainer, { width: this.state.calculatedWidth }]}>
                <TouchableOpacity
                    onPress={() => editImage(item, image)}
                    style={[commonStyle.topLeftContainer, styles.imageIconContainer]}
                >
                    <IonIcons name="md-create" size={15} color={Constant.WHITE_COLOR} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.hitDeletePromptImageAPI()}
                    style={[commonStyle.topRightContainer, styles.imageIconContainer]}
                >
                    <IonIcons name="md-close" size={15} color={Constant.WHITE_COLOR} />
                </TouchableOpacity>
                {image.isPixelated &&
                <View style={[commonStyle.bottomLeftContainer, styles.imageIconContainerTransparent]}>
                    <IonIcons name="md-warning" size={15} color="#ffcc00" />
                </View>
                }
                {image.isCaptionAdded &&
                <View style={[commonStyle.bottomRightContainer, styles.imageIconContainerTransparent]}>
                    <IonIcons name="ios-menu" size={15} color={Constant.WHITE_COLOR} />
                </View>
                }
                <Image
                    source={{ uri: `${Config.BASE_URL}${image.image}` }}
                    style={[styles.promptImage, { width: this.state.calculatedWidth }]}
                    onLoadStart={() => this.setState({ loading: true })}
                    onLoadEnd={() => {
                        this.setState({ loading: false });
                    }}
                />
                <Spinner
                    animating={this.state.loading}
                    backgroundColor="transparent"
                />
                {/* <AlertModal */}
                {/* message={this.state.message} */}
                {/* open={this.state.open ? true : false} */}
                {/* close={this.closeModal} */}
                {/* /> */}
            </View>
        );
    }
}

PromptsImageItem.propTypes = {
    dispatch: PropTypes.func.isRequired,
    editImage: PropTypes.func.isRequired,
    hitGetPromptsAPI: PropTypes.func.isRequired,
    journal_id: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};
